"use client";

import { updateInquiryStatus } from "@/lib/actions/inquiries-admin";

const options = [
  { value: "nouvelle", label: "Nouvelle" },
  { value: "contacte", label: "Contacté" },
  { value: "rdv_programme", label: "RDV programmé" },
  { value: "termine", label: "Terminé" },
  { value: "annule", label: "Annulé" },
];

export function InquiryStatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <form action={updateInquiryStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-md border border-or/20 bg-noir px-2 py-1 text-xs text-blanc"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  );
}
