# User Journey Technique — CompetitivIA Funnel
> Référence pour les développeurs Frontend et les ingénieurs IA
> Chaque étape = état attendu côté utilisateur + responsabilités techniques

---

## Vue séquentielle complète

```
[CEO arrive sur le site]
         │
         ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ÉTAPE 1 · L'ARRIVÉE
 Objectif émotionnel : CONFIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Ce que le CEO perçoit :
   → Un espace qui respire. Rien ne crie.
   → Il sent qu'il est au bon endroit.

 Ce que le Frontend livre :
   → Hero section : typographie large, fond monochrome ou très sobre
   → Aucun nav bar visible (ou réduit à l'extrême)
   → LCP < 1.5s — la première image s'affiche immédiatement
   → Micro-animation subtile (fade-in text, pas de bounce, pas de parallax agressif)
   → Aucun CTA à cette étape

 Ce que l'AI Engineering fait :
   → Rien. Zéro appel.

 Transition vers Étape 2 :
   → Scroll naturel OU autoplay silencieux du film après 2s
         │
         ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ÉTAPE 2 · LE FILM
 Objectif émotionnel : IDENTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Ce que le CEO perçoit :
   → Il se voit dans le film. Ce n'est pas un pub.
   → Il reconnaît ses propres situations : réunion, investisseur, négociation.

 Ce que le Frontend livre :
   → Lecteur vidéo full-screen ou très large, sans chrome UI standard
   → Autoplay muted avec son activable via geste discret
   → Barre de progression minimaliste (fine ligne en bas)
   → Pas de bouton "skip" visible — mais présent en aria pour accessibilité
   → À la fin du film : transition automatique vers Étape 3 (fade)

 Ce que l'AI Engineering fait :
   → Rien. Zéro appel.

 Transition vers Étape 3 :
   → Fin de vidéo → fondu enchaîné vers le texte du Déclic
         │
         ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ÉTAPE 3 · LE DÉCLIC
 Objectif émotionnel : CURIOSITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Ce que le CEO perçoit :
   → Une idée nouvelle s'installe.
   → "Votre communication n'est pas une compétence. C'est un actif stratégique."
   → Il commence à se demander ce que vaut le sien.

 Ce que le Frontend livre :
   → Texte qui apparaît mot par mot (typewriter lent, pas mécanique)
   → Ou scroll-reveal : les deux phrases arrivent séquentiellement
   → Contraste fort, typographie grande — 1 idée par écran
   → Durée totale de la séquence : 8–12 secondes
   → À la fin : apparition douce du CTA "Présentez votre entreprise"

 Ce que l'AI Engineering fait :
   → Rien. Mais peut pré-charger les ressources du pipeline audio.

 Transition vers Étape 4 :
   → Clic sur CTA → transition fluide vers l'interface de capture
         │
         ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ÉTAPE 4 · L'EXPÉRIENCE IA
 Objectif émotionnel : PARTICIPATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Ce que le CEO perçoit :
   → On lui demande de parler. Pas de remplir.
   → L'IA commence immédiatement à écouter.
   → Il sent que quelque chose se passe.

 Ce que le Frontend livre :
   → Interface épurée : une seule consigne visible
     "Présentez votre entreprise en une minute."
   → Bouton d'activation microphone (grand, central, clair)
   → Visualisation audio live : waveform ou cercle pulsant selon l'amplitude
   → Compteur de temps discret (60s) — pas anxiogène
   → À la fin des 60s (ou arrêt manuel) : animation de "traitement en cours"
     → NE PAS montrer un spinner. Montrer une animation de "réflexion" :
        cercles qui se forment, texte "L'IA analyse votre communication…"
   → Option de saisie texte en fallback (si micro refusé)

 Ce que l'AI Engineering livre :
   → Endpoint POST /api/v1/session/start
      Accepte : audio (blob) OU text (string)
      Retourne : { session_id, status: "processing" }
   → Pipeline STT (Speech-to-Text) : transcription en < 3s
   → Début immédiat de l'analyse NLP sur la transcription
   → Endpoint GET /api/v1/session/:id/status
      Retourne : { status, progress: 0–100 }
      → Frontend poll toutes les 1.5s pour mettre à jour l'animation

 Transition vers Étape 5 :
   → Quand status = "ready" → transition automatique vers La Découverte
         │
         ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ÉTAPE 5 · LA DÉCOUVERTE
 Objectif émotionnel : ÉMERVEILLEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Ce que le CEO perçoit :
   → Une révélation, pas un rapport.
   → "Votre message est clair, mais manque de mémorisation."
   → Les observations utilisent SES propres mots.
   → Il découvre des choses qu'il ne s'était jamais dites.

 Ce que le Frontend livre :
   → Affichage séquentiel des 5 dimensions — une par une, pas en tableau
   → Chaque dimension : un titre fort + une observation personnalisée
     (issue des données IA) + un indicateur visuel (score partiel)
   → Ton narratif, pas technique. Pas de pourcentages froids.
   → Scroll pour découvrir chaque dimension (ou auto-scroll avec pause)
   → À la fin des 5 dimensions : transition vers La Projection

 Ce que l'AI Engineering livre :
   → Endpoint GET /api/v1/session/:id/analysis
   → Retourne les 5 dimensions :
     {
       dimensions: [
         {
           name: "Clarté du message",
           score: 14,          // sur 20
           observation: "...", // DOIT citer un élément du discours du CEO
           gap: "..."          // ce qui manque, formulé positivement
         },
         ...
       ],
       raw_transcript: "..."
     }
   → Contrainte : chaque `observation` doit contenir au moins un extrait
     verbatim du discours du CEO (entre guillemets)

 Transition vers Étape 6 :
   → Scroll naturel ou bouton "Voir mon score global"
         │
         ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ÉTAPE 6 · LA PROJECTION
 Objectif émotionnel : PROJECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Ce que le CEO perçoit :
   → Il voit son score global.
   → Il comprend où il en est ET où il peut aller.
   → La trajectoire est concrète : Score → Roadmap → Sprint → Asset.

 Ce que le Frontend livre :
   → Executive Communication Score™ :
      Animation de compteur qui monte jusqu'au score (ex: 0 → 61)
      Label associé ("Communication en développement", "Communication stratégique", etc.)
      Benchmark : "Les dirigeants qui travaillent avec nous passent de X à Y"
   → Executive Roadmap™ :
      3–4 étapes visuelles, timeline horizontale ou verticale
      Chaque étape a un intitulé et un bénéfice concret
   → CTA final : "Démarrer mon CEO Pitch Asset Sprint™"

 Ce que l'AI Engineering livre :
   → Endpoint GET /api/v1/session/:id/score
     { score: 61, label: "Communication en développement",
       benchmark: "Les dirigeants qui nous rejoignent ont en moyenne un score de 58" }
   → Endpoint GET /api/v1/session/:id/roadmap
     { steps: [{ title, description, outcome }], projection: { score_cible, delai } }

 Transition vers Étape 7 :
   → Clic sur CTA Sprint
         │
         ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ÉTAPE 7 · LE PASSAGE À L'ACTION
 Objectif émotionnel : DÉCISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Ce que le CEO perçoit :
   → Il ne réserve pas une prestation. Il choisit de développer un actif.
   → L'action semble logique, pas vendue.

 Ce que le Frontend livre :
   → Page de conversion minimaliste
   → Formulaire court : Nom, Email, Créneau (Calendly embed ou custom)
   → Rappel visuel discret de son score et de sa Roadmap
   → Confirmation : message personnalisé avec son prénom si disponible

 Ce que l'AI Engineering fait :
   → Optionnel : personnaliser le message de confirmation
     avec un élément de son analyse ("Vous avez un vrai potentiel sur la structure narrative…")

[CEO converti → CEO Pitch Asset Sprint™]
```

---

## Résumé des dépendances techniques

```
Étape 1   Frontend only         — pas de dépendance IA
Étape 2   Frontend only         — pas de dépendance IA
Étape 3   Frontend only         — AI peut pré-charger le pipeline
Étape 4   Frontend + AI Eng.   — STT + NLP requis
Étape 5   Frontend + AI Eng.   — Résultats analyse requis
Étape 6   Frontend + AI Eng.   — Score + Roadmap requis
Étape 7   Frontend only         — Optionnel : personnalisation IA
```

## Points de synchronisation obligatoires Frontend ↔ AI Engineering

| Moment | Livrable AI Engineering | Impact Frontend |
|--------|------------------------|-----------------|
| Avant dev Étape 4 | Contrat d'API + mocks JSON | Frontend développe sur mocks |
| Sprint 1 | STT fonctionnel (audio → texte) | Frontend peut tester la capture |
| Sprint 2 | Analyse NLP + /analysis endpoint | Frontend branche les vrais résultats |
| Sprint 3 | Score + Roadmap endpoints | Frontend finalise la projection |
| QA finale | Tests de latence end-to-end | Valider < 15s analyse complète |
