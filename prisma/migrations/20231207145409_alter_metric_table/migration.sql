/*
  Warnings:

  - You are about to alter the column `metricQuantity` on the `Habit` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "mericUnit" TEXT NOT NULL,
    "metricQuantity" INTEGER NOT NULL,
    CONSTRAINT "Habit_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Habit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("action", "createdAt", "createdById", "currentStreak", "description", "id", "mericUnit", "metricQuantity", "priorityId", "title", "updatedAt") SELECT "action", "createdAt", "createdById", "currentStreak", "description", "id", "mericUnit", "metricQuantity", "priorityId", "title", "updatedAt" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
CREATE INDEX "Habit_title_idx" ON "Habit"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
