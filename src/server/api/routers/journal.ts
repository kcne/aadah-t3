import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { createJournalEntrySchema } from "~/server/validators/journal-schemas";



export const journalRouter = createTRPCRouter({
    getJorunalEntries: protectedProcedure.query(async({ ctx }) => {
        return await ctx.db.journalEntry.findMany({
          orderBy: { createdAt: "desc" },
          select:{
            id:true,
            title:true,
            createdAt:true,
          }
          
        });
      }),
    getJournalEntryById: protectedProcedure.input(String).query(async({input,ctx}) => {
        return await ctx.db.journalEntry.findUnique({
          where:{id:input},
        });
      }),
      
    // updateJournalEntry: protectedProcedure.input(updateJournalEntrySchema).mutation(async({input,ctx}) => {
    //   return await ctx.db.jSONContent.update({
    //     where:{id: input.JSONContent.id},
    //       data:{
    //         ...input.JSONContent,
    //       }
    //   }),

    // })
  createNewJournal: protectedProcedure
    .input(createJournalEntrySchema)
    .mutation(async ({ctx, input}) => {
      return await ctx.db.journalEntry.create({
        data: {
            title:input.title,
            createdById:ctx.session.user.id,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            jsonContent: input.jsonContent,
        }
      })
    }),
});


