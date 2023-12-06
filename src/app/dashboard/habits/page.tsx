"use client";
import React from "react";
import HabitCard from "~/app/_components/dashboard/habits/habit-card";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";
import { PlusSquare } from "lucide-react";
import HabitDialog from "~/app/_components/dashboard/habits/habit-dialog";
import { useState } from "react";
import type { HabitWithPriority } from "~/types";
import { ScrollArea } from "~/app/_components/ui/scroll-area";

function Habits({}) {
  const { data: habits } = api.habit.getAllHabits.useQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedHabit, setSelectedHabit] = useState<
    HabitWithPriority | undefined
  >(undefined);

  return (
    <>
      <div className="h-full w-full p-10 pt-5">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedHabit(undefined);
            setOpen(true);
          }}
        >
          Add new habit <PlusSquare size={18} className="ml-1.5" />
        </Button>

        {habits && (
          <ScrollArea className="mt-5 h-[85%] w-full rounded-xl border border-zinc-200 p-3">
            <div className="grid justify-center gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  setSelectedHabit={setSelectedHabit}
                  setOpen={setOpen}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      <HabitDialog
        setOpen={setOpen}
        habit={selectedHabit}
        setSelectedHabit={setSelectedHabit}
        open={open}
      />
    </>
  );
}

export default Habits;
