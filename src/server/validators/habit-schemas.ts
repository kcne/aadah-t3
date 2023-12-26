import * as z from 'zod';
export const createHabitSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  priorityId: z.string().optional(),
  action: z.string().min(2),
  metricUnit: z.string().min(2),
  metricQuantity:z.number().int().min(1),
});

export const createHabitEntrySchema = z.object({ 
  habitId: z.string().min(1) 
});


export const updateHabitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  description: z.string().min(2),
  priorityId: z.string().optional(),
  action: z.string().min(2),
  metricUnit: z.string().min(2),
  metricQuantity:z.number().int().min(1),
});

export const deleteHabitSchema =  z.object({
  id:z.string().min(1)
})

