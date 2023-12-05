'use client'
import { ChevronDownIcon, CircleIcon, PlusIcon, Check, FastForward } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '~/app/_components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/app/_components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/app/_components/ui/dropdown-menu'
import { Separator } from '~/app/_components/ui/separator'
import { api } from '~/trpc/react'
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import type { HabitWithPriority } from '~/types'


interface Props {
    habit: HabitWithPriority,
    setSelectedHabit:React.Dispatch<React.SetStateAction<HabitWithPriority | undefined>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
} 




function HabitCard({habit, setSelectedHabit, setOpen}: Props) {
  const { load } = useGlobalAudioPlayer();

    const utils = api.useUtils();
    // const { mutate, error } =  api.habit.createHabitEntry.useMutation();
    const habitEntry = api.habit.createHabitEntry.useMutation({
        onSuccess: async () => {
            toast.success(`${habit.title}`);
            load('/success.mp3', {
              autoplay: true
            });
            await utils.habit.getAllHabits.invalidate();

        },
      });

  return (
    <>
    <Card className='max-w-[400px]'>
    <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 pr-8">
      <div className="space-y-1">
        <CardTitle>{habit.title}</CardTitle>
        <CardDescription>
            {habit.description}
        </CardDescription>
      </div>
      <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
        <Button variant="secondary" className="px-3 shadow-none" onClick={
        ()=>{
            const habitId = habit.id
            habitEntry.mutate({ habitId });
        }} >
          <Check className="mr-2 h-4 w-4" />
          Check
        </Button> 
        <Separator orientation="vertical" className="h-[20px]" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="px-2 shadow-none">
              <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            alignOffset={-5}
            className="w-[200px]"
            forceMount
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem onClick={()=>{
              setSelectedHabit(habit);
              setOpen(true);
            }}>
              Edit
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PlusIcon className="mr-2 h-4 w-4" /> Create List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu >
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex space-x-4 text-sm text-muted-foreground">
       
       {habit.priority && <div className="flex items-center">
          <CircleIcon className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
          {habit.priority.title}
        </div>
        }
        <div className="flex items-center">
          <FastForward className="mr-1 h-3 w-3" />
            {habit.currentStreak}
        </div>
        <div>{habit.updatedAt.toDateString()} </div>
      </div>
    </CardContent>
  </Card>
  </>
  )
}

export default HabitCard

