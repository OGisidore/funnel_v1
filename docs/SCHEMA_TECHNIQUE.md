# Schéma Technique — CompetitivIA Funnel

## Vue d'ensemble

Le Funnel est une expérience en 7 étapes. Du point de vue technique, il se découpe en **deux zones distinctes** :

- **Zone passive** (Étapes 1–3) : rendu statique/animé, zéro appel IA
- **Zone active** (Étapes 4–6) : pipeline IA en temps réel, l'expérience se génère à partir de la voix du CEO

```
CEO arrive
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  ZONE PASSIVE — Frontend seul                                   │
│                                                                 │
│  Étape 1: L'Arrivée      → Page premium, silence, élégance     │
│  Étape 2: Le Film        → Lecteur vidéo cinématographique      │
│  Étape 3: Le Déclic      → Transition narrative "actif strat."  │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  ZONE ACTIVE — Frontend + AI Engineering                        │
│                                                                 │
│  Étape 4: L'Expérience IA                                       │
│    Frontend  → Capture audio 60s, visualisation live           │
│    AI Eng.   → STT + Analyse NLP en temps réel                 │
│                                                                 │
│  Étape 5: La Découverte                                         │
│    AI Eng.   → Scoring multi-dimensionnel + gaps identifiés    │
│    Frontend  → Rendu narratif des résultats (pas un dashboard)  │
│                                                                 │
│  Étape 6: La Projection                                         │
│    AI Eng.   → Executive Communication Score™ + Roadmap™       │
│    Frontend  → Visualisation de la trajectoire                  │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  CONVERSION                                                     │
│  Étape 7: Le Passage à l'Action                                 │
│    Frontend  → CTA, réservation du CEO Pitch Asset Sprint™     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Responsabilités par équipe technique

### Frontend Developer

| Périmètre | Mission | Critère de réussite |
|-----------|---------|---------------------|
| Étapes 1–3 | Rendu premium : animations, transitions, vidéo | Le CEO ne "voit" pas le site. Il vit une expérience. |
| Étape 4 | Interface de capture audio + feedback visuel temps réel | Zéro formulaire. Une seule action : parler. |
| Étape 5 | Affichage narratif des résultats IA | Les résultats lisent comme une révélation, pas un rapport. |
| Étape 6 | Score™ + Roadmap™ visualisés avec trajectoire | Le CEO comprend son potentiel d'évolution en 10 secondes. |
| Étape 7 | CTA + tunnel de conversion | Le passage à l'action semble une évidence. |

**Contraintes absolues :**
- LCP < 1.5s sur desktop
- Aucun spinner visible pendant l'analyse IA (skeleton / animation de "réflexion")
- Aucun élément UI qui ressemble à un SaaS standard
- Transitions entre étapes : fluides, driven par le scroll ou l'état

---

### AI Engineer

| Périmètre | Mission | Critère de réussite |
|-----------|---------|---------------------|
| Pipeline STT | Transcription audio → texte en < 3s | Précision > 95% sur voix de dirigeant (accent, bruit) |
| Analyse NLP | Extraction des dimensions de communication | 5 axes scorés, gaps identifiés avec exemples réels |
| Executive Communication Score™ | Score composite 0–100 | Reproductible, explicable, benchmarké |
| Executive Roadmap™ | Plan d'amélioration personnalisé | Spécifique au CEO, pas générique |
| API Funnel | Endpoints consommés par le Frontend | < 200ms pour les données de score, streaming pour l'analyse |

**Contraintes absolues :**
- Toute analyse doit être **explicable** : le CEO comprend pourquoi ce score
- Aucune réponse générique — chaque output doit référencer des éléments issus du discours du CEO
- Latence perçue : le frontend doit afficher une progression visuelle pendant que l'IA travaille

---

## Contrat d'API entre Frontend et AI Engineering

```
POST   /api/v1/session/start
       body: { audio: File | text: string }
       → { session_id: string, status: "processing" }

GET    /api/v1/session/:id/status
       → { status: "processing" | "ready", progress: 0-100 }

GET    /api/v1/session/:id/analysis
       → { dimensions: Dimension[], gaps: Gap[], raw_transcript: string }

GET    /api/v1/session/:id/score
       → { score: number, label: string, benchmark: string }

GET    /api/v1/session/:id/roadmap
       → { steps: RoadmapStep[], projection: ProjectionData }
```

---

## Les 5 dimensions d'analyse (AI Engineering → Frontend)

```
┌─────────────────────────────────────────────────────────────────────┐
│  Dimension           Score  Gap identifié          Exemple réel     │
├──────────────────────┼───────┼────────────────────┼─────────────────┤
│  Clarté du message   │  /20  │ Message trop dense  │ "Vous avez dit…"│
│  Mémorisation        │  /20  │ Pas d'ancre mémo.   │ "Aucune formule"│
│  Structure narrative │  /20  │ Début sans accroche │ "Ouverture terne"│
│  Autorité / Crédib.  │  /20  │ Ton hésitant        │ "3 tournures..."│
│  Appel à l'action    │  /20  │ Fin sans direction  │ "Clôture vague" │
└─────────────────────────────────────────────────────────────────────┘
                                          ↓
                         Executive Communication Score™
                              (somme pondérée /100)
```

---

## Règle de collaboration Frontend ↔ AI Engineering

1. **AI Engineering livre d'abord le contrat d'API** (types TypeScript + réponses mock)
2. **Frontend développe sur les mocks** — pas de blocage
3. **AI Engineering branche le vrai modèle** quand le pipeline est stable
4. **Latence cible** : l'analyse complète doit être prête en < 15s après soumission audio
5. **Streaming obligatoire** sur `/analysis` — le frontend affiche les dimensions au fur et à mesure

---

## Ce que le Funnel ne doit JAMAIS faire

| Interdit | Raison |
|----------|--------|
| Afficher un dashboard froid | Casse l'effet de révélation |
| Demander un formulaire avant l'analyse | Tue la participation (Étape 4) |
| Spinner statique pendant l'analyse | Brise l'illusion d'intelligence |
| Réponse IA générique | Détruit la crédibilité du produit |
| Temps de chargement > 3s sur une transition | Casse la perception premium |
