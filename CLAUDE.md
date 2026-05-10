# CLAUDE.md — Cuisine Air Fryer

## 1. Projet

- **URL** : https://cuisine-airfryer.fr (provisoire — domaine en attente de validation CEO)
- **Nom du site** : Cuisine Air Fryer
- **Audience cible** : Grand public francophone cherchant des recettes, comparatifs et tests d'appareils de cuisine (air fryer, Cookeo, Thermomix, Ninja Foodi). Niveau culinaire tous niveaux.
- **Mission editoriale** : Devenir la reference francophone sur la cuisine avec air fryer et appareils connectes — recettes par aliment, comparatifs par budget/capacite, tests detailles, accessoires — pour orienter le trafic qualifie vers les boutiques partenaires (affiliation).
- **Modele** : site intermediaire SEO informationnel → redirection du trafic qualifie vers boutiques partenaires (affiliation). Pas de e-commerce direct.
- **Marques partenaires** : Amazon, Boulanger, Darty, SEB/Moulinex, Philips, Ninja
- **Langue** : fr-FR
- **Statut** : developpement (pre-lancement)

## 2. Voix et ton

> Section editoriale — proprietaire : Head of SEO.

### Principes fondamentaux

- **Tutoiement** systematique — on s'adresse a un ami qui decouvre son air fryer, pas a un client
- **Ton pratique et concret** — on partage des resultats testes, pas des promesses marketing
- **Experience demonstree** — chaque recette, chaque test decrit des observations reelles (temps, texture, rendu)
- **Honnetete produit** — dans les comparatifs et tests, on dit les points faibles. Un produit moyen reste moyen
- **Zero jargon inutile** — vocabulaire cuisine du quotidien, pas de terminologie de chef etoile

### Persona narrateur

Voix editoriale collective : « Redaction Cuisine Air Fryer ». On utilise « on » comme pronom principal (« on a teste », « on recommande »). Le « tu » pour s'adresser au lecteur (« si tu cherches », « tu peux »). Jamais « nous » corporate, jamais « je » personnel.

### Ce qu'on fait

- Donner des temps et temperatures precis (« 180 °C pendant 12 minutes »)
- Citer des modeles par nom complet et capacite (« Philips Airfryer XXL 7,3 L »)
- Comparer avec la cuisson traditionnelle quand c'est pertinent
- Mentionner les prix constates et les fourchettes de budget
- Decrire les textures et resultats obtenus (« croustillant a l'exterieur, moelleux au centre »)
- Preciser les quantites et le nombre de portions
- Indiquer les limites d'un appareil ou d'une recette (« ne fonctionne pas avec des panures tres epaisses »)

### Ce qu'on ne fait PAS

- Promettre des resultats sante (« perdre du poids », « reduire le cholesterol ») — on cuisine, on ne prescrit pas
- Utiliser des superlatifs non etayes (« le meilleur air fryer du marche » sans criteres)
- Ecrire des phrases generiques recyclables (« la cuisine saine n'a jamais ete aussi simple »)
- Mettre des emojis dans les articles
- Denigrer un produit sans justification technique
- Utiliser « nous » ou « je » — toujours « on » (narrateur) et « tu » (lecteur)
- Comparer les prix sans date ni source (les prix fluctuent)

### Exemples concrets

**Bien :**
> « On a teste les frites maison a 200 °C pendant 18 minutes dans le Ninja Foodi MAX AF400EU. Resultat : croustillantes dehors, fondantes dedans, avec une seule cuillere d'huile. A peine 2 € de frites pour 4 personnes. »

**Mal :**
> « Les frites a l'air fryer sont incroyablement delicieuses et saines ! Vous allez adorer cette methode revolutionnaire qui va transformer votre cuisine au quotidien. »

**Bien :**
> « Le Cosori Dual Blaze a un defaut : le panier de 6,4 L ne suffit pas pour un poulet entier au-dela de 1,5 kg. Si tu cuisines pour 4+ personnes, vise un modele 8 L minimum. »

**Mal :**
> « Cet air fryer exceptionnel conviendra parfaitement a toute la famille grace a sa capacite genereuse et sa technologie de pointe. »

## 3. Stack technique

- **Framework** : Astro 6.x + MDX
- **CSS** : Tailwind CSS 4.x (via `@tailwindcss/postcss`)
- **Hebergement** : Cloudflare Pages — auto-deploiement sur push branche `main`
- **Repo GitHub** : [`HugoTDN/cuisine-airfryer`](https://github.com/HugoTDN/cuisine-airfryer)
- **Branche de production** : `main`
- **Package manager** : npm
- **Node** : >=18

## 4. Collections de contenu

Voir `src/content.config.ts` pour les schemas Zod complets.

### blog
Articles (`src/content/blog/*.mdx`). Frontmatter : `title`, `excerpt` (max 200 car.), `publishedAt`, `author` (defaut : « Redaction Cuisine Air Fryer »), `category` (recette | comparatif | test | guide | actualite | accessoire), `tags[]`, `featuredImage`, `featuredImageAlt`, `seo` (title max 60, description 130-160), `relatedArticles[]` (slugs).

### guides
Guides tutoriels (`src/content/guides/*.mdx`). Frontmatter : `title`, `excerpt`, `publishedAt`, `author`, `difficulty` (debutant | intermediaire | avance), `tags[]`, `seo`, `prerequisites[]`, `estimatedTime`.

## 5. Composants MDX disponibles

Importer explicitement dans les fichiers MDX :

```mdx
import Callout from '../../components/mdx/Callout.astro';
import InfoBox from '../../components/mdx/InfoBox.astro';
import ExternalLink from '../../components/mdx/ExternalLink.astro';
```

### Callout
```mdx
<Callout type="info">
  Note importante...
</Callout>
```
Types : `info`, `warning`, `success`, `tip`.

### InfoBox
```mdx
<InfoBox title="Specifications">
  Contenu de la boite...
</InfoBox>
```

### ExternalLink (liens sortants e-commerce / affiliation / partenaires)

**Obligatoire** pour tout lien externe vers une boutique, une marque partenaire, ou un produit affilie. Applique automatiquement la convention UTM.

```mdx
<ExternalLink href="https://www.amazon.fr/dp/XXXXXXXXX" campaign="comparatif" affiliate>
  Voir le prix sur Amazon
</ExternalLink>
```

Props :
- `href` (string) : URL cible.
- `campaign` (`recette` | `comparatif` | `guide` | `test` | `homepage` | `accessoire` | `actualite`) : type de page d'origine.
- `affiliate` (boolean, optionnel) : ajoute `rel="sponsored nofollow"`. Obligatoire pour les liens d'affiliation.
- `target` (defaut `_blank`).

Convention UTM appliquee automatiquement :
- `utm_source=cuisine-airfryer.fr`
- `utm_medium=referral`
- `utm_campaign=<campaign>`

Pour les cas non-MDX, utiliser le helper `withUtm()` exporte depuis `src/lib/utm.ts`.

## 6. Regles de redaction

> Section editoriale — proprietaire : Head of SEO.

### Hierarchie des headings

- Un seul `h1` par page (genere automatiquement depuis `title`).
- `h2` → `h3` → `h4`, jamais de saut de niveau (pas de `h2` → `h4`).
- Chaque `h2` repond a une sous-question identifiable de l'intention de recherche.

### Structure type par categorie

#### Recette

1. Introduction (contexte, pourquoi cette recette fonctionne a l'air fryer)
2. `<InfoBox>` — temps de preparation, cuisson, portions, difficulte
3. Ingredients (liste precise avec grammages)
4. Etapes de preparation (numerotees, avec temperatures et temps exacts)
5. `<Callout type="tip">` — astuces et variantes
6. Resultat attendu (description sensorielle : texture, couleur, gout)
7. FAQ (2-3 questions, en `<script type="application/ld+json">` FAQPage)
8. JSON-LD Recipe integre

#### Comparatif

1. Introduction (besoin du lecteur, criteres de selection)
2. Tableau comparatif synthetique (modeles, prix, capacite, note)
3. Fiches produit detaillees par modele (h2 chacune)
4. `<Callout type="info">` — methode de test ou criteres de notation
5. Verdict et recommandation par profil (budget, famille, solo)
6. FAQ (3-5 questions)
7. JSON-LD FAQPage

#### Test

1. Introduction (quel modele, pourquoi ce test)
2. `<InfoBox>` — fiche technique (marque, modele, capacite, puissance, prix constate, date du test)
3. Prise en main et design
4. Tests en cuisine (3 preparations minimum, avec resultats chiffres)
5. Points forts / points faibles (liste factuelle)
6. Verdict (note ou recommandation contextualisee)
7. FAQ (2-3 questions)

#### Guide

1. Introduction (a qui s'adresse le guide, prerequis)
2. Sections thematiques (h2) — chacune autonome
3. `<Callout>` pour les avertissements ou astuces cles
4. Resume actionnable ou checklist en conclusion
5. FAQ si pertinent

### Conventions d'ecriture

- **Temperatures** : toujours en °C, avec le degre (« 180 °C », pas « 180° » ni « 180 degres »)
- **Temps** : en minutes pour <60 min (« 12 minutes »), en heures + minutes au-dela (« 1 h 15 »)
- **Capacites** : en litres avec « L » majuscule (« 6,4 L »)
- **Prix** : en euros, fourchette quand possible, avec periode (« 89-119 € en mai 2026 »)
- **Noms de produits** : nom complet a la premiere mention (« Philips Airfryer XXL HD9270/90 »), version courte ensuite (« le Philips XXL »)
- **Marques** : majuscule initiale, orthographe officielle (« Moulinex », pas « moulinex »)
- **Appareils concurrents** : « Cookeo » (pas « cookeo »), « Thermomix » (pas « thermomix »)

### Liens internes

- Minimum **3 liens internes** par article de blog, **5 par guide**.
- Ancre de lien descriptive de la destination (pas « cliquez ici »).
- Placer les liens la ou ils apportent du contexte au lecteur.
- Privilegier les liens vers des pages du meme cluster thematique.

### Liens externes et affiliation

- Tout lien vers une boutique partenaire utilise le composant `<ExternalLink>` (cf. Section 5).
- Attribut `affiliate` obligatoire sur les liens d'affiliation.
- Minimum **1 lien externe non-affilie** par article (source, constructeur, norme).
- Ne jamais lier vers un concurrent direct du site.

### Images

- Alt text descriptif et unique pour chaque image (« frites dorees dans le panier du Ninja Foodi AF400 », pas « image1 »).
- Noms de fichiers en kebab-case, descriptifs (« frites-air-fryer-ninja-foodi.webp »).
- Format privilegie : WebP.
- Minimum **1 image** par recette, **2 par test/comparatif**.

### Mots et formulations a eviter

| Interdit | Alternative |
|----------|-------------|
| « revolutionnaire » | decrire le benefice concret |
| « incroyable » / « exceptionnel » | donner le chiffre ou la mesure |
| « sain » / « healthy » (sans nuance) | « avec moins d'huile qu'une friteuse classique » |
| « parfait pour toute la famille » | preciser la capacite en litres et portions |
| « rapport qualite-prix imbattable » | donner le prix et comparer |
| « dans un monde ou... » | supprimer, attaquer directement le sujet |
| « il est important de noter » | supprimer ou reformuler en fait direct |

## 7. SEO

> Section strategique — proprietaire : Head of SEO.

### Mots-cles principaux

| Mot-cle | Volume mensuel | Intention |
|---------|---------------|-----------|
| `recette air fryer` | ~165 000 | informationnelle |
| `air fryer` | ~135 000 | mixte (info + commerciale) |
| `friteuse sans huile` | ~33 000 | info + commerciale |
| `meilleur air fryer` | ~22 000 | commerciale |

Synonymes a utiliser naturellement : « friteuse a air chaud », « friteuse sans huile », « airfryer ».

### Clusters thematiques

1. **Recettes par aliment** (pilier : `recette air fryer`) — frites, poulet, legumes, poisson, desserts, surgeles. Chaque aliment = 1 article. Maillage croise entre recettes du meme type.
2. **Comparatifs par segment** (pilier : `meilleur air fryer`) — par budget (<100 €, 100-200 €, >200 €), par capacite (solo, couple, famille), par marque (Philips, Ninja, Cosori, Moulinex). 1 article par segment.
3. **Tests unitaires** — 1 article par modele teste. Lien vers le comparatif du segment correspondant.
4. **Guides debutant** (pilier : `air fryer`) — comment choisir, premier demarrage, erreurs courantes, entretien, accessoires indispensables.
5. **Appareils complementaires** — Cookeo, Thermomix, Ninja Foodi multi-cuiseur. Pages de passerelle pour capter le trafic lateral.

### Maillage interne

- Chaque recette lie vers le guide debutant et vers au moins 1 autre recette du meme aliment.
- Chaque test lie vers le comparatif du segment et vers 2-3 recettes realisees avec l'appareil.
- Chaque comparatif lie vers les tests individuels des modeles cites.
- Les guides lient vers les recettes et comparatifs pertinents.
- Utiliser des ancres descriptives, pas generiques.

### Schemas JSON-LD

| Type | Usage |
|------|-------|
| `Article` | tous les articles blog et guides |
| `Recipe` | articles de categorie `recette` — inclure `name`, `image`, `prepTime`, `cookTime`, `recipeIngredient`, `recipeInstructions` |
| `FAQPage` | bloc FAQ present dans l'article |
| `BreadcrumbList` | navigation fil d'Ariane (toutes pages) |
| `Product` | fiches test individuelles — `name`, `brand`, `offers` (prix + lien affilie) |

### Balises title et meta description

- **Title** : max 60 caracteres. Format par categorie :
  - Recette : `{Aliment} a l'Air Fryer : Recette {Adjectif}` (ex : « Frites a l'Air Fryer : Recette Croustillante »)
  - Comparatif : `Meilleur Air Fryer {Segment} ({Annee})` (ex : « Meilleur Air Fryer Familial (2026) »)
  - Test : `Test {Modele} : Avis Complet {Annee}` (ex : « Test Ninja Foodi MAX AF400 : Avis Complet 2026 »)
  - Guide : `{Sujet} : Guide {Qualificatif}` (ex : « Choisir son Air Fryer : Guide Complet »)
- **Meta description** : 130-160 caracteres. Inclure le mot-cle principal + proposition de valeur + element differenciateur.

### Concurrents de reference (benchmark)

Pour calibrer la longueur et la profondeur des articles, analyser la page 1 Google FR sur le mot-cle cible. Sites de reference a surveiller :
- **airfryer-comparatif.fr** — comparatifs detailles
- **marmiton.org** — recettes (format, profondeur)
- **lesnumeriques.com** — tests appareils electromenager
- **quechoisir.org** — tests independants

### Pages a ne pas creer

- Pages sur des regimes specifiques (ceto, paleo) sans lien direct avec l'air fryer
- Pages sur des appareils hors perimetre (micro-ondes, plancha, barbecue)
- Pages a intention purement navigationnelle (« site officiel Philips »)

## 8. Workflow de redaction

> Section editoriale — proprietaire : Head of SEO.

### 1. Reception du brief

- Le Head of SEO cree une issue avec : mot-cle cible, categorie, longueur cible, liens internes a placer, schema JSON-LD requis, pages en declin a relier si pertinent.
- Le Content Writer lit le brief et le `CLAUDE.md` avant toute redaction.

### 2. Recherche

- Analyser les 5 premiers resultats Google FR sur le mot-cle cible (longueur, structure, angle).
- Identifier les questions PAA (People Also Ask) pour alimenter la FAQ.
- Collecter les donnees factuelles : prix constates, specifications constructeur, dates de sortie.
- Pour les recettes : verifier les temps/temperatures sur au moins 2 sources.

### 3. Redaction

- Creer le fichier MDX dans `src/content/blog/` ou `src/content/guides/` selon la categorie.
- Remplir le frontmatter complet (cf. Section 4).
- Suivre la structure type de la categorie (cf. Section 6).
- Appliquer les composants MDX (cf. Section 5) : `<Callout>`, `<InfoBox>`, `<ExternalLink>`.
- Integrer le JSON-LD dans le body MDX via `<script type="application/ld+json">`.
- Verifier la conformite anti-AI-slop (cf. AGENTS.md du Content Writer).

### 4. Auto-review

- Relire l'article en entier — traquer les formulations generiques et le remplissage.
- Verifier la checklist Done (AGENTS.md) : word count, meta, H1, liens, JSON-LD, images, slop, locale, voix.
- Corriger tout ecart avant handoff.

### 5. Handoff editorial

- Passer l'issue en `in_review`, assigner a l'Editorial Reviewer.
- Commenter avec : chemin du fichier, mot-cle principal, word count, liens internes places, JSON-LD ajoute, images + ALT verifies, resultats de la checklist Done.

### 6. Corrections et validation

- Si le Reviewer renvoie des corrections : appliquer, re-verifier, renvoyer.
- Le Reviewer marque `done` apres validation finale.
- Le CTO deploie via merge sur `main`.

## 9. Commandes utiles

```bash
npm run dev       # Serveur de developpement
npm run build     # Build de production
npm run preview   # Preview du build
```

## 10. Fichiers cles

- `astro.config.mjs` — configuration Astro, sitemap, integrations
- `src/content.config.ts` — schemas Zod des collections (blog, guides)
- `src/components/mdx/` — composants MDX (Callout, InfoBox, ExternalLink)
- `src/layouts/` — layouts Astro (BaseLayout, BlogLayout)
- `src/lib/utm.ts` — helper UTM pour les liens sortants

## 11. Regles pour les agents

> Ce fichier (`CLAUDE.md`) est la source de verite projet. **Tout agent doit le lire en premier**, avant tout autre fichier ou commande, a chaque session.

### Regles de modification
1. **Site en pre-lancement** : modifications de structure autorisees. Une fois en production avec trafic GSC, toute modification d'architecture/routage/URLs necessite approbation board.
2. **Changements de contenu** : autorises s'ils respectent les regles des sections 2 et 6.
3. **Changements de stack ou de build** : escalader au CTO.
4. **Pre-commit hooks et CI** : ne jamais bypass.

### Commits
- Co-author obligatoire :
  ```
  Co-Authored-By: Paperclip <noreply@paperclip.ing>
  ```
- Messages de commit : convention `type: description` (`feat:`, `fix:`, `docs:`, `chore:`).
