import { Sidebar } from '../_components/dashboard/sidebar';
import Navbar from '../_components/shared/navbar/index';

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (

    <div className='h-screen w-full overflow-y-hidden'>
        <Navbar dashboard={true}/>
        <div className="flex justify-start h-full w-full">
        <Sidebar className='border-r border-slate-200 max-w-[250px] h-full'/>
        {children}  
        </div>

    </div>
    )
  }