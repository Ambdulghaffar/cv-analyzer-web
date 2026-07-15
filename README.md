# CV Analyzer — Web

Frontend Next.js du projet **CV Analyzer AI** : analysez, comparez et optimisez des CVs face à des offres d'emploi, avec des espaces dédiés candidats et recruteurs.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?logo=tailwindcss) ![Supabase](https://img.shields.io/badge/Supabase-Auth-3ecf8e?logo=supabase)

## Fonctionnalités

### Espace Candidat
- Analyse d'un CV par rapport à une offre d'emploi : score de correspondance pondéré, compétences trouvées / manquantes, recommandations personnalisées
- Historique de toutes les analyses effectuées
- Génération de lettres de motivation avec choix du ton et de la langue
- Export des lettres de motivation en PDF et Word
- Gestion des paramètres du compte

### Espace Recruteur
- Comparaison de plusieurs CVs par rapport à une offre, avec classement automatique des candidats
- Gestion des offres d'emploi sauvegardées (création, modification, suppression)
- Historique des comparaisons effectuées
- Gestion des paramètres du compte

## Stack technique

| Domaine | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Langage | TypeScript |
| Style | Tailwind CSS v4 |
| Composants UI | shadcn/ui |
| Authentification | Supabase Auth (`@supabase/ssr`) |
| Formulaires & validation | react-hook-form + zod |
| Conteneurisation | Docker |

## Architecture

Le routage est organisé en **Route Groups** de Next.js pour séparer clairement les grands ensembles de pages sans impacter les URLs :

- `(public)` — pages accessibles à tous (accueil, à propos)
- `(auth)` — pages d'authentification (login, register, forgot/reset password, onboarding de rôle, callback OAuth)
- `dashboard` — espaces protégés candidat et recruteur, avec layout partagé (sidebar shadcn, breadcrumb dynamique) et sous-routes propres à chaque rôle

Les appels à Supabase sont séparés selon le contexte d'exécution : un client **navigateur** pour les composants client, et un client **serveur** (utilisé notamment dans le middleware et les Server Components/Route Handlers) qui gère les cookies de session via `@supabase/ssr`.

## Authentification

Deux méthodes de connexion sont disponibles :
- **Email / mot de passe**, avec confirmation d'adresse email
- **Google OAuth**

Le rôle de l'utilisateur (candidat ou recruteur) est déterminé soit au moment de l'inscription classique, soit lors du premier login via Google — dans ce second cas, l'utilisateur est redirigé vers une page d'onboarding (`/onboarding/role`) tant qu'aucun rôle n'a été choisi.

Les routes sous `/dashboard/*` sont protégées par un middleware Next.js : toute requête non authentifiée est redirigée vers `/login`.

## Prérequis

- Node.js 22+
- Un projet Supabase configuré (le même projet que celui utilisé par le backend)
- Le backend [cv-analyzer-api](#projets-liés) lancé en local, ou son URL de déploiement

## Installation locale

1. Cloner le dépôt puis se placer dans le dossier du projet :
   ```bash
   git clone <url-du-depot>
   cd cv-analyzer-web
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Créer un fichier `.env.local` à la racine avec les variables suivantes :

   ```env
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   NEXT_PUBLIC_API_URL=
   ```

   - `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` : disponibles dans le Dashboard Supabase du projet (le même projet que celui utilisé par le backend), section **Project Settings > API Keys** — utiliser la clé **"Publishable key"**.
   - `NEXT_PUBLIC_API_URL` : l'URL du backend `cv-analyzer-api`, en local (`http://localhost:8000` par défaut) ou son URL de déploiement.

   > La connexion via Google OAuth nécessite en plus une configuration côté Google Cloud Console (Client ID/Secret) et côté Dashboard Supabase (**Authentication > Providers > Google**). Voir la [documentation officielle Supabase](https://supabase.com/docs/guides/auth/social-login/auth-google) pour le détail des étapes.

4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

L'application est accessible sur [http://localhost:3000](http://localhost:3000).

## Lancer avec Docker

Le `Dockerfile` fourni s'appuie sur le mode `standalone` de Next.js pour produire une image de production légère.

```bash
docker build -t cv-analyzer-web .
docker run --env-file .env.local -p 3000:3000 cv-analyzer-web
```

## Design

L'interface propose un thème clair et sombre, construit autour d'une palette bleue cohérente sur l'ensemble de l'application. Les pages d'authentification s'appuient sur des illustrations personnalisées générées spécifiquement pour le projet.

## Projets liés

- [cv-analyzer-api](#) — API backend consommée par ce frontend (analyse de CV, comparaison, génération de lettres de motivation)
- [cv-analyzer-infra](#) — orchestration Docker Compose de l'ensemble des services du projet

## Auteur

**Ambdulghaffar Ahamadi**
- GitHub : [github.com/ambdulghaffar](https://github.com/ambdulghaffar)
- LinkedIn : [linkedin.com/in/ambdulghaffar-ahamadi](https://www.linkedin.com/in/ambdulghaffar-ahamadi-7a476839a/)
