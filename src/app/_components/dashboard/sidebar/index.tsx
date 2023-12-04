'use client'
import { buttonVariants } from "../../ui/button"
import Link from "next/link";
import { sidebarNavItems } from "../../shared/navbar/items/nav-items";
import { cn } from "~/utils/utils";
import { usePathname } from 'next/navigation'



export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const pathname = usePathname();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Explore
          </h2>
          <div className="space-y-1">
          {
            sidebarNavItems.map(((navItem,index)=>{
              const href = navItem.href;
              return (
                <Link 
                key={index} 
                href={href??'/dashboard'}
                className={cn(buttonVariants({
                  variant:pathname===navItem.href?"secondary":"ghost" 
                }),"w-full justify-start")}
                >
                <navItem.icon className="mr-2 h-5 w-5"/>

                {navItem.title}
              </Link>
              )
            }))
          }

            
          </div>
        </div>


      </div>
    </div>
  )
}