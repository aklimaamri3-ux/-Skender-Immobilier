import { getSettings } from "@/lib/data/public";
import { saveSettings } from "@/lib/actions/settings";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="mb-8 font-display text-3xl font-bold">Contenu du site</h1>

      <form action={saveSettings} className="card-premium max-w-2xl space-y-4 p-6">
        <Field label="Nom de l'agence">
          <input name="name" defaultValue={settings.name} className="input" />
        </Field>
        <Field label="Slogan">
          <input name="slogan" defaultValue={settings.slogan} className="input" />
        </Field>
        <Field label="Téléphone">
          <input name="phone" defaultValue={settings.phone} className="input" />
        </Field>
        <Field label="WhatsApp (format international, ex: 213555000000)">
          <input name="whatsapp" defaultValue={settings.whatsapp} className="input" />
        </Field>
        <Field label="Email">
          <input name="email" defaultValue={settings.email} className="input" />
        </Field>
        <Field label="Adresse">
          <input name="address" defaultValue={settings.address} className="input" />
        </Field>
        <Field label="Facebook (URL)">
          <input name="facebook" defaultValue={settings.facebook} className="input" />
        </Field>
        <Field label="Instagram (URL)">
          <input name="instagram" defaultValue={settings.instagram} className="input" />
        </Field>
        <Field label="Présentation de l'agence">
          <textarea name="about" rows={5} defaultValue={settings.about} className="input" />
        </Field>
        <Field label="Nombre de biens en location (affiché sur la page d'accueil)">
          <input
            type="number"
            min={0}
            name="rental_count"
            defaultValue={settings.rental_count}
            className="input"
          />
        </Field>

        <button type="submit" className="btn-gold">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-blanc/70">{label}</span>
      {children}
    </label>
  );
}
