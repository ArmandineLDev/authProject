# auth-Project

Intro :

## stack :

nextjs
tailwindcss / shadcn/ui
next auth
postgresql / neon.tech

## installation

    ```bash
    git clone
    cd auth-Project
    ```

Dans le fichier `package.json`, changer de nom du projet et spécifier le numéro de port par défaut

    ```bash
    pnpm install
    ```

Si on ne fonctiopnne pas avec `pnpm`, il suffit de supprimer le fichier pnpm-lock.yaml et de lancer `npm install`.

Créer le fichier `.env` sur le modèle du fichier `.env.example` et ajouter les informations.
Ajuster les credentials de OAuth2.0 dans le fichier `next.config.js`.
Créer la base de données et insérer les informations de connexion dans le fichier `prisma/schema.prisma`.
Créer les informations en vue de l'envoi des mails. Par défaut, le service a été créé avec `Resend`.

    ```bash
    pnpm run dev
    ```

