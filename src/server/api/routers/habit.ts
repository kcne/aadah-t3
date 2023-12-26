import { BASE_XP, GROWTH_RATE } from "~/env";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { createHabitEntrySchema, createHabitSchema, deleteHabitSchema, updateHabitSchema } from "~/server/validators/habit-schemas";





export const habitRouter = createTRPCRouter({
create: protectedProcedure
  .input(createHabitSchema)
  .mutation(async ({ctx, input}) => {
    return await ctx.db.habit.create({
      data: {
        title: input.title,
        description: input.description, 
        action: input.action,
        createdBy: { connect: { id: ctx.session.user.id } },
        priority: input.priorityId ? { connect: { id: input.priorityId } } : undefined,
        metricUnit: input.metricUnit,
        metricQuantity:input.metricQuantity,
      }
    })
  }),

  getAll: protectedProcedure.query(async({ ctx }) => {
    return await ctx.db.habit.findMany({
      orderBy: { updatedAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        priority: true,
      }
    });
  }),

  update: protectedProcedure
  .input(updateHabitSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.habit.update({
      where: { id: input.id },
      data: { 
        title:input.title,
        description:input.description,
        createdBy: { connect: { id: ctx.session.user.id } },
        priority: input.priorityId? {connect: { id: input.priorityId}}:undefined,
        action: input.action,
        metricUnit: input.metricUnit,
        metricQuantity:input.metricQuantity,
    }
  })
  }),

  delete: protectedProcedure
  .input(deleteHabitSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (prisma) => {
      const deleteHabitEntries = await prisma.habitEntry.deleteMany({
        where: {
          habitId: input.id,
        }
      });
      const deleteHabit = await prisma.habit.deleteMany({
        where: {
          id: input.id
        }
      });
  
      return [deleteHabitEntries, deleteHabit];
    });
  }),
  
  createEntry: protectedProcedure
  .input(createHabitEntrySchema)
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
            select: { 
              currentStreak: true,
            },
          });
          newStreak = currentHabit ? currentHabit.currentStreak + 1 : 1;
        }
      }
      

      // const xpForNextLevel = BASE_XP * input

      const habit = await prisma.habit.findUnique({
      where: { id: input.habitId },
      select: {
        level: true,
        experience: true,
      },
    });

    if (habit) {
      const baseXp = BASE_XP; // Define BASE_XP, e.g., 100
      const growthRate = GROWTH_RATE; // Define GROWTH_RATE, e.g., 1.5
      const xpForNextLevel = baseXp * Math.pow(growthRate, habit.level);

      const newXp = habit.experience + baseXp;
      const isLevelUp = newXp >= xpForNextLevel;

      await prisma.habit.update({
        where: { id: input.habitId },
        data: {
          experience: { increment: BASE_XP },
          ...(isLevelUp && { level: { increment: 1 } }),
          currentStreak: newStreak,
        },
      });
    }

      return newEntry;
    });
  }),
});

