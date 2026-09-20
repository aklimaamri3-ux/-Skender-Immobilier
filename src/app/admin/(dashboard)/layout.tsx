import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import { getNewInquiriesCount } from "@/lib/data/admin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { admin } = await requireAdmin();
  const newInquiriesCount = await getNewInquiriesCount();

  return (
    <div className="flex flex-col lg:flex-row">
      <AdminSidebar adminName={admin.full_name} newInquiriesCount={newInquiriesCount} />
      <div className="min-w-0 flex-1">
        <main className="section-container py-6 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
