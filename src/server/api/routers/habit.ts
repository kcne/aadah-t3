import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


const createHabitSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  priorityId: z.string().optional(),
});

const createHabitEntrySchema = z.object({ 
  habitId: z.string().min(1) 
});


const updateHabitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  description: z.string().min(2),
  priorityId: z.string().optional(),
});

const deleteHabitSchema =  z.object({
  id:z.string().min(1)
})


export const habitRouter = createTRPCRouter({
  createNewHabit: protectedProcedure
  .input(createHabitSchema)
  .mutation(async ({ctx, input})=>{
    return await ctx.db.habit.create({
      data:{
        title:input.title,
        description:input.description,
        createdBy: { connect: { id: ctx.session.user.id } },
        priority: input.priorityId? {connect: { id: input.priorityId}}:undefined,
      }
    })
  }),

  getAllHabits: protectedProcedure.query(async({ ctx }) => {
    return await ctx.db.habit.findMany({
      orderBy: { updatedAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      include: {
        priority: true,
      }
    });
  }),

  updateHabit: protectedProcedure
  .input(updateHabitSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.habit.update({
      where: { id: input.id },
      data: { 
        title:input.title,
        description:input.description,
        createdBy: { connect: { id: ctx.session.user.id } },
        priority: input.priorityId? {connect: { id: input.priorityId}}:undefined,
      },
    })
  }),

  deleteHabit: protectedProcedure
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
  
  createHabitEntry: protectedProcedure
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

      // Update the habit's current streak
      await prisma.habit.update({
        where: { id: input.habitId },
        data: { 
          currentStreak: newStreak,
          
        },
      });

      return newEntry;
    });
  }),
});

