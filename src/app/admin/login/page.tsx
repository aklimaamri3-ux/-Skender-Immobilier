"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card-premium w-full max-w-sm p-8">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.35em] text-or-clair">
          Administration
        </p>
        <h1 className="mb-8 text-center font-display text-2xl font-bold gold-gradient-text">
          SKENDER IMMOBILIER
        </h1>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-blanc/70">Email</label>
            <input
              required
              type="email"
              name="email"
              className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-blanc/70">Mot de passe</label>
            <input
              required
              type="password"
              name="password"
              className="w-full rounded-md border border-or/20 bg-noir px-3 py-2 text-sm text-blanc outline-none focus:border-or"
            />
          </div>

          {state.error && <p className="text-sm text-red-400">{state.error}</p>}

          <button type="submit" disabled={pending} className="btn-gold w-full">
            {pending ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
