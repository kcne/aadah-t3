'use client'
import React from 'react'
import HabitCard from '~/app/_components/dashboard/habits/habit-card';
import { Button } from '~/app/_components/ui/button';
import { api } from '~/trpc/react'
import { PlusSquare } from 'lucide-react';
import { Dialog, DialogTrigger } from '~/app/_components/ui/dialog';
import HabitDialog from '~/app/_components/dashboard/habits/habit-dialog';
import { useState } from 'react';
import type { HabitWithPriority } from '~/types';

function Habits({}) {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const {data:habits} = api.habit.getAllHabits.useQuery();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedHabit, setSelectedHabit] = useState<HabitWithPriority | undefined>(undefined);

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <div className='h-full w-full p-10 pt-5'>

      <Button variant="outline" onClick={()=>{
        setSelectedHabit(undefined);
        setOpen(true);
      }}>
        Add new habit <PlusSquare size={18} className='ml-1.5'/>
      </Button>
      
      {
        habits &&
        <div className='mx-auto w-full mt-5 flex flex-col justify-start border border-zinc-200 rounded-xl p-3'>
          
          {
            habits.map(habit =>
                <HabitCard key={habit.id} habit={habit} setSelectedHabit={setSelectedHabit} setOpen={setOpen}/>
              )
          }

        </div>
      }

    </div>
    <HabitDialog setOpen={setOpen} habit={selectedHabit} setSelectedHabit={setSelectedHabit}/>
    </Dialog>
  )
}

export default Habits