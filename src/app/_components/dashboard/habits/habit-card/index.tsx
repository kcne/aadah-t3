'use client'
import type { Habit, Priority } from '@prisma/client'
import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon, Check, FastForward } from 'lucide-react'
import React from 'react'
import { Button } from '~/app/_components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/app/_components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/app/_components/ui/dropdown-menu'
import { Separator } from '~/app/_components/ui/separator'
import { useToast } from '~/app/_components/ui/use-toast'

interface Props {
    habit: Habit
    priority: Priority | null
} 


function HabitCard({habit, priority}: Props) {
 const { toast } = useToast()
  return (
    <Card>
    <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 pr-8">
      <div className="space-y-1">
        <CardTitle>{habit.title}</CardTitle>
        <CardDescription>
            {habit.description}
        </CardDescription>
      </div>
      <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
        <Button variant="secondary" className="px-3 shadow-none" onClick={()=>{
        toast({
            title: `Checked: ${habit.title}`,
            description: new Date().toString(),
            variant:'success'
            })
        }}>
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
            <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Future Ideas
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
       
       {priority && <div className="flex items-center">
          <CircleIcon className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
          {priority.title}
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
  )
}

export default HabitCard