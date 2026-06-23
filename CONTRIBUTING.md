# Contributing Guide - Portfolio Emindy

## 📋 Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

Follow naming: `feature/add-dark-mode`, `feature/email-validation`, etc.

### 2. Make Your Changes
- Follow the coding standards below
- Write clean, type-safe code
- Add tests if applicable
- Update documentation

### 3. Commit with Proper Format
```bash
git commit -m "[FEAT] Add dark mode support to UI"
```

**Commit Prefixes**:
- `[FEAT]` - New feature
- `[FIX]` - Bug fix
- `[DEV]` - Development/refactoring
- `[DOCS]` - Documentation
- `[MISC]` - Miscellaneous

### 4. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

### 5. Code Review
- Code Reviewer Agent will automatically check
- Must pass all quality checks
- Address feedback and push new commits
- Merge approved PRs to `develop`

## 🎯 Coding Standards

### Backend (Fastify/Node.js)
- TypeScript strict mode enabled
- Use Zod for input validation
- Add error handling and logging
- Follow `/backend/src` structure
- Add JSDoc for complex functions

```typescript
// Good
async function validateEmail(email: string): Promise<boolean> {
  const schema = z.string().email();
  return schema.parseAsync(email);
}

// Bad
async function validateEmail(email: any) {
  return email.includes('@');
}
```

### Frontend (React/Tailwind)
- Functional components only
- Use TypeScript for props
- Memoize expensive components
- Use Tailwind utility classes
- Animations via Framer Motion

```typescript
// Good
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
  return <button onClick={onClick} className={`btn btn-${variant}`}>{text}</button>;
};

// Bad
export const Button = ({ text, onClick, variant }) => {
  return <button onClick={onClick}>{text}</button>;
};
```

## 📝 Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `ContactForm`, `HeroSection` |
| Variables/Functions | camelCase | `sendEmail`, `isValidated` |
| Constants | UPPER_SNAKE_CASE | `MAX_ATTEMPTS`, `API_URL` |
| Routes | kebab-case | `/api/contact/send` |
| Files | kebab-case (components: PascalCase) | `utils/email.ts`, `ContactForm.tsx` |
| Branches | kebab-case | `feature/add-animations` |

## 🚀 Development Workflow

### Backend Development
```bash
cd backend
npm install
npm run dev
```

Server runs at `http://localhost:3000`

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

## ✅ Pre-Commit Checklist

- [ ] Code compiles without errors
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Tests pass (if applicable)
- [ ] No `console.log` statements (except for dev)
- [ ] No hardcoded secrets or credentials
- [ ] Commit message follows convention
- [ ] Branch name follows convention

## 📚 Documentation

For each completed feature/bug fix:
1. Update relevant section in `/docs/versions/vX.X.X/`
2. Add entry to CHANGELOG.md
3. Update README.md if architectural changes

## 🔒 Security Guidelines

- **Never** commit `.env` files
- **Always** validate inputs on both client & server
- **Always** use environment variables for secrets
- **Never** use `dangerouslySetInnerHTML`
- **Always** escape user input
- **Always** enable HTTPS in production

## 🎨 Design System

### Colors
- **Cream**: `#FFF8F3` (bg-cream)
- **Sage**: `#9DBF8F` (bg-sage)
- **Rose**: `#D4A5A5` (bg-rose)
- **Stone**: `#8B8680` (bg-stone)
- **Blush**: `#F5E6E0` (bg-blush)

### Typography
- **Serif**: Playfair Display (headings)
- **Sans**: Inter (body)

### Spacing
Use Tailwind defaults: `p-4`, `m-8`, etc. (4px = 1 unit)

## 🤝 Getting Help

- Check existing issues & PRs
- Read agent guidelines in `.claude/agents/`
- Review similar code in the codebase
- Ask in commit messages or PR descriptions

---

**Happy coding!** 🚀
