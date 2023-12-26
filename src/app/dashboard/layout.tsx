import { Sidebar } from "../_components/dashboard/sidebar";
import Navbar from "../_components/shared/navbar/index";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-y-hidden h-screen">
      <Navbar dashboard={true} />
      <div className="flex h-full w-full justify-start">
        <Sidebar className="h-full max-w-[250px] border-r border-slate-200 sticky inset-x-0 top-0" />
          {children}
      </div>
    </div>
  );
}
