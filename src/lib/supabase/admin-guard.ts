import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Admin } from "@/types/database";

export async function requireAdmin(): Promise<{ admin: Admin }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/admin/login?error=not_admin");
  }

  return { admin: admin as Admin };
}
