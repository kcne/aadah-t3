import Link from 'next/link'
import type { BaseHTMLAttributes } from 'react'
import { ArrowRight } from 'lucide-react'


import { cn } from '~/utils/utils'
import { Button, buttonVariants } from '~/app/_components/ui/button'
import MobileNav from '../mobile-nav'
import UserAccountNav from '../user-account-nav'
import { Session } from 'next-auth'

interface Props extends BaseHTMLAttributes<HTMLElement>{
    session:Session | null
}


function NavContent({ session=null,className, ...props}: Props) {
    console.log(session);

    // console.log(user);
  return (
    <div className={cn('flex h-14 items-center justify-between border-b border-zinc-200 px-5', className)} {...props}>
    <Link href='/' className='flex z-40 font-semibold text-xl gap-1.5 items-center' >
        {/* <Image src='/logo.svg' width={25} height={25} alt='logo' /> */}
        <span>
            aadah.
        </span>
    </Link>

<MobileNav isAuth={session?.user?true:false} />

<div className='hidden items-center space-x-4 sm:flex'>
    {
        session===null ? (

    <>
        <Link href='/pricing' className={buttonVariants({
            variant: 'ghost',
            size:'sm'
        })}>
            Pricing
        </Link>
            <Link className={cn(buttonVariants({
                variant:'secondary',
                size:'sm'
            }))} href='/api/auth/signin'>Sign in</Link>
            <Link className={cn(buttonVariants({
                variant:'default',
                size:'sm'
            }))}  href='/api/auth/signout'>Get Starterted <ArrowRight className='ml-2 h-5 w-5'/></Link>
    </>
        ):
        (
        <>
            <Link
                href='/dashboard'
                className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                })}>
                Dashboard
            </Link>
            <UserAccountNav
            // name={
            // !user.firstName !==null || !user.lastName !==null
            //     ? 'Your Account'
            //     : `${user.firstName} ${user.lastName}`
            // }
            // email={user.emailAddresses.toString() ?? ''}
            // imageUrl={user.profileImageUrl ?? ''}
            name={session?.user?.name??''}
            email={session?.user?.email??''}
            imageUrl=''
        />

        </>
        )
    }
</div>
</div>
  )
}

export default NavContent