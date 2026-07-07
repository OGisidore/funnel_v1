# Tâches AI Engineering — CompetitivIA Funnel

> Périmètre : ingénieurs IA uniquement
> Mission globale : **Créer la révélation**
> Contrainte maître : chaque analyse doit être rapide, pertinente, personnalisée, explicable et utile.

---

## Principe fondamental

L'IA du funnel n'est pas un chatbot. Elle est un **miroir analytique**.

Le CEO parle 60 secondes. En retour, il reçoit une lecture de sa communication qu'il n'aurait jamais formulée lui-même. Cette lecture :
- Utilise **ses propres mots** (citations verbatim)
- Identifie des **patterns** qu'il ne perçoit pas consciemment
- Produit un **score reproductible** et un **plan d'action concret**

---

## Architecture du pipeline IA

```
[Audio 60s ou Texte]
         │
         ▼
┌─────────────────────────────────┐
│  MODULE 1 · Transcription       │
│  STT : audio → texte brut       │
│  Cible : < 3s, précision > 95%  │
└─────────────────────┬───────────┘
                      │
                      ▼
┌─────────────────────────────────┐
│  MODULE 2 · Préprocessing NLP   │
│  Nettoyage, segmentation,       │
│  extraction entités (nom,       │
│  secteur, produits, cibles)     │
└─────────────────────┬───────────┘
                      │
                      ▼
┌─────────────────────────────────┐
│  MODULE 3 · Analyse 5 dimensions│
│  Scoring parallèle sur :        │
│  · Clarté du message            │
│  · Mémorisation                 │
│  · Structure narrative          │
│  · Autorité / Crédibilité       │
│  · Appel à l'action             │
└─────────────────────┬───────────┘
                      │
                      ▼
┌─────────────────────────────────┐
│  MODULE 4 · Score global        │
│  Executive Communication Score™ │
│  Agrégation pondérée /100       │
│  Label sémantique + benchmark   │
└─────────────────────┬───────────┘
                      │
                      ▼
┌─────────────────────────────────┐
│  MODULE 5 · Roadmap             │
│  Executive Roadmap™ personnalisé │
│  Basé sur les gaps prioritaires  │
│  Projection score cible + délai  │
└─────────────────────────────────┘
```

---

## MODULE 1 · Transcription (STT)

### T-AI-01 · Intégration Speech-to-Text
**Priorité : CRITIQUE**

**Choix technologique :**
- Option A : Whisper (OpenAI) via API — recommandé pour la précision
- Option B : Whisper local (whisper.cpp) — recommandé si contrainte de confidentialité
- Option C : Deepgram / AssemblyAI — si latence critique (< 2s)

**Ce qui doit être livré :**
- Fonction `transcribe(audioBlob: Blob): Promise<string>`
- Gestion des formats : WebM, MP4, WAV (selon ce que le browser envoie)
- Gestion du silence et des pauses (ne pas s'arrêter à une pause de 2s)
- Confidence score : si < 0.7, déclencher le fallback texte

**Critère d'acceptation :**
- Test avec 10 enregistrements audio de 60s → précision > 95% sur voix de dirigeant
- Latence p95 < 4s sur un fichier de 60s

---

### T-AI-02 · Fallback et validation
**Priorité : HAUTE**

- Si le texte transcrit contient < 50 mots : retourner une erreur `too_short`
- Si la confidence STT < 0.7 : logger et utiliser le texte quand même, mais tagger `low_confidence`
- Si l'entrée est du texte direct (fallback frontend) : bypass STT, passer directement au préprocessing

---

## MODULE 2 · Préprocessing NLP

### T-AI-03 · Extraction d'entités métier
**Priorité : HAUTE**

À partir du texte transcrit, extraire :
```json
{
  "company_name": "string | null",
  "sector": "string | null",
  "products_services": ["string"],
  "target_audience": ["string"],
  "key_claims": ["string"],   // les 2-3 affirmations principales du CEO
  "tone": "formal | informal | mixed"
}
```

**Stack recommandé :** spaCy (FR) ou LLM prompt structuré (Claude / GPT-4o-mini)

**Critère d'acceptation :** Les entités extraites correspondent à ce que le CEO a dit dans 90% des cas (validation manuelle sur 20 exemples).

---

### T-AI-04 · Segmentation narrative
**Priorité : HAUTE**

Identifier dans le discours :
- **Ouverture** : les 10 premières secondes / 50 premiers mots
- **Corps** : développement
- **Clôture** : les 10 dernières secondes / 50 derniers mots
- **Présence/absence d'une accroche** (hook)
- **Présence/absence d'un appel à l'action** (call-to-action)

---

## MODULE 3 · Analyse 5 Dimensions

### T-AI-05 · Dimension 1 — Clarté du message
**Priorité : CRITIQUE**

**Ce qu'on mesure :**
- Le message principal est-il exprimable en une phrase ?
- Y a-t-il une idée centrale ou plusieurs idées qui se concurrencent ?
- Le vocabulaire est-il accessible à un non-expert du secteur ?

**Méthode :**
- Prompt LLM : demander d'identifier la "valeur principale" du discours
- Si le modèle hésite entre 2+ valeurs → score de clarté bas
- Analyse Flesch-Kincaid adapté au français pour la lisibilité

**Output attendu :**
```json
{
  "score": 14,       // /20
  "observation": "Vous articulez clairement que 'X' [citation verbatim], mais votre proposition de valeur est suivie de trois idées secondaires qui la diluent.",
  "gap": "Isoler votre message principal pour qu'il reste seul en mémoire."
}
```

---

### T-AI-06 · Dimension 2 — Mémorisation
**Priorité : CRITIQUE**

**Ce qu'on mesure :**
- Y a-t-il une formule mémorable ? (ex: "Nous faisons X pour que vous puissiez Y")
- Y a-t-il un chiffre marquant ?
- Y a-t-il une image ou métaphore ?
- Y a-t-il une répétition intentionnelle ?

**Méthode :**
- Détecter la présence de : chiffres, métaphores, anaphores, formules rhétoriques
- Score élevé = 2+ éléments de mémorisation. Score bas = aucun.

**Output attendu :**
```json
{
  "score": 8,
  "observation": "Votre discours est informatif mais ne contient aucune formule qui resterait en mémoire. Aucun chiffre, aucune image forte.",
  "gap": "Introduire une formule d'ancrage ou un chiffre-clé dès les 20 premières secondes."
}
```

---

### T-AI-07 · Dimension 3 — Structure narrative
**Priorité : HAUTE**

**Ce qu'on mesure :**
- Le discours suit-il une structure reconnaissable ? (Problème → Solution, STAR, Situation → Enjeu → Réponse)
- L'ouverture accroche-t-elle ?
- La clôture est-elle forte ou s'évanouit-elle ?

**Méthode :**
- Classifier l'ouverture : accroche forte / neutre / faible
- Classifier la clôture : résolutive / ouverte / absente
- Détecter une structure narrative dans le corps

**Output attendu :**
```json
{
  "score": 12,
  "observation": "Votre introduction commence par 'Nous sommes une entreprise qui…' — une formule très répandue qui ne différencie pas. Votre conclusion, 'voilà voilà', laisse l'auditeur sans direction claire.",
  "gap": "Remplacer l'ouverture par une question ou une affirmation surprenante. Terminer sur une intention claire."
}
```

---

### T-AI-08 · Dimension 4 — Autorité / Crédibilité
**Priorité : HAUTE**

**Ce qu'on mesure :**
- Y a-t-il des preuves sociales ? (clients, partenaires, chiffres de croissance)
- Le ton est-il assertif ou hésitant ? (détecter les marqueurs d'hésitation : "un peu", "en quelque sorte", "je pense que")
- Y a-t-il une légitimité affirmée ?

**Méthode :**
- Compter les marqueurs d'hésitation et de certitude
- Détecter les éléments de preuve sociale
- Ratio certitude/hésitation → score

**Output attendu :**
```json
{
  "score": 11,
  "observation": "Votre discours contient 7 tournures atténuantes ('on essaie de', 'c'est un peu comme', 'je pense que'). Ces formules diminuent la perception de votre autorité.",
  "gap": "Formuler en assertions directes. 'Nous permettons à X de faire Y' plutôt que 'on essaie d'aider à peu près Y'."
}
```

---

### T-AI-09 · Dimension 5 — Appel à l'action
**Priorité : HAUTE**

**Ce qu'on mesure :**
- Y a-t-il un CTA explicite dans le discours ?
- Le CTA est-il précis ou vague ?
- Le CTA est-il positionné à la clôture ?

**Méthode :**
- Détecter les verbes d'action en fin de discours
- Classifier : absent / vague ("contactez-nous") / précis ("réservez un diagnostic de 30 minutes")

**Output attendu :**
```json
{
  "score": 6,
  "observation": "Votre discours ne se termine pas par une invitation à agir. La dernière phrase est 'et voilà, c'est notre métier' — elle ferme la conversation au lieu de l'ouvrir.",
  "gap": "Terminer systématiquement par une invitation précise et à faible friction."
}
```

---

## MODULE 4 · Executive Communication Score™

### T-AI-10 · Calcul du score composite
**Priorité : CRITIQUE**

**Pondération (à valider avec le Product Owner) :**
```
Clarté du message     : 25%
Mémorisation          : 20%
Structure narrative   : 20%
Autorité              : 20%
Appel à l'action      : 15%
```

**Score final :** somme pondérée, sur 100

**Labels sémantiques :**
```
0–30   : "Communication en phase de construction"
31–50  : "Communication en développement"
51–70  : "Communication structurée"
71–85  : "Communication exécutive"
86–100 : "Communication stratégique de haut niveau"
```

**Benchmark :**
- Calculé sur la base de sessions précédentes (ou fictif pour le lancement)
- Format : "Les dirigeants qui nous rejoignent ont en moyenne un score de 54 au démarrage"

**Output attendu :**
```json
{
  "score": 61,
  "label": "Communication structurée",
  "benchmark": "Les dirigeants qui démarrent avec nous ont en moyenne un score de 54."
}
```

---

## MODULE 5 · Executive Roadmap™

### T-AI-11 · Génération de la Roadmap personnalisée
**Priorité : HAUTE**

**Logique de génération :**
1. Identifier les 2 dimensions avec les scores les plus bas
2. Générer 3–4 étapes d'amélioration priorisées, spécifiques au profil du CEO
3. Projeter un score cible après le Sprint

**Structure de la Roadmap :**
```json
{
  "steps": [
    {
      "title": "CEO Pitch Asset Sprint™",
      "description": "Reconstruire votre pitch autour d'une formule d'ancrage mémorable.",
      "outcome": "Un pitch de 90 secondes que votre interlocuteur répète spontanément."
    },
    {
      "title": "Executive Messaging Framework",
      "description": "Structurer vos 3 messages clés selon le format Situation → Enjeu → Réponse.",
      "outcome": "Chaque prise de parole renforce les mêmes 3 messages stratégiques."
    }
  ],
  "projection": {
    "score_cible": 82,
    "delai": "6 semaines",
    "gain_estime": "+21 points"
  }
}
```

---

## API Layer — Contrat avec le Frontend

### T-AI-12 · Endpoints REST
**Priorité : CRITIQUE** (bloquant pour le Frontend Étapes 4–6)

**À livrer en priorité : les mocks (semaine 1)**

```typescript
// POST /api/v1/session/start
Request:  { audio?: Blob, text?: string }
Response: { session_id: string, status: "processing" }

// GET /api/v1/session/:id/status
Response: { status: "processing" | "ready" | "error", progress: number } // 0-100

// GET /api/v1/session/:id/analysis
Response: {
  dimensions: Array<{
    name: string
    score: number      // /20
    observation: string
    gap: string
  }>
  raw_transcript: string
}

// GET /api/v1/session/:id/score
Response: {
  score: number        // /100
  label: string
  benchmark: string
}

// GET /api/v1/session/:id/roadmap
Response: {
  steps: Array<{ title, description, outcome }>
  projection: { score_cible, delai, gain_estime }
}
```

**Critères d'acceptation :**
- Les mocks JSON sont disponibles dès la fin de la semaine 1 (Frontend ne doit pas attendre)
- Chaque endpoint répond en < 200ms (hors temps de processing)
- Le processing complet (du POST à status=ready) se fait en < 15s

---

### T-AI-13 · Gestion de session et stockage temporaire
**Priorité : HAUTE**

- Chaque session a un TTL de 24h
- Stocker : transcript, résultats analyse, score, roadmap
- Redis ou base de données légère (pas besoin de persistance long terme pour le funnel)
- La session est associée à un lead email lors de l'Étape 7

---

## Ordre de développement recommandé

```
Sprint 0 (Semaine 1) — PRIORITÉ ABSOLUE : débloquer le Frontend
  T-AI-12 Mocks JSON pour tous les endpoints
  T-AI-01 Intégration STT (proto)

Sprint 1 (Semaine 2–3)
  T-AI-02 Fallback et validation
  T-AI-03 Extraction entités métier
  T-AI-04 Segmentation narrative
  T-AI-05 Dimension Clarté
  T-AI-06 Dimension Mémorisation

Sprint 2 (Semaine 4)
  T-AI-07 Dimension Structure
  T-AI-08 Dimension Autorité
  T-AI-09 Dimension Appel à l'action
  T-AI-10 Score composite

Sprint 3 (Semaine 5)
  T-AI-11 Roadmap personnalisée
  T-AI-13 Gestion session

Sprint 4 (Semaine 6) — Intégration
  Tests end-to-end avec le Frontend
  Validation latence < 15s
  Tests sur 20 enregistrements réels
  Calibration des scores et pondérations
```

---

## Critères de qualité de l'output IA

Avant de considérer une dimension comme "done", chaque observation doit passer ces 4 filtres :

| Filtre | Test |
|--------|------|
| **Personnalisé** | L'observation cite au moins un élément du discours du CEO |
| **Non-générique** | L'observation ne peut pas s'appliquer à n'importe quel CEO |
| **Explicable** | Le CEO comprend pourquoi ce score sans avoir besoin d'aide |
| **Actionnable** | Le gap suggère une action concrète, pas un conseil vague |

**Exemple à rejeter :**
> "Votre message manque de clarté." ❌ (générique, non actionnable)

**Exemple à valider :**
> "Vous avez dit 'nous travaillons sur plusieurs verticales' — cette formulation donne à votre interlocuteur l'impression que vous n'avez pas encore de focus. Un message clair choisit une verticale pour une audience donnée." ✅
