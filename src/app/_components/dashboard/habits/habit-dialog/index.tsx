'use client'
import type { Habit } from '@prisma/client'
import React, { useEffect } from 'react'
import { Button } from '~/app/_components/ui/button'
import { DialogHeader,DialogContent, DialogDescription, DialogTitle, DialogFooter, Dialog  } from '~/app/_components/ui/dialog'
import { Input } from '~/app/_components/ui/input'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/app/_components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/app/_components/ui/select'
import { api } from '~/trpc/react'
import toast from 'react-hot-toast'
import type { HabitWithPriority } from '~/types'

const habitFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    priorityId: z.string().optional(),

  })

interface Props {
    habit?:HabitWithPriority | undefined
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    setSelectedHabit:React.Dispatch<React.SetStateAction<HabitWithPriority | undefined>>,
    open:boolean, 
}

function HabitDialog({open,setOpen,habit, setSelectedHabit}: Props) {
  const {data:priorities} = api.priority.getAllPriorities.useQuery();
  const utils = api.useUtils();


  const createNewHabit = api.habit.createNewHabit.useMutation({
    onSuccess: async (data) => {
        toast.success(`${data.title} created successfully.`);
        await utils.habit.getAllHabits.invalidate();
        habitForm.reset();
        setOpen(false);
    },
    onError: async (error) =>{
      toast.error(error.message);
    }
  });

  const updateHabit = api.habit.updateHabit.useMutation({
    onSuccess: async (data) => {
        toast.success(`${data.title} updated successfully.`);
        await utils.habit.getAllHabits.invalidate();
        habitForm.reset();
        setOpen(false);
    },
    onError: async (error) =>{
      toast.error(error.message);
    }
  });

  const defaultValues= {
    title: habit?.title??"",
    description:habit?.description??"",
    priorityId:habit?.priorityId??""
  }

    const habitForm = useForm<z.infer<typeof habitFormSchema>>({
        resolver: zodResolver(habitFormSchema),
        defaultValues:defaultValues
      })

      useEffect(() => {
        habitForm.reset(defaultValues);
        console.log('selectedHabit',habit)
      }, [habit])
      


      

    function onSubmit(values: z.infer<typeof habitFormSchema>) {
      if(habit){
        
        const dataWithId = {
          ...values,
          id: habit?.id
        }
        console.log('data',dataWithId);
      updateHabit.mutate(dataWithId);
      }
      else
      createNewHabit.mutate(values);
      setSelectedHabit(undefined);
    }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
<DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{habit?'Edit Habit':'Add New Habit'}</DialogTitle>
          <DialogDescription>
          {habit?`Edit your selected habit. Click save when you're done.`:`Add your new habit details here. Click save when you're done.`}
           
          </DialogDescription>
        </DialogHeader>
        <Form {...habitForm}>
        <form onSubmit={habitForm.handleSubmit(onSubmit)}>
        <div className="py-2">
          <div className="">
              <FormField
              control={habitForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Stay Hidrated" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={habitForm.control}
              name="description"
              render={({ field }) => (
                <FormItem className='mt-3'>
                  <FormLabel>Habit Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Drink a glass of water" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
          control={habitForm.control}
          name="priorityId"
          render={({ field }) => (
            <FormItem className='py-2'>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    priorities?.map((priority)=>
                    <SelectItem key={priority.id} value={priority.id}>{priority.title}</SelectItem>
                    )
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
            {/* <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
          </div>
        </div>

        <DialogFooter>
            <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
        </Form>
      </DialogContent>
      </Dialog>
  )
}

export default HabitDialog