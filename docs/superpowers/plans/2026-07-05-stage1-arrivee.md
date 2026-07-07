# Stage 1 — L'Arrivée: Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire la première section du funnel CompetitivIA — un hero premium avec révélation de texte progressive et un indicateur de scroll différé, alimenté par des données fictives typées.

**Architecture:** Single-page funnel App Router. `StageArrivee` est un Server Component qui compose deux Client Components animés (`RevealText`, `ScrollIndicator`). `FunnelFlow` orchestre les stages futures. Le contenu mock est centralisé et typé dans `lib/mock-data.ts`.

**Tech Stack:** Next.js 16.2.10, React 19.2.4, Tailwind v4 (CSS-based config), TypeScript. Pas de librairie d'animation — CSS keyframes natifs pour ce stage.

## Global Constraints

- `'use client'` uniquement sur les fichiers qui utilisent `useState` / `useEffect` / APIs browser
- Tailwind v4 : pas de `tailwind.config.js` — tous les tokens dans `globals.css` via `@theme`
- LCP < 1.5s : zéro layout shift, polices chargées via `next/font/google`
- Zéro navigation visible, zéro CTA dans Stage 1
- Tout le contenu texte vient de `lib/mock-data.ts` — aucune string hardcodée dans les composants
- Police d'affichage : Cormorant Garamond (premium, éditoriale) pour les headlines
- Couleurs : `--brand-ink` (#0D0D0D), `--brand-paper` (#F9F8F6), `--brand-muted` (#8A8A8A)

---

## Structure des fichiers

```
app/
  layout.tsx                    MODIFIER — ajouter Cormorant Garamond + metadata
  globals.css                   MODIFIER — design tokens + keyframe animations
  page.tsx                      MODIFIER — rendre <FunnelFlow />

components/
  funnel/
    FunnelFlow.tsx              CRÉER — orchestrateur des stages (Server Component)
    stages/
      StageArrivee.tsx          CRÉER — composition Stage 1 (Server Component)
  ui/
    RevealText.tsx              CRÉER — révélation mot par mot ('use client')
    ScrollIndicator.tsx         CRÉER — point pulsant différé 2s ('use client')

lib/
  types.ts                      CRÉER — types TypeScript du funnel
  mock-data.ts                  CRÉER — contenu fictif Stage 1
```

---

### Task 1: Design Tokens & Polices

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: variables CSS `--brand-ink`, `--brand-paper`, `--brand-muted`, classes Tailwind `text-ink`, `text-paper`, `text-muted`, `bg-paper`, `bg-ink`, `font-display`, keyframes `fade-up` et `pulse-dot`

- [ ] **Step 1: Mettre à jour globals.css**

Remplacer le contenu entier de `app/globals.css` par :

```css
@import "tailwindcss";

:root {
  --brand-ink: #0D0D0D;
  --brand-paper: #F9F8F6;
  --brand-muted: #8A8A8A;
  --brand-accent: #C8A96E;
}

@theme inline {
  --color-ink: var(--brand-ink);
  --color-paper: var(--brand-paper);
  --color-muted: var(--brand-muted);
  --color-accent: var(--brand-accent);
  --font-sans: var(--font-geist-sans);
  --font-display: var(--font-cormorant);

  --animate-fade-up: fade-up 0.7s ease forwards;
  --animate-pulse-dot: pulse-dot 2s ease-in-out infinite;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.15); }
}

html, body {
  background-color: var(--brand-paper);
  color: var(--brand-ink);
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}
```

- [ ] **Step 2: Ajouter Cormorant Garamond dans layout.tsx**

Remplacer le contenu de `app/layout.tsx` par :

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CompetitivIA — Executive Product Experience",
  description: "Découvrez ce que votre communication dit vraiment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Lancer le dev server et vérifier qu'aucune erreur n'apparaît**

```bash
pnpm dev
```

Attendu : serveur démarre sur http://localhost:3000, pas d'erreur dans la console. La page affiche toujours le contenu Next.js par défaut (c'est normal à ce stade).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add design tokens, Cormorant Garamond font, brand CSS variables"
```

---

### Task 2: Types TypeScript & Mock Data

**Files:**
- Create: `lib/types.ts`
- Create: `lib/mock-data.ts`

**Interfaces:**
- Produces:
  - `Stage1Content` type : `{ headline: string; subline: string }`
  - `stage1Content` : instance de `Stage1Content` avec le contenu fictif
  - `FunnelStage` enum : `ARRIVEE = 1`

- [ ] **Step 1: Créer lib/types.ts**

```typescript
export enum FunnelStage {
  ARRIVEE = 1,
  FILM = 2,
  DECLIC = 3,
  EXPERIENCE_IA = 4,
  DECOUVERTE = 5,
  PROJECTION = 6,
  ACTION = 7,
}

export interface Stage1Content {
  headline: string;
  subline: string;
}
```

- [ ] **Step 2: Créer lib/mock-data.ts**

```typescript
import type { Stage1Content } from "./types";

export const stage1Content: Stage1Content = {
  headline: "Certaines conversations changent le destin d'une entreprise.",
  subline: "Découvrez ce que la vôtre dit vraiment.",
};
```

- [ ] **Step 3: Vérifier que TypeScript accepte les fichiers**

```bash
pnpm exec tsc --noEmit
```

Attendu : aucune erreur TypeScript.

- [ ] **Step 4: Commit**

```bash
git add lib/types.ts lib/mock-data.ts
git commit -m "feat: add funnel TypeScript types and Stage 1 mock content"
```

---

### Task 3: Composant RevealText

**Files:**
- Create: `components/ui/RevealText.tsx`

**Interfaces:**
- Consumes: rien des tâches précédentes côté imports, mais reçoit des props
- Produces:
  ```typescript
  // Props exportées
  interface RevealTextProps {
    text: string;
    className?: string;
    baseDelay?: number; // délai avant le 1er mot, en ms (défaut: 0)
    wordDelay?: number; // délai entre chaque mot, en ms (défaut: 80)
  }
  export default function RevealText(props: RevealTextProps): JSX.Element
  ```

- [ ] **Step 1: Créer components/ui/RevealText.tsx**

```tsx
"use client";

interface RevealTextProps {
  text: string;
  className?: string;
  baseDelay?: number;
  wordDelay?: number;
}

export default function RevealText({
  text,
  className = "",
  baseDelay = 0,
  wordDelay = 80,
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-[fade-up_0.6s_ease_forwards]"
          style={{ animationDelay: `${baseDelay + i * wordDelay}ms` }}
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
```

- [ ] **Step 2: Tester visuellement dans le browser**

Modifier temporairement `app/page.tsx` pour tester le composant isolément :

```tsx
import RevealText from "@/components/ui/RevealText";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper p-8">
      <RevealText
        text="Certaines conversations changent le destin d'une entreprise."
        className="text-4xl font-display font-light text-ink"
        baseDelay={300}
        wordDelay={100}
      />
    </div>
  );
}
```

Aller sur http://localhost:3000. Les mots doivent apparaître un par un avec un léger mouvement vers le haut.

- [ ] **Step 3: Commit**

```bash
git add components/ui/RevealText.tsx app/page.tsx
git commit -m "feat: add RevealText animated word-by-word component"
```

---

### Task 4: Composant ScrollIndicator

**Files:**
- Create: `components/ui/ScrollIndicator.tsx`

**Interfaces:**
- Consumes: rien
- Produces:
  ```typescript
  // Props exportées
  interface ScrollIndicatorProps {
    delay?: number; // ms avant apparition (défaut: 2000)
  }
  export default function ScrollIndicator(props: ScrollIndicatorProps): JSX.Element
  ```

- [ ] **Step 1: Créer components/ui/ScrollIndicator.tsx**

```tsx
"use client";

import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  delay?: number;
}

export default function ScrollIndicator({ delay = 2000 }: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div
      className="flex flex-col items-center gap-3 animate-[fade-up_0.8s_ease_forwards]"
      aria-hidden="true"
    >
      <div className="w-px h-8 bg-muted/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-muted animate-[pulse-dot_2s_ease-in-out_infinite]" />
    </div>
  );
}
```

- [ ] **Step 2: Tester visuellement**

Modifier `app/page.tsx` pour inclure le ScrollIndicator :

```tsx
import RevealText from "@/components/ui/RevealText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-paper p-8 gap-16">
      <RevealText
        text="Certaines conversations changent le destin d'une entreprise."
        className="text-4xl font-display font-light text-ink max-w-xl text-center"
        baseDelay={300}
        wordDelay={100}
      />
      <ScrollIndicator delay={2000} />
    </div>
  );
}
```

Vérifier sur http://localhost:3000 : le point pulsant apparaît après 2 secondes.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ScrollIndicator.tsx app/page.tsx
git commit -m "feat: add ScrollIndicator component with configurable appearance delay"
```

---

### Task 5: StageArrivee — composition du Stage 1

**Files:**
- Create: `components/funnel/stages/StageArrivee.tsx`

**Interfaces:**
- Consumes:
  - `RevealText` depuis `@/components/ui/RevealText`
  - `ScrollIndicator` depuis `@/components/ui/ScrollIndicator`
  - `stage1Content` depuis `@/lib/mock-data` : `{ headline: string, subline: string }`
- Produces:
  ```typescript
  export default function StageArrivee(): JSX.Element
  ```

- [ ] **Step 1: Créer components/funnel/stages/StageArrivee.tsx**

```tsx
import RevealText from "@/components/ui/RevealText";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { stage1Content } from "@/lib/mock-data";

export default function StageArrivee() {
  const { headline, subline } = stage1Content;

  // Durée estimée de l'animation headline (nb_mots × 100ms + 300ms base)
  const wordCount = headline.split(" ").length;
  const sublineDelay = 300 + wordCount * 100 + 400;

  return (
    <section
      id="stage-arrivee"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-paper"
      aria-label="Arrivée"
    >
      {/* Zone de contenu centré — max 640px pour respirer */}
      <div className="max-w-[640px] w-full flex flex-col items-center text-center gap-8">
        {/* Headline — police éditoriale, fine, grande */}
        <h1 className="font-display font-light text-[2.6rem] leading-[1.2] tracking-[-0.01em] text-ink sm:text-[3.25rem]">
          <RevealText
            text={headline}
            baseDelay={300}
            wordDelay={100}
          />
        </h1>

        {/* Subline — Geist, muted, taille modérée */}
        <p className="font-sans text-lg leading-relaxed text-muted max-w-sm">
          <RevealText
            text={subline}
            baseDelay={sublineDelay}
            wordDelay={70}
          />
        </p>
      </div>

      {/* Scroll indicator — ancré en bas de la section */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <ScrollIndicator delay={3500} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Vérifier que TypeScript accepte le fichier**

```bash
pnpm exec tsc --noEmit
```

Attendu : aucune erreur.

- [ ] **Step 3: Commit**

```bash
git add components/funnel/stages/StageArrivee.tsx
git commit -m "feat: add StageArrivee composition with headline, subline, and scroll indicator"
```

---

### Task 6: FunnelFlow + branchement dans page.tsx

**Files:**
- Create: `components/funnel/FunnelFlow.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes:
  - `StageArrivee` depuis `@/components/funnel/stages/StageArrivee`
- Produces:
  ```typescript
  export default function FunnelFlow(): JSX.Element
  ```

**Note de conception :** `FunnelFlow` est un Server Component. Il rend uniquement `StageArrivee` pour l'instant. Quand les stages 2–7 seront ajoutés, `FunnelFlow` les inclura séquentiellement. La gestion d'état (quel stage est actif, session_id IA, etc.) sera ajoutée dans un plan ultérieur avec Zustand.

- [ ] **Step 1: Créer components/funnel/FunnelFlow.tsx**

```tsx
import StageArrivee from "@/components/funnel/stages/StageArrivee";

export default function FunnelFlow() {
  return (
    <main className="w-full">
      <StageArrivee />
      {/* Stage 2–7 seront ajoutés ici dans les plans suivants */}
    </main>
  );
}
```

- [ ] **Step 2: Remplacer app/page.tsx**

```tsx
import FunnelFlow from "@/components/funnel/FunnelFlow";

export default function Home() {
  return <FunnelFlow />;
}
```

- [ ] **Step 3: Vérifier le build complet**

```bash
pnpm exec tsc --noEmit
```

Attendu : zéro erreur TypeScript.

- [ ] **Step 4: Vérifier visuellement dans le browser**

Aller sur http://localhost:3000.

Checklist visuelle :
- [ ] Fond couleur `--brand-paper` (beige très clair, pas blanc pur)
- [ ] Headline en Cormorant Garamond, grande, légère, qui apparaît mot par mot
- [ ] Subline en Geist, gris `--brand-muted`, qui apparaît après la headline
- [ ] Zéro navigation visible
- [ ] Point pulsant apparaît en bas après ~3.5s
- [ ] Page respire — beaucoup d'espace vide autour du texte

- [ ] **Step 5: Vérifier les performances**

Dans Chrome DevTools → Lighthouse → Performance (mode Desktop) :
- LCP < 1.5s
- CLS = 0 (aucun layout shift)

- [ ] **Step 6: Commit final**

```bash
git add components/funnel/FunnelFlow.tsx app/page.tsx
git commit -m "feat: wire FunnelFlow into page — Stage 1 L'Arrivée complete"
```

---

## Self-Review

**Couverture des exigences du document source :**

| Exigence | Task |
|----------|------|
| "Le site respire. Silence. Élégance. Aucune surcharge." | Task 5 — layout centré, max-width 640px, whitespace généreux |
| "Aucune pression commerciale." | Task 5 — zéro CTA, zéro nav |
| "Objectif émotionnel : Confiance." | Task 1 + 5 — palette sobre, typographie premium |
| "Le CEO ressent immédiatement qu'il entre dans un environnement premium." | Task 1 — Cormorant Garamond, tokens brand |
| "LCP < 1.5s" | Task 1 — next/font (self-hosted), pas d'images, CSS natif |
| Données fictives typées et modulables | Task 2 — `lib/mock-data.ts` + `lib/types.ts` |
| Architecture modulable pour les stages suivants | Task 6 — `FunnelFlow` comme orchestrateur extensible |

**Scan des placeholders :** aucun TBD, aucun "fill in later" — tous les steps contiennent le code réel.

**Cohérence des types :**
- `Stage1Content` défini dans `lib/types.ts` Task 2, importé dans `lib/mock-data.ts`
- `RevealTextProps` défini et utilisé dans Task 3
- `ScrollIndicatorProps` défini et utilisé dans Task 4
- `stage1Content` importé dans `StageArrivee` Task 5 ✓
