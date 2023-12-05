'use client'
import type { Habit } from '@prisma/client'
import React from 'react'
import { Button } from '~/app/_components/ui/button'
import { DialogHeader,DialogContent, DialogDescription, DialogTitle, DialogFooter  } from '~/app/_components/ui/dialog'
import { Input } from '~/app/_components/ui/input'
import { Label } from '~/app/_components/ui/label'

import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '~/app/_components/ui/form'


// title            String
// description      String?
// createdAt        DateTime     @default(now())
// updatedAt        DateTime     @updatedAt
// createdById      String
// priorityId       String?
// currentStreak    Int          @default(0)
// lastStreakUpdate DateTime     @default(now())
// priority         Priority?    @relation(fields: [priorityId], references: [id])
// createdBy        User         @relation(fields: [createdById], references: [id])

const habitFormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    priorityId: z.string().uuid().nullable(),

  })

interface Props {
    habit?:Habit
}

function HabitDialog({}: Props) {
    const habitForm = useForm<z.infer<typeof habitFormSchema>>({
        resolver: zodResolver(habitFormSchema),
        defaultValues: {
          title: "",
          description:"",
          priorityId:"",
        },
      })


    function onSubmit(values: z.infer<typeof habitFormSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  return (
<DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>
            Add your new habit details here. Click save when you're done.
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
  )
}

export default HabitDialog