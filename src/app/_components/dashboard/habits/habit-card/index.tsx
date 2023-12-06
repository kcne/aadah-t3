'use client'
import { ChevronDownIcon, CircleIcon, Check, FastForward, ArchiveRestore } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { Button } from '~/app/_components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/app/_components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/app/_components/ui/dropdown-menu'
import { Separator } from '~/app/_components/ui/separator'
import { api } from '~/trpc/react'
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import type { HabitWithPriority } from '~/types'
import DeleteModal from '~/app/_components/shared/modals/delete-modal'
import { useState } from 'react';


interface Props {
    habit: HabitWithPriority,
    setSelectedHabit:React.Dispatch<React.SetStateAction<HabitWithPriority | undefined>>
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
} 


type PriorityColors = Record<string, string>;

const priorityColors: PriorityColors = {
  Low: "green",
  Medium: "yellow",
  High: "red"
};



function HabitCard({habit, setSelectedHabit, setOpen}: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const { load } = useGlobalAudioPlayer();

    const utils = api.useUtils();

    const habitEntry = api.habit.createHabitEntry.useMutation({
        onSuccess: async () => {
            toast.success(`${habit.title}`);
            load('/success.mp3', {
              autoplay: true
            });
            await utils.habit.getAllHabits.invalidate();

        },
      });

      const deleteHabitEntry = api.habit.deleteHabit.useMutation({
        onSuccess: async() => {
          toast.success(`${habit.title} delete successfully`)
          await utils.habit.getAllHabits.invalidate();
        }
      })


      function deleteAction(){
        deleteHabitEntry.mutate({id:habit.id});
        setOpenDeleteDialog(false);
      }

      function getFormatedDate(){
        const habitUpdatedAt = habit.updatedAt; // assuming this is a Date object
        const day = habitUpdatedAt.getDate(); // Gets the day as a number (1-31)
        const month = habitUpdatedAt.getMonth() + 1; // Gets the month as a number (0-11), +1 to make it 1-12
        const year = habitUpdatedAt.getFullYear(); // Gets the year as a four-digit number

        return `${day}/${month}/${year}`;
      }
  return (
    <>
    <Card className='max-w-[400px] min-w-[300px] md:mx-0'>
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
            <DropdownMenuItem onClick={()=>{
              setSelectedHabit(habit);
              setOpen(true);
            }}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>{setOpenDeleteDialog(true)}}>Delete</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu >
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex space-x-4 justify-between text-sm text-muted-foreground">
       
       {habit.priority && <div className="flex items-center">
            
          <CircleIcon className={`mr-1 h-3 w-3 fill-yellow-400 text-yellow-400 ${priorityColors[habit.priority.title]}`} />
          {habit.priority.title}
        </div>
        }

         <div className="flex items-center">
          <ArchiveRestore className="mr-1 h-3 w-3" />
          {getFormatedDate()} 
        </div>
        

      </div>
    </CardContent>
  </Card>
  <DeleteModal 
  title="Delete Habit"
  description='Are you sure you want to delete this habit?'
  open={openDeleteDialog}   
  setOpen={setOpenDeleteDialog} 
  deleteAction={deleteAction}/>
  </>
  )
}

export default HabitCard

