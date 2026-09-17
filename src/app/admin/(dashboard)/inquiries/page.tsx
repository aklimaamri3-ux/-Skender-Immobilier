import { getAllInquiries } from "@/lib/data/admin";
import { deleteInquiry, createAppointmentFromInquiry } from "@/lib/actions/inquiries-admin";
import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";
import { formatDate } from "@/lib/utils";

export default async function AdminInquiriesPage() {
  const inquiries = await getAllInquiries();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Demandes</h1>

      <div className="overflow-x-auto rounded-lg border border-or/15">
        <table className="w-full text-left text-sm">
          <thead className="bg-noir-soft text-blanc/60">
            <tr>
              <th className="p-3">Nom</th>
              <th className="p-3">Téléphone</th>
              <th className="p-3">Projet</th>
              <th className="p-3">Bien</th>
              <th className="p-3">Date souhaitée</th>
              <th className="p-3">Type</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-t border-or/10 align-top">
                <td className="p-3 font-medium">
                  {inquiry.first_name} {inquiry.last_name}
                  {inquiry.message && (
                    <p className="mt-1 max-w-xs text-xs text-blanc/50">{inquiry.message}</p>
                  )}
                </td>
                <td className="p-3 text-blanc/70">{inquiry.phone}</td>
                <td className="p-3 text-blanc/70">
                  {(inquiry as { projects?: { name?: string } }).projects?.name ?? "—"}
                </td>
                <td className="p-3 text-blanc/70">
                  {(inquiry as { properties?: { reference?: string } }).properties?.reference ?? "—"}
                </td>
                <td className="p-3 text-blanc/70">
                  {inquiry.desired_date ? formatDate(inquiry.desired_date) : "—"}
                </td>
                <td className="p-3 text-blanc/70">{inquiry.type}</td>
                <td className="p-3">
                  <InquiryStatusSelect id={inquiry.id} status={inquiry.status} />
                </td>
                <td className="p-3">
                  <div className="flex flex-col gap-2">
                    <form action={createAppointmentFromInquiry} className="flex flex-col gap-1">
                      <input type="hidden" name="inquiryId" value={inquiry.id} />
                      <input
                        type="date"
                        name="scheduledAt"
                        className="rounded-md border border-or/20 bg-noir px-2 py-1 text-xs text-blanc"
                      />
                      <button type="submit" className="text-xs text-or-clair hover:underline">
                        Programmer RDV
                      </button>
                    </form>
                    <form action={deleteInquiry}>
                      <input type="hidden" name="id" value={inquiry.id} />
                      <button type="submit" className="text-xs text-red-400 hover:underline">
                        Supprimer
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
