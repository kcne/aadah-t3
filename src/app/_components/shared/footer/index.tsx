import Link from "next/link";
import React from "react";
import Image from "next/image";
import MaxWidthWrapper from "../max-width-wrapper";

function Footer() {
  return (
    <footer className="m-4 rounded-lg bg-slate-100 shadow">
      <MaxWidthWrapper className="mx-auto max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="z-40 flex items-center gap-1.5 text-xl font-semibold"
          >
            {/* <Image src='/logo.svg' width={25} height={25} alt='logo' /> */}
            <span>aadah.</span>
          </Link>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
            <li>
              <a href="#features" className="me-4 hover:underline md:me-6">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Sign In
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-1 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2023{" "}
          <a href="/" className="hover:underline">
            Aadah™
          </a>
          . All Rights Reserved.
        </span>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;
