import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const habitRouter = createTRPCRouter({


  getAllHabits: protectedProcedure.query(({ ctx }) => {
    return ctx.db.habit.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        priority: true,
      }
    });
  }),

  createHabitEntry: protectedProcedure
  .input(z.object({ habitId: z.string().min(1) }))
  .mutation(async ({ ctx, input }) => {
    // Start a transaction
    return ctx.db.$transaction(async (prisma) => {
      // Create the new habit entry
      const newEntry = await prisma.habitEntry.create({
        data: {
          habitId: input.habitId,
        },
      });

      // Retrieve the most recent entry for this habit (excluding the one just created)
      const lastEntry = await prisma.habitEntry.findFirst({
        where: {
          habitId: input.habitId,
          NOT: {
            id: newEntry.id,
          },
        },
        orderBy: {
          timestamp: 'desc',
        },
      });

      // Calculate the streak
      let newStreak = 1; // Default to 1 if this is the first entry
      if (lastEntry) {
        const lastEntryDate = lastEntry.timestamp;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Check if the last entry was yesterday
        if (lastEntryDate.toDateString() === yesterday.toDateString() || lastEntryDate.toDateString() === today.toDateString()) {
          // Get the current streak from the habit and increment it
          const currentHabit = await prisma.habit.findUnique({
            where: { id: input.habitId },
            select: { currentStreak: true },
          });
          newStreak = currentHabit ? currentHabit.currentStreak + 1 : 1;
        }
      }

      // Update the habit's current streak
      await prisma.habit.update({
        where: { id: input.habitId },
        data: { currentStreak: newStreak },
      });

      return newEntry;
    });
  }),

});
