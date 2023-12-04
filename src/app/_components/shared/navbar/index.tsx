import type { BaseHTMLAttributes } from 'react'
import MaxWidthWrapper from '../max-width-wrapper'
import NavContent from './nav-content/index';
import { cn } from '~/utils/utils';
import { api } from '~/trpc/server'
import { getServerAuthSession } from "~/server/auth";

interface Props extends BaseHTMLAttributes<HTMLElement>{
    dashboard?:boolean,
}

async function Navbar({dashboard=false,className, ...props}:Props){

    const hello = await api.post.hello.query({ text: "from tRPC" });
    const session = await getServerAuthSession();


  return (
    <nav className={cn('sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all',className)} {...props}>
        {!dashboard?
        (
        <MaxWidthWrapper>
            <NavContent session={session??null} />
         </MaxWidthWrapper>
        ):
        <NavContent className='px-10' session={session??null} />
        }


    </nav>
  )
}

export default Navbar

