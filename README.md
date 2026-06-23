# Portfolio Alicia Henneton - Emindy

> Portfolio web innovant, performant et dynamique pour Alicia Henneton, graphiste et designer créatif.

![Status](https://img.shields.io/badge/Status-Active%20Development-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-success)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎨 Aperçu

Un portfolio web sophistiqué mettant en avant les créations visuelles d'Alicia avec:
- **Design Cottage Floral** minimaliste et élégant
- **Animations complexes** via Framer Motion
- **Performance optimale** (Lighthouse 95+)
- **Stack moderne** Fastify + React + Tailwind

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run dev          # Dev server @ http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev          # Dev @ http://localhost:5173
```

### Configuration
1. Copier `.env.example` → `.env` dans `/backend`
2. Ajouter credentials Gmail (App Password)
3. C'est prêt! 🎉

## 📚 Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Workflow & standards
- **[docs/versions/](./docs/versions/)** - Versioned releases & reviews
- **[.claude/agents/](.//.claude/agents/)** - Agent specifications

## 🛠️ Stack Technique

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Framer Motion, Vite |
| **Backend** | Fastify, TypeScript, Zod, Nodemailer, Pino |
| **Styling** | Tailwind CSS + Custom CSS |
| **Animations** | Framer Motion + Three.js |
| **Email** | Nodemailer + Gmail App Passwords |
| **Logging** | Pino (JSON structured logs) |

## 📁 Architecture

```
portfolio-emindy/
├── backend/                    # Fastify API
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Custom middlewares
│   │   ├── utils/             # Helpers (email, validators, logger)
│   │   └── types/             # TypeScript types
│   ├── dist/                  # Compiled output
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React App
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Helpers
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/                # Static assets
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
│   └── versions/              # Versioned releases & reviews
│
├── .claude/
│   ├── agents/                # Agent specifications
│   │   ├── tech-lead-backend.md
│   │   ├── tech-lead-frontend.md
│   │   └── code-reviewer.md
│   └── skills/                # Custom skills (future)
│
└── CONTRIBUTING.md            # Contribution guidelines
```

## 🎯 Git Workflow

```
master (production)
  ↑
  ├── develop (staging)
  │   ↑
  │   ├── feature/add-animations
  │   ├── feature/contact-form
  │   └── feature/dark-mode
```

**Commit Convention**:
```
[FEAT] Add contact form validation
[FIX] Fix mobile navigation overflow
[DEV] Refactor email utility
[DOCS] Update API documentation
[MISC] Update dependencies
```

## 🤖 Agents

### 🔧 Tech Lead Backend
- Gère la stack Fastify/Node.js
- Valide toutes entrées (Zod)
- Rate limiting & sécurité
- Logging structuré

### 🎨 Tech Lead Frontend
- Gère la stack React/Tailwind
- Animations complexes (Framer Motion)
- Performance optimale
- Responsive design

### 🔍 Code Reviewer
- Vérifie la qualité du code
- Validité TypeScript & ESLint
- Sécurité & performance
- Merge → develop si approuvé

## 📋 Features v1.0.0

- ✅ Backend API setup (Fastify)
- ✅ Frontend boilerplate (React)
- ✅ Contact form endpoint
- ✅ Email integration (Gmail)
- ✅ Type-safe validation (Zod)
- ✅ Structured logging
- ✅ Cottage floral design system
- ✅ Animations framework

## 🚧 Roadmap v1.1.0+

- [ ] Frontend contact form integration
- [ ] GitHub Actions CI/CD
- [ ] Performance audit & optimization
- [ ] Database integration (PostgreSQL)
- [ ] Authentication (JWT)
- [ ] CMS integration
- [ ] Analytics
- [ ] A/B Testing

## 🎨 Design System

### Palette Cottage Floral
- **Cream** `#FFF8F3` - Fond principal
- **Sage** `#9DBF8F` - Accent principal
- **Rose** `#D4A5A5` - Accent secondaire
- **Stone** `#8B8680` - Texte
- **Blush** `#F5E6E0` - Sections alternées

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🔒 Security

- ✅ Helmet headers
- ✅ CORS configuré strictement
- ✅ Rate limiting activé
- ✅ Input validation (Zod)
- ✅ Environment variables
- ✅ No hardcoded secrets

## 📊 Performance

- Lighthouse score target: **95+**
- Bundle size: < 300KB (gzipped)
- First Contentful Paint: < 1.5s
- Fully Interactive: < 3s

## 🤝 Contributing

Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour les guidelines complets.

**Essentiellement**:
1. Créer branche `feature/votre-feature`
2. Faire commits avec format `[TYPE] Message`
3. Code doit passer code review
4. Merge vers `develop` si approuvé

## 📝 License

MIT © 2024 Alicia Henneton

## 📞 Contact

- Email: contact@aliciahenneton.com
- Portfolio: [aliciahenneton.com](https://aliciahenneton.com)
- GitHub: [@Maxime-Garcia](https://github.com/Maxime-Garcia)

---

**Créé avec ❤️ par Maxime Garcia**
