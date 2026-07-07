# Tâches Frontend — CompetitivIA Funnel

> Périmètre : développeurs Front-End uniquement
> Mission globale : **Créer la confiance et la fluidité**
> Contrainte maître : le CEO ne doit jamais avoir l'impression de visiter un site.

---

## Principes techniques non négociables

- **Pas de spinner** pendant une attente IA — toujours une animation de "réflexion"
- **Pas de layout standard** : pas de navbar visible, pas de footer, pas de sidebar
- **Performance** : LCP < 1.5s, FID < 100ms, CLS < 0.1
- **Transitions** : chaque changement d'étape est une transition animée, jamais un rechargement
- **Mobile-first** : le funnel doit fonctionner sur tablette et mobile (les CEOs voyagent)

---

## BLOC 1 — Infrastructure & Design System

### T-FE-01 · Setup du projet funnel
**Priorité : CRITIQUE**

- Initialiser le projet Next.js dans `funnel_stat/`
- Configurer Tailwind avec la palette CompetitivIA (couleurs, typographie)
- Installer Framer Motion pour les animations
- Configurer les fonts : inter ou geist pour le corps, serif pour les accroches
- Setup des variables d'environnement : `NEXT_PUBLIC_API_URL`

**Critère d'acceptation :** `pnpm dev` démarre, la page index charge en < 1s.

---

### T-FE-02 · Design System de base
**Priorité : HAUTE**

Créer les composants atomiques :
- `<Stage>` : wrapper de chaque étape, gère le scroll et la visibilité
- `<RevealText>` : animation d'apparition de texte (mot par mot ou ligne par ligne)
- `<PremiumButton>` : CTA avec hover state sophistiqué (pas de box-shadow basique)
- `<ScoreRing>` : compteur animé circulaire pour le score
- `<DimensionCard>` : carte d'affichage d'une dimension d'analyse

**Critère d'acceptation :** Storybook ou page de démo des composants.

---

### T-FE-03 · Système de navigation entre étapes
**Priorité : HAUTE**

- Pas de URL routing entre étapes — tout est dans la même page (single-scroll)
- État global de l'étape courante : Zustand ou React Context
- Chaque étape est une section `<section id="stage-N">` avec intersection observer
- Transition entre étapes : `framer-motion` AnimatePresence
- Gestion du back/forward browser : désactivé sur mobile, scroll-restoration sur desktop

**Critère d'acceptation :** Navigation fluide du stage 1 au stage 7 sans rechargement.

---

## BLOC 2 — Zone Passive (Étapes 1–3)

### T-FE-04 · Étape 1 — L'Arrivée
**Priorité : HAUTE**

Livrer la page hero :
- Fond : blanc cassé ou noir profond (à valider avec design)
- Headline : grande typographie, apparition progressive (fade + légère translation Y)
- Sous-titre : apparition décalée de 400ms
- Aucun élément de navigation visible
- Scroll indicator discret (flèche fine ou point pulsant) apparaît à 2s

**Métriques :** LCP < 1.5s, aucun layout shift (CLS = 0).

---

### T-FE-05 · Étape 2 — Le Film
**Priorité : HAUTE**

Lecteur vidéo custom :
- Autoplay muted au scroll dans la section
- Full-width, ratio 16:9, pas de border-radius
- Contrôles : uniquement un bouton son (discret, coin haut droit)
- Barre de progression : ligne fine 1px en bas de la vidéo
- À la fin : fondu vers noir puis transition vers Étape 3
- Fallback si video ne charge pas : image poster + bouton play

**Critère d'acceptation :** La vidéo se lit sans intervention sur desktop et mobile.

---

### T-FE-06 · Étape 3 — Le Déclic
**Priorité : HAUTE**

Séquence narrative :
- Phrase 1 : "Votre communication n'est pas une compétence."
  → Apparition mot par mot, 80ms entre chaque mot
- Pause 1.5s
- Phrase 2 : "C'est un actif stratégique."
  → Même animation, typographie plus grande et contrastée
- Pause 1s
- Apparition du CTA "Présentez votre entreprise" (fade in doux)

**Critère d'acceptation :** Séquence complète < 12s, CTA visible sans scroll sur desktop.

---

## BLOC 3 — Zone Active (Étapes 4–6)

### T-FE-07 · Étape 4 — Interface de capture audio
**Priorité : CRITIQUE**

Interface microphone :
- Consigne unique centrée : "Présentez votre entreprise en une minute."
- Bouton microphone : grand (80px), animation pulse quand actif
- Visualisation waveform en temps réel (Web Audio API + Canvas ou SVG)
- Compteur 60s : cercle fin qui se vide, discret, non anxiogène
- Arrêt manuel : bouton "J'ai terminé" apparaît à 15s

État "En analyse" (après soumission) :
- Cache l'interface micro
- Animation de "réflexion IA" : particules, cercles concentriques, ou gradient animé
- Texte rotatif toutes les 3s : "Analyse de votre structure narrative…", "Évaluation de votre autorité…", etc.
- Poll de l'API `/status` toutes les 1.5s → met à jour une barre de progression

Fallback texte :
- Si l'utilisateur refuse le microphone : textarea avec placeholder "Décrivez votre entreprise..."
- Même soumission vers l'API (mode `text` au lieu de `audio`)

**Critère d'acceptation :** Capture fonctionnelle, analyse affichée, fallback texte opérationnel.

---

### T-FE-08 · Étape 5 — Affichage narratif des résultats
**Priorité : CRITIQUE**

Affichage des 5 dimensions :
- Une dimension à la fois — scroll ou auto-scroll avec pause
- Structure de chaque carte :
  ```
  [Nom de la dimension]
  [Observation personnalisée — cite les mots du CEO]
  [Gap identifié — formulé positivement]
  [Indicateur visuel — barre ou score partiel, pas de chiffre brut]
  ```
- Animation d'entrée : slide-up + fade, 300ms
- Pas de tableau, pas de liste à puces — rendu éditorial

Navigation :
- Bouton "Suivant" discret entre chaque dimension
- OU auto-scroll avec pause de 4s sur chaque carte

**Critère d'acceptation :** Résultats mockés (données JSON fixes) s'affichent dans le bon format.

---

### T-FE-09 · Étape 6 — La Projection
**Priorité : HAUTE**

Executive Communication Score™ :
- Compteur animé : démarre à 0, monte jusqu'au score reçu de l'API (ex: 61)
- Durée de l'animation : 1.5s, easing ease-out
- Label sémantique sous le score
- Benchmark : texte discret en dessous

Executive Roadmap™ :
- Timeline verticale : 4 étapes (Score → Roadmap → Sprint → Asset)
- Chaque étape animée séquentiellement (500ms de délai entre chaque)
- Étape active : mise en valeur visuelle

CTA Final :
- "Démarrer mon CEO Pitch Asset Sprint™"
- Style : bouton plein, couleur dominante de la marque
- Animation au hover : légère élévation ou transition couleur

**Critère d'acceptation :** Score animé, roadmap visible, CTA déclenche la transition vers Étape 7.

---

### T-FE-10 · Étape 7 — Conversion
**Priorité : HAUTE**

Page de conversion :
- Rappel discret : score du CEO (petite badge en haut)
- Formulaire minimaliste : Prénom, Email, Créneau
- Calendly embed OU formulaire custom → API interne
- Message de confirmation personnalisé après soumission
- Pas de redirect — confirmation en place (slide-down)

**Critère d'acceptation :** Formulaire soumis, confirmation affichée, session_id associé au lead.

---

## BLOC 4 — Intégration API & État global

### T-FE-11 · Client API
**Priorité : CRITIQUE** (blocker pour Étapes 4–6)

Créer `lib/api-client.ts` :
```typescript
// Fonctions exposées :
startSession(payload: AudioBlob | string): Promise<{ session_id: string }>
getSessionStatus(id: string): Promise<{ status: string, progress: number }>
getAnalysis(id: string): Promise<AnalysisResult>
getScore(id: string): Promise<ScoreResult>
getRoadmap(id: string): Promise<RoadmapResult>
```

Sur les mocks : utiliser les fixtures JSON dans `__fixtures__/` pendant que l'API IA est en développement.

**Critère d'acceptation :** Toutes les fonctions mockées retournent des données valides typées.

---

### T-FE-12 · Gestion d'état global du funnel
**Priorité : HAUTE**

Store Zustand `useFunnelStore` :
```typescript
{
  currentStage: number           // 1-7
  sessionId: string | null
  analysisStatus: string
  analysisData: AnalysisResult | null
  scoreData: ScoreResult | null
  roadmapData: RoadmapResult | null
  actions: {
    nextStage()
    setSessionId(id: string)
    setAnalysis(data)
    setScore(data)
  }
}
```

**Critère d'acceptation :** Le store est partagé entre toutes les étapes sans prop drilling.

---

## BLOC 5 — Qualité & Performance

### T-FE-13 · Tests E2E du parcours complet
**Priorité : MOYENNE**

Avec Playwright :
- Test du parcours complet Stage 1 → Stage 7 (avec données mockées)
- Test du fallback texte si microphone refusé
- Test de la transition d'état "processing" → "ready"

**Critère d'acceptation :** Tests verts en CI.

---

### T-FE-14 · Audit performance
**Priorité : HAUTE** (avant mise en production)

- Lighthouse score > 90 sur Performance, Accessibilité
- LCP < 1.5s mesuré en production (pas en dev)
- Pas de layout shift sur les animations (CLS < 0.1)
- La vidéo est servie depuis un CDN (pas depuis le bundle)

---

## Ordre de développement recommandé

```
Sprint 1 (Semaine 1–2)
  T-FE-01 Setup
  T-FE-02 Design System
  T-FE-03 Navigation
  T-FE-04 Étape 1
  T-FE-05 Étape 2
  T-FE-06 Étape 3

Sprint 2 (Semaine 3–4) — Dépend de T-FE-11 mocks
  T-FE-11 Client API (mocks)
  T-FE-12 Store global
  T-FE-07 Étape 4
  T-FE-08 Étape 5

Sprint 3 (Semaine 5)
  T-FE-09 Étape 6
  T-FE-10 Étape 7
  T-FE-13 Tests E2E

Sprint 4 (Semaine 6) — Intégration API réelle
  Branchement API IA réelle (remplacer mocks)
  T-FE-14 Audit performance
```
