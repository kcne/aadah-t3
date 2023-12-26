import type{ Habit, Priority } from "@prisma/client";

export type SidebarNavItem = {
    title:string,
    disabled?:boolean,
    href?:string,
    icon?: typeof Icon
  }

  export interface HabitWithPriority extends Habit{
    priority: Priority | null,
}
