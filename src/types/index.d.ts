export type SidebarNavItem = {
    title:string,
    disabled?:boolean,
    href?:string,
    icon?: typeof Icon
  }

  export type HabitWithPriority = {
    priority: {
        id: string;
        title: string;
        tailwindColor: string | null;
    } | null;
} & {
    id: string;
    title: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
    priorityId: string | null;
    currentStreak: number;
    lastStreakUpdate: Date;
}