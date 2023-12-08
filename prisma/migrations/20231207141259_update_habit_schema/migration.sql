/*
  Warnings:

  - Made the column `action` on table `Habit` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "action" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "priorityId" TEXT,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "metricId" TEXT,
    CONSTRAINT "Habit_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Habit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Habit_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("action", "createdAt", "createdById", "currentStreak", "description", "id", "metricId", "priorityId", "title", "updatedAt") SELECT "action", "createdAt", "createdById", "currentStreak", "description", "id", "metricId", "priorityId", "title", "updatedAt" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
CREATE INDEX "Habit_title_idx" ON "Habit"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
