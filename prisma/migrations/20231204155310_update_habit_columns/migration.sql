-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    "priorityId" TEXT,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "lastStreakUpdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Habit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Habit_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Habit" ("createdAt", "createdById", "currentStreak", "description", "id", "lastStreakUpdate", "priorityId", "title", "updatedAt") SELECT "createdAt", "createdById", "currentStreak", "description", "id", "lastStreakUpdate", "priorityId", "title", "updatedAt" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
CREATE INDEX "Habit_title_idx" ON "Habit"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
