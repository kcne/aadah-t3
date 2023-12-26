'use client';
import { api } from '~/trpc/react';
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
} from '~/app/_components/ui/card';
import { formatToDDMMYY } from '~/utils/dateFormater';
import { buttonVariants } from '~/app/_components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '~/app/_components/ui/separator';
import localFont from 'next/font/local';


const virgil = localFont({ src: '../../../../public/fonts/Virgil.woff2' });

export default function ReflectionJournal() {
  const { data, error } = api.journal.getJorunalEntries.useQuery();
  console.log(data, 'data');
  return (
    <div className={`${virgil.className} w-full px-10 py-7`}>
      <h3 className="text-3xl font-semibold">
        Reflection Journal
        <Link
          href={'/dashboard/journal/create'}
          className={buttonVariants({
            variant: 'outline',
            className: 'ml-3',
          })}
        >
          <Plus />
        </Link>
      </h3>
      <Separator className="my-4" />
      <div className="grid grid-rows-auto grid-cols-3 w-full gap-x-3 gap-y-3">
        {data?.map(entry => (
          <Card className="">
            <CardHeader>
              <CardTitle>{entry.title}</CardTitle>
              <div className="w-full flex items-center justify-between">
                <CardDescription className="w-fit">
                  {formatToDDMMYY(entry.createdAt)}
                </CardDescription>
                <Link
                  href={`/dashboard/journal/${entry.id}`}
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'outline',
                  })}
                >
                  Open in editor <ArrowRight className="ml-1" size={15} />
                </Link>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
