import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import MaxWidthWrapper from '../max-width-wrapper'


function Footer() {
  return (
    <footer className="bg-slate-100 rounded-lg shadow m-4">
        <MaxWidthWrapper className="max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href='/' className='flex z-40 font-semibold text-xl gap-1.5 items-center' >
                    {/* <Image src='/logo.svg' width={25} height={25} alt='logo' /> */}
                    <span>
                        aadah.
                    </span>
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#features" className="hover:underline me-4 md:me-6">Features</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Pricing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Sign In</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-1 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Aadah™</a>. All Rights Reserved.</span>
        </MaxWidthWrapper>
    </footer>
  )
}

export default Footer