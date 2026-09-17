"use client";

import { useActionState } from "react";
import { submitInquiry, type InquiryFormState } from "@/lib/actions/inquiries";
import type { Project, Property } from "@/types/database";

const initialState: InquiryFormState = { success: false };

export function VisitRequestForm({
  projects,
  properties,
  defaultProjectId,
  defaultPropertyId,
}: {
  projects: Pick<Project, "id" | "name">[];
  properties?: Pick<Property, "id" | "reference">[];
  defaultProjectId?: string;
  defaultPropertyId?: string;
}) {
  const [state, formAction, pending] = useActionState(submitInquiry, initialState);

  if (state.success) {
    return (
      <div className="rounded-lg border border-or/30 bg-charbon p-6 text-center">
        <p className="font-display text-lg font-semibold text-or-clair">
          Merci !
        </p>
        <p className="mt-2 text-sm text-blanc/70">
          Votre demande a bien été envoyée. Notre équipe vous contactera rapidement.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="type" value="visite" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-blanc/70">Prénom *</label>
          <input
            required
            name="firstName"
            className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-blanc/70">Nom *</label>
          <input
            required
            name="lastName"
            className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-blanc/70">Téléphone *</label>
          <input
            required
            name="phone"
            type="tel"
            className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-blanc/70">Email</label>
          <input
            name="email"
            type="email"
            className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-blanc/70">Projet</label>
          <select
            name="projectId"
            defaultValue={defaultProjectId ?? ""}
            className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
          >
            <option value="">Sélectionner un projet</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        {properties && properties.length > 0 && (
          <div>
            <label className="mb-1 block text-sm text-blanc/70">Bien</label>
            <select
              name="propertyId"
              defaultValue={defaultPropertyId ?? ""}
              className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
            >
              <option value="">Sélectionner un bien</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.reference}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm text-blanc/70">Date souhaitée</label>
          <input
            name="desiredDate"
            type="date"
            className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-blanc/70">Message</label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-400">{state.error}</p>
      )}

      <button type="submit" disabled={pending} className="btn-gold w-full sm:w-auto">
        {pending ? "Envoi en cours..." : "Demander une visite"}
      </button>
    </form>
  );
}
