# SKENDER IMMOBILIER

**Votre projet, notre engagement.**

Plateforme immobilière premium (Next.js 16 + TypeScript + Tailwind CSS + Supabase) pour la promotion et la vente de programmes immobiliers en Algérie — multi-projets (Bousmail, puis Alger, Blida, ...), avec un dashboard d'administration complet.

## Stack technique

- **Next.js 16** (App Router, Server Actions, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (thème premium noir / doré)
- **Supabase** (PostgreSQL, Auth, Storage, Row Level Security)
- Déploiement cible : **Vercel**

## Fonctionnalités

### Côté client
- Accueil premium (hero, projet à la une, services, pourquoi nous choisir, galerie, avis, contact)
- `/projets` — liste des projets avec filtres (localisation, type, prix, statut)
- `/projets/[slug]` — page détail d'un projet (galerie, carte, biens, demande de visite)
- `/projets/[slug]/biens/[id]` — fiche détaillée d'un bien
- `/galerie` — galerie complète avec lightbox
- `/contact` et `/a-propos`
- Formulaire de demande de visite (enregistré en base) + bouton WhatsApp préconfiguré
- SEO : metadata dynamiques, Open Graph, sitemap.xml, robots.txt, JSON-LD (Schema.org RealEstateListing / Product)
- Base i18n prête pour FR / AR (RTL) / EN (`src/i18n`)

### Dashboard admin (`/admin`, authentification requise)
- Statistiques (projets, biens, disponibles/réservés/vendus, demandes, rendez-vous)
- Gestion des projets (CRUD, images, statut, publication)
- Gestion des biens (CRUD, photos, plans, statut)
- Gestion des demandes de visite / contact (statuts, création de rendez-vous)
- Gestion des rendez-vous (statut, note interne)
- Gestion des avis clients (CRUD, publication)
- Gestion du contenu du site (coordonnées, réseaux sociaux, textes)

## Démarrage en local

### 1. Prérequis
- Node.js 20+
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))

### 2. Installation

```bash
npm install
```

### 3. Configuration Supabase

1. Créez un projet sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, exécutez le contenu de [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql). Cela crée les tables, les policies RLS et les buckets de stockage.
3. Créez votre compte administrateur :
   - Dans **Authentication > Users**, créez un utilisateur (email + mot de passe).
   - Dans **SQL Editor**, ajoutez-le comme admin :
     ```sql
     insert into public.admins (id, full_name, email)
     values ('UUID_DE_L_UTILISATEUR', 'Votre nom', 'votre@email.com');
     ```
4. Copiez `.env.example` vers `.env.local` et renseignez :
   - `NEXT_PUBLIC_SUPABASE_URL` (Project Settings > API)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings > API — clé **anon/public**, jamais `service_role`)

### 4. Lancer le site

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000), le dashboard sur [http://localhost:3000/admin](http://localhost:3000/admin).

### 5. Build de production

```bash
npm run build
npm run start
```

## Structure du projet

```
src/
  app/
    (site)/            # pages publiques (accueil, projets, galerie, contact, à propos)
    admin/              # dashboard admin (login + zone protégée)
    sitemap.ts, robots.ts
  components/           # composants réutilisables (layout, home, projects, property, admin, forms)
  lib/
    supabase/            # clients Supabase (browser / server / middleware) + garde admin
    data/                 # requêtes de lecture (public + admin)
    actions/               # Server Actions (mutations : projets, biens, demandes, avis, paramètres, auth)
  i18n/                  # dictionnaires FR / AR / EN
  types/                 # types TypeScript alignés sur le schéma Supabase
supabase/
  migrations/0001_init.sql   # schéma complet, RLS, buckets de stockage
```

## Sécurité

- Aucune clé secrète n'est codée en dur ; tout passe par `.env.local` (non versionné).
- Row Level Security activée sur toutes les tables : les visiteurs ne peuvent lire que le contenu publié et créer des demandes ; seul un compte listé dans `admins` peut modifier les données.
- La clé `service_role` de Supabase ne doit **jamais** être utilisée côté client ni committée.
- Les routes `/admin/*` sont protégées par le middleware Next.js (redirection vers `/admin/login` si non authentifié).

## Déploiement sur Vercel

1. Poussez le projet sur GitHub (voir ci-dessous).
2. Importez le repo sur [vercel.com](https://vercel.com/new).
3. Renseignez les variables d'environnement (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`) dans les paramètres du projet Vercel.
4. Déployez.

## Git & GitHub

```bash
git init
git add .
git commit -m "Initial commit — SKENDER IMMOBILIER"
git branch -M main
git remote add origin <URL_DE_VOTRE_REPO>
git push -u origin main
```
