import { z } from "zod";

export const JSONContentSchema = z.object({
  type: z.string().nullable(),
  attrs: z.any().nullable(), // Json type
  content: z.any().nullable(), // Json type
  marks: z.any().nullable(), // Json type
  text: z.string().nullable(),
  extra: z.any().nullable(), // Json type
});

export const createJournalEntrySchema = z.object({
  title: z.string(),
  jsonContent: z.any(), // Accepts a JSON object or null
});

export const updateJournalEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(2),
  jsonContent: z.any(), // Accepts a JSON object or null
});

