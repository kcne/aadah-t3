'use client'
import React from 'react'
import HabitCard from '~/app/_components/dashboard/habits/habit-card';
import { Button } from '~/app/_components/ui/button';
import { api } from '~/trpc/react'
import { PlusSquare } from 'lucide-react';
import { Dialog, DialogTrigger } from '~/app/_components/ui/dialog';
import HabitDialog from '~/app/_components/dashboard/habits/habit-dialog';

function Habits({}) {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const {data:habits} = api.habit.getAllHabits.useQuery();
  

  return (
    <Dialog>
    <div className='h-full w-full p-10 pt-5'>
      <DialogTrigger asChild>
      <Button variant="outline">
        Add new habit <PlusSquare size={18} className='ml-1.5'/>
      </Button>
      </DialogTrigger>
      {
        habits &&
        <div className='mx-auto w-full mt-5 flex flex-col justify-start border border-zinc-200 rounded-xl p-3'>
          
          {
            habits.map(habit =>
                <HabitCard key={habit.id} habit={habit} priority={habit.priority}/>
              )
          }

        </div>
      }

    </div>
    <HabitDialog/>
    </Dialog>
  )
}

export default Habits