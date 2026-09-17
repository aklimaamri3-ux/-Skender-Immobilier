import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin } = await requireAdmin();

  return (
    <div className="flex">
      <AdminSidebar adminName={admin.full_name} />
      <div className="flex-1 overflow-x-hidden">
        <main className="section-container py-10">{children}</main>
      </div>
    </div>
  );
}
