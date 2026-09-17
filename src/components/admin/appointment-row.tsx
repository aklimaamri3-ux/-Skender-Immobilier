"use client";

import { updateAppointment } from "@/lib/actions/appointments";

interface AppointmentRowProps {
  id: string;
  status: string;
  note: string | null;
  scheduledAt: string | null;
  clientName: string;
  clientPhone: string;
  clientEmail: string | null;
}

export function AppointmentRow({
  id,
  status,
  note,
  scheduledAt,
  clientName,
  clientPhone,
  clientEmail,
}: AppointmentRowProps) {
  return (
    <tr className="border-t border-or/10 align-top">
      <td className="p-3">
        <p className="font-medium">{clientName}</p>
        <p className="text-xs text-blanc/50">{clientPhone}</p>
        {clientEmail && <p className="text-xs text-blanc/50">{clientEmail}</p>}
      </td>
      <td className="p-3">
        <form action={updateAppointment} className="flex flex-col gap-2">
          <input type="hidden" name="id" value={id} />
          <input
            type="date"
            name="scheduledAt"
            defaultValue={scheduledAt?.slice(0, 10) ?? ""}
            className="rounded-md border border-or/20 bg-noir px-2 py-1 text-xs text-blanc"
          />
          <select
            name="status"
            defaultValue={status}
            className="rounded-md border border-or/20 bg-noir px-2 py-1 text-xs text-blanc"
          >
            <option value="nouvelle">Nouvelle</option>
            <option value="confirme">Confirmé</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
          </select>
          <textarea
            name="note"
            defaultValue={note ?? ""}
            rows={2}
            placeholder="Note interne"
            className="rounded-md border border-or/20 bg-noir px-2 py-1 text-xs text-blanc"
          />
          <button type="submit" className="btn-outline-gold w-fit px-3 py-1 text-xs">
            Enregistrer
          </button>
        </form>
      </td>
    </tr>
  );
}
