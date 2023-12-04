import React from 'react'
import HabitCard from '~/app/_components/dashboard/habits/habit-card';
import { useToast } from '~/app/_components/ui/use-toast';
import { api } from '~/trpc/server'

async function Habits({}) {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  const habits =  await api.habit.getAllHabits.query();
  return (
    <div className='h-full w-full p-10'>
      {
        habits &&
        <div className='mx-auto w-[400px] flex flex-col justify-start border border-zinc-200 rounded-xl p-3'>
          
          {
            habits.map(habit =>
                <HabitCard habit={habit} priority={habit.priority}/>
              )
          }

        </div>
      }

    </div>
  )
}

export default Habits