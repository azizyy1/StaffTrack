# PointagePro

PointagePro est une application web de gestion des ressources humaines développée pour Infinity Soft.

Elle permet la gestion des employés, le suivi des présences, le pointage GPS, la validation par QR Code, la gestion des congés ainsi que la génération de rapports administratifs.

---

## Fonctionnalités

### Authentification

- Connexion Administrateur
- Connexion Employé
- Gestion des rôles
- Protection des routes

### Gestion des employés

- Ajouter un employé
- Modifier un employé
- Supprimer un employé
- Consulter la liste des employés

### Pointage

- Pointage d'entrée
- Pointage de sortie
- Vérification GPS
- Validation QR Code
- Détection des retards

### Gestion des congés

- Création de demandes de congé
- Validation des demandes
- Refus des demandes
- Historique des congés

### Rapports

- Consultation des pointages
- Recherche par employé
- Export PDF
- Tableau de bord RH

### Profil

- Consultation des informations utilisateur
- Gestion des rôles Admin / Employé

---

## Technologies utilisées

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Recharts
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

---

## Architecture

```text
frontend/
│
├── src/app
├── src/components
├── src/lib
└── public

backend/
│
├── controllers
├── models
├── routes
├── middleware
└── server.js
```

## Base de données

Collections MongoDB :

```text
users
attendances
leaves
```

---

## Installation

### Cloner le projet

```bash
git clone https://github.com/azizyy1/PointagePro.git
```

### Backend

```bash
cd backend

npm install

npm run dev
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Variables d'environnement

Créer un fichier `.env` dans le backend :

```env
PORT=5001

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY
```

---

## Comptes de démonstration

### Administrateur

```text
admin@pointagepro.com
123456
```

### Employé

```text
salma@pointagepro.com
123456
```

---

## Société

Infinity Soft est une entreprise spécialisée dans :

- Développement Web
- Développement Mobile
- Cloud Computing
- Cybersécurité
- Intelligence Artificielle

---

## Auteur

Hajar Azizi

EMSI – Ingénierie Informatique

2025 – 2026
