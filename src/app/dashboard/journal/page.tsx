'use client'
import { api } from "~/trpc/react";
import { Card, CardDescription, CardTitle, CardHeader } from "~/app/_components/ui/card";
import { formatToDDMMYY } from "~/utils/dateFormater";
import { Button, buttonVariants } from '~/app/_components/ui/button';
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { Separator } from '~/app/_components/ui/separator';

// const markdown = `
// # Hello world!
// Check the EditorComponent.tsx file for the code .
// `
export default function ReflectionJournal() {

    const {data,error} = api.journal.getJorunalEntries.useQuery();
    console.log(data,'data');
  return (
    <div className='w-full px-10 py-7'>
        <h3 className="text-3xl font-semibold">
            Journal Entries
        </h3>
        <Separator className="my-4" />
        {
            data?.map(
                entry=>
                (
                    <Card className="max-w-[300px]">
                        <CardHeader>
                            <CardTitle>
                                {entry.title}
                            </CardTitle>
                            <div className="w-full flex items-center justify-between">
                            <CardDescription className="w-fit">
                                {formatToDDMMYY(entry.createdAt)}
                            </CardDescription>
                            <Link href={`/dashboard/journal/${entry.id}`} className={buttonVariants({
                                size:'sm',
                                variant:'outline'
                            })}>
                                 Read More <ArrowRight className='ml-1' size={15}/>
                            </Link>
                            </div>

                        </CardHeader>
                    </Card>
                )
            )
        }
    </div>
  )
} 