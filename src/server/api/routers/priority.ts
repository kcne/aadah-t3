import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const priorityRouter = createTRPCRouter({
    getAllPriorities: protectedProcedure.query(async({ ctx }) => {
        return await ctx.db.priority.findMany({
          orderBy: { id: "desc" },
        });
      })
});
