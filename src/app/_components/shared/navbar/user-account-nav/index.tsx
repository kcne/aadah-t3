"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "~/app/_components/ui/button";
import { Avatar, AvatarFallback } from "~/app/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "~/app/_components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { cn } from "~/utils/utils";

interface Props {
  email: string | undefined;
  imageUrl: string;
  name: string;
}

function UserAccountNav({ email, imageUrl, name }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="aspect-square h-8 w-8 rounded-full bg-slate-400">
          <Avatar className="relative h-8 w-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="text-center text-sm">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="text-sm font-medium text-black">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-zinc-700">
                {email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className=" cursor-pointer">
          <Link href="/dashboard" className="w-full">
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer px-2 text-sm hover:bg-slate-100">
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "max-h-5 w-full",
              }),
            )}
            href="/api/auth/signout"
          >
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAccountNav;
