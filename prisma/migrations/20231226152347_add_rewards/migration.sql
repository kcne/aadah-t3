-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL,
    "level" INTEGER,
    "streak" INTEGER,
    "description" TEXT NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);
