import { getAllAppointments } from "@/lib/data/admin";
import { AppointmentRow } from "@/components/admin/appointment-row";

export default async function AdminAppointmentsPage() {
  const appointments = await getAllAppointments();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Rendez-vous</h1>

      <div className="overflow-x-auto rounded-lg border border-or/15">
        <table className="w-full text-left text-sm">
          <thead className="bg-noir-soft text-blanc/60">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Gestion</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => {
              const inquiry = (
                appt as {
                  inquiries?: {
                    first_name?: string;
                    last_name?: string;
                    phone?: string;
                    email?: string | null;
                  };
                }
              ).inquiries;
              return (
                <AppointmentRow
                  key={appt.id}
                  id={appt.id}
                  status={appt.status}
                  note={appt.note}
                  scheduledAt={appt.scheduled_at}
                  clientName={`${inquiry?.first_name ?? ""} ${inquiry?.last_name ?? ""}`.trim() || "—"}
                  clientPhone={inquiry?.phone ?? "—"}
                  clientEmail={inquiry?.email ?? null}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
