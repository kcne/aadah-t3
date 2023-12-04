import { AreaChart } from "lucide-react";
import { GitCompare } from "lucide-react";
import {CalendarCheck} from "lucide-react";
import { TimerReset } from "lucide-react";
import { Goal } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import type { SidebarNavItem } from "~/types";

export const sidebarNavItems:SidebarNavItem[]=[
    {
        title:"Dashboard",
        href:'/dashboard',
        icon: AreaChart,
    },  
    {
        title:"Habits",
        href:'/dashboard/habits',
        icon: GitCompare,
    },
    {
        title:"Routine Scheduler",
        href:'/dashboard/route-scheduler',
        icon: CalendarCheck,
    },
    {
        title:"Goals",
        href:'/dashboard/goals',
        icon: Goal,
    },
    {
        title:"Focus Timer",
        href:'/dashboard/focus-timer',
        icon: TimerReset,
    },
    {
        title:"Reflection Journal",
        href:'/dashboard/journal',
        icon: BookOpenCheck,
    }
]