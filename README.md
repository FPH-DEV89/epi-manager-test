# EPI MANAGER 🛡️

Système de gestion de stock et de demandes d'Équipements de Protection Individuelle (EPI).

## 🚀 Fonctionnalités

- **Employés** : Assistant interactif pour demander des équipements (taille, type, raison).
- **Managers** : Dashboard sécurisé pour valider/refuser les demandes et gérer les stocks.
- **Sécurité** : Authentification via NextAuth (Zone Admin protégée).
- **Suivi** : Historique des demandes et état des stocks en temps réel.

## 🛠️ Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Style** : Tailwind CSS v4
- **Base de Données** : PostgreSQL (via Prisma)
- **Tests** : Vitest
- **CI/CD** : GitHub Actions

## 📦 Installation

1.  **Cloner le projet** :
    ```bash
    git clone https://github.com/Start-sys-hub/EPI-MANAGER.git
    cd epi-manager
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Configurer l'environnement** :
    Créez un fichier `.env` à la racine :
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/epi_manager"
    AUTH_SECRET="votre_secret_super_securise"
    ```

4.  **Initialiser la Base de Données** :
    ```bash
    npx prisma migrate dev
    npm run seed # Pour ajouter les données de test
    ```

5.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

## 🧪 Tests

Lancer les tests unitaires :
```bash
npm test
```

## 🔐 Accès Manager

Pour accéder à la zone manager (`/admin`), utilisez les identifiants par défaut (en dev) :
- **Email** : `admin@epi-manager.com`
- **Mot de passe** : `admin123`

---

## 🤖 L'Équipe Autonome

Ce projet est maintenu par une équipe d'agents IA autonomes :
- **Chef** : Coordination
- **Expert Métier** : Logique de gestion
- **Design** : Interface Utilisateur
- **Front-End & Back-End** : Code
- **Security** : Authentification
- **QA** : Tests
- **DevOps** : CI/CD
