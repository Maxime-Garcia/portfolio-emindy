# Changelog v1.1.0

**Date**: 2026-06-23  
**Status**: UX Enhancement Release  
**Author**: Tech Lead Frontend

## 🎨 UX & Animations Overhaul

Refonte complète de l'expérience utilisateur sur l'ensemble des composants frontend, alignée sur les standards Awwwards / Dribbble. Toutes les améliorations reposent exclusivement sur Framer Motion v12 + Tailwind CSS — aucune dépendance ajoutée.

---

### Bugs corrigés

| Fichier | Problème | Correction |
|---|---|---|
| `tailwind.config.js` | Fonts déclarées (Georgia / Segoe UI) ne correspondaient pas aux Google Fonts importées (Playfair Display / Inter) | Config alignée sur les imports `index.css` |
| `App.tsx` | État `darkMode` géré mais aucun composant ne possédait de classes `dark:*` | Suppression propre de l'état mort et du toggle |
| `Contact.tsx` | Soumission du formulaire déclenchait `window.alert()` | Remplacé par un état de succès animé inline |

---

### Nouveautés globales

**`App.tsx`**
- `CustomCursor` : curseur circulaire rose (20px) avec spring lag (`damping: 22, stiffness: 280`). Actif uniquement sur `pointer: fine` — les mobiles conservent le curseur natif.
- `ScrollProgress` : barre de 3px en `position: fixed top-0` dont le `scaleX` est piloté par `useScroll().scrollYProgress` lissé avec `useSpring`.

**`index.css`**
- `.btn-shimmer` : effet shimmer diagonal animé au hover via `@keyframes shimmer`
- `.float-label-wrap` : pattern floating label CSS (`:not(:placeholder-shown)` + `:focus`) réutilisable sur tous les inputs
- `.custom-cursor-active` sur `body` pour masquer le curseur natif sur pointer devices

---

### Navigation (`Navigation.tsx`)

- **Scroll-aware** : transition transparente → `bg-cream/95 backdrop-blur-md` passé 40px de scroll
- **Underline animée** : `motion.span` avec `scaleX: 0 → 1` à l'origin-left au hover sur chaque lien
- **Menu mobile** : `AnimatePresence` + `motion.div` avec hauteur `0 → auto` + stagger de 60ms par lien
- **Icône hamburger** : rotation ±90° animée entre `Menu` et `X` via `AnimatePresence mode="wait"`
- **CTA "Me contacter"** : pill button ajouté en desktop et mobile avec effet shimmer

---

### Hero (`Hero.tsx`)

- **Révélation du titre** : "Alicia Henneton" découpé mot par mot — chaque `motion.span` entre avec `opacity: 0→1`, `y: 40→0`, `filter: blur(4px)→0`, stagger de 150ms
- **Parallax floral** : 3 éléments `✿` réagissent au mouvement de la souris via `useMotionValue` + `useTransform` sur des amplitudes différentes (`±18px`, `±12px`, `±8px`) pour créer de la profondeur
- **CTA button** : classe `.btn-shimmer` pour le shine diagonal au hover
- **Scroll indicator** : point qui rebondit dans un contour de souris en bas du viewport, visible après 1,4s

---

### Portfolio (`Portfolio.tsx`)

- **Filtre animé** : `<LayoutGroup>` + `<AnimatePresence mode="popLayout">` sur le grid — les cartes sortantes disparaissent en scale/fade avant que les entrantes n'arrivent
- **Prop `layout`** : repositionnement fluide des cartes lors du changement de filtre
- **Hover overlay** : l'overlay passe de `y: 100%` à `y: 0` (glissement depuis le bas) au lieu d'un simple `opacity`
- **Card lift** : `whileHover={{ y: -4, boxShadow }}` pour un effet de lévitation

---

### About (`About.tsx`)

- **Section stats** : 3 compteurs animés (8+ ans, 50+ projets, 30+ clients) déclenchés à l'entrée dans le viewport via `useInView` — interpolation de 0 à la valeur cible sur 1 400ms
- **Stagger skills** : chaque tag entre avec `opacity: 0→1, y: 12→0` décalé de `i × 55ms`
- **Micro-interaction** : `whileHover={{ scale: 1.04, rotate: 0.8 }}` sur les tags de compétences

---

### Contact (`Contact.tsx`)

- **Floating labels** : tous les `<input>` et `<textarea>` utilisent le pattern `.float-label-wrap` — le label se positionne à l'intérieur du champ et flotte en haut lors du focus ou quand la valeur est remplie
- **Succès animé** : `AnimatePresence mode="wait"` alterne entre le formulaire et un panneau de confirmation (✿ + message + bouton reset) avec spring `[0.34, 1.56, 0.64, 1]` sur l'icône
- **Contact items** : `whileHover={{ x: 4 }}` sur la ligne + `whileHover={{ rotate: 8, scale: 1.1 }}` sur l'icône

---

## 📝 Décisions d'architecture

- Aucune dépendance npm ajoutée : tout repose sur Framer Motion v12 déjà présent
- Le curseur custom est **opt-in** via media query `pointer: fine` pour garantir l'accessibilité mobile
- `viewport={{ once: true }}` conservé sur toutes les animations de scroll pour la performance
- `will-change-transform` appliqué aux éléments parallax critiques uniquement

## 🎯 Prochaines étapes (v1.2.0)

- [ ] Intégration du formulaire de contact avec le backend (endpoint `/api/contact`)
- [ ] Ajout des vraies images de projets (remplacement des placeholders Unsplash)
- [ ] Mode sombre complet (si demandé)
- [ ] Audit Lighthouse & optimisations performances

---

Generated: 2026-06-23T19:35:00Z
