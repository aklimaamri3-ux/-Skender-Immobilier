"use client";

import { updatePropertyStatus } from "@/lib/actions/properties";

export function PropertyStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  return (
    <form action={updatePropertyStatus}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-md border border-or/20 bg-noir px-2 py-1 text-xs text-blanc"
      >
        <option value="disponible">Disponible</option>
        <option value="reserve">Réservé</option>
        <option value="vendu">Vendu</option>
      </select>
    </form>
  );
}
