# CLAUDE.md — Cuisine Air Fryer

> Ce fichier est auto-charge par Claude Code au demarrage de chaque session dans ce repo. Tous les agents (CTO, Site Engineer, Content Writer, Head of SEO) DOIVENT le lire en premier, avant `COMPANY_PROCESS.md` et avant toute action sur le projet.

## 1. Projet

- **Nom du site** : Cuisine Air Fryer
- **URL** : https://cuisine-airfryer.fr (provisoire — domaine en attente de validation CEO)
- **Niche** : cuisine / appareils culinaires (air fryer wedge, extension Cookeo, Thermomix, Ninja Foodi)
- **Langue** : fr-FR
- **Audience cible** : grand public francophone cherchant recettes, comparatifs et tests d'appareils de cuisine. Tous niveaux culinaires. Tranche d'age typique : 25-55 ans, utilisateurs Google quotidiens.
- **Mission editoriale** : devenir la reference francophone sur la cuisine avec air fryer et appareils connectes — recettes par aliment, comparatifs par budget/capacite, tests detailles, accessoires — pour orienter le trafic qualifie vers les boutiques partenaires (affiliation).
- **Modele economique** : site intermediaire SEO informationnel → affiliation (Amazon, Boulanger, Darty, SEB/Moulinex, Philips, Ninja). Panier cible : 80-250EUR, commissions 3-7%.
- **Statut** : developpement (pre-lancement)
- **Repo GitHub** : [`HugoTDN/cuisine-airfryer`](https://github.com/HugoTDN/cuisine-airfryer)
- **Branche de production** : `main` (auto-deploy Cloudflare Pages)

## 2. Voix et ton

> Section editoriale — proprietaire : Head of SEO.

### Principes fondamentaux

- **Vouvoiement** systematique — on s'adresse a un public large (25-55 ans), le vouvoiement installe la confiance sans creer de distance
- **Narrateur collectif** — « on » ou « nous » (l'equipe Cuisine Air Fryer), jamais « je ». Ce n'est pas un blog personnel, c'est une redaction specialisee
- **Ton pratique et gourmand** — on donne envie de cuisiner, pas de lire un mode d'emploi. L'enthousiasme vient des resultats concrets (croustillant, temps de cuisson, economies), pas d'adjectifs creux
- **Honnetete sur les tests** — on dit quand un appareil decoit, quand une recette demande de la patience, quand un modele ne vaut pas son prix
- **Zero jargon marketing** — pas de « revolutionnaire », « indispensable », « meilleur rapport qualite-prix » sans chiffres a l'appui

### Ce qu'on fait

- Donner des temps de cuisson et temperatures precis, testes en conditions reelles
- Nommer les modeles exacts (Philips Airfryer XXL HD9285/90, Ninja AF300EU, pas « un air fryer de grande marque »)
- Comparer avec des chiffres : prix, capacite en litres, puissance en watts, poids
- Decrire les textures et resultats : « croustillant a l'exterieur, fondant a coeur » plutot que « delicieux »
- Mentionner les limites : « le panier de 3,5L ne convient pas pour plus de 2 personnes »
- Utiliser des photos de plats reels quand disponibles

### Ce qu'on ne fait PAS

- Promettre des resultats sante non documentes (« perdez du poids grace a l'air fryer »)
- Utiliser des superlatifs sans preuve (« le meilleur air fryer du marche »)
- Ecrire des paragraphes generiques applicables a n'importe quel site cuisine
- Mettre des emojis dans les articles
- Utiliser « je » — la voix est collective
- Recommander un produit sans l'avoir decrit avec ses specs reelles (prix, capacite, dimensions)
- Copier les fiches produit constructeur — on reformule avec notre angle pratique

### Exemples de ton

**Bien :** « On a teste les frites maison au Philips XXL a 200°C pendant 18 minutes : croustillantes a l'exterieur, moelleuses a l'interieur, avec une seule cuillere d'huile. Le resultat se rapproche d'une friteuse classique, sans l'odeur dans la cuisine. »

**Mal :** « L'air fryer est un appareil revolutionnaire qui vous permettra de preparer des frites delicieuses et saines pour toute la famille grace a sa technologie innovante de circulation d'air chaud. »

**Bien :** « A 89 EUR, le Cecotec Cecofry Advance 5000 fait le travail pour un couple. Mais si vous cuisinez pour 4, son panier de 5,5L sera juste : comptez deux fournees pour les frites du dimanche. »

**Mal :** « Ce modele offre un excellent rapport qualite-prix et conviendra parfaitement a tous les foyers. »

**Bien :** « Soyons honnetes : les legumes a l'air fryer, ca divise. Les courgettes rendent beaucoup d'eau et ramollissent si on ne les sale pas 10 minutes avant. Les brocolis, en revanche, deviennent addictifs — 12 minutes a 180°C avec un filet d'huile d'olive. »

**Mal :** « Les legumes a l'air fryer sont un veritable delice qui ravira toute la famille. »

## 3. Stack technique

- **Framework** : Astro 6.x + MDX
- **CSS** : Tailwind CSS v4 (via `@tailwindcss/postcss`) + `@tailwindcss/typography`
- **Hebergement** : Cloudflare Pages — auto-deploiement sur push branche `main`
- **Sitemap / robots** : `@astrojs/sitemap` + `astro-robots-txt`
- **Markdown** : remark-gfm, rehype-slug, rehype-autolink-headings
- **Package manager** : npm
- **Node** : >= 22.12.0
- **CI/CD** : GitHub Actions (`.github/workflows/ci.yml`) — type check + build sur push/PR vers `main`

## 4. Collections de contenu

Tous les fichiers sont en `.mdx` dans `src/content/<collection>/`. Schemas Zod source de verite : `src/content.config.ts`.

### blog

Articles generaux. Frontmatter obligatoire :

```yaml
title: "..." # 10-100 caracteres
excerpt: "..." # max 200 caracteres
publishedAt: 2026-01-01
published: true | false # false par defaut
author: Cuisine Air Fryer
category: recette | comparatif | test | guide | actualite | accessoire
tags: [tag1, tag2] # 1 a 5 tags
featuredImage: /images/nom.jpg
featuredImageAlt: "..." # min 10 caracteres
```

Optionnels : `updatedAt`, `seo` (metaTitle, metaDescription, ogImage, noindex), `relatedArticles` (max 3 slugs).

### guides

Guides et comparatifs detailles. Memes champs de base + `difficulty` (debutant | intermediaire | avance), `prerequisites[]`, `estimatedTime`, `relatedGuides` (max 2).

### recettes

Recettes pour appareils de cuisine. Champs specifiques :

```yaml
appareil: air-fryer | cookeo | thermomix | ninja | multicuiseur
prepTime: "15min"
cookTime: "20min"
totalTime: "35min"
servings: 4
calories: 350 # optionnel
ingredients: ["200g poulet", "1 courgette"]
difficulty: facile | moyen | difficile
```

### pages

Pages statiques (a propos, mentions legales). Champs : `title`, `description` (optionnel), `seo` (optionnel).

## 5. Composants MDX disponibles

Les composants sont **injectes automatiquement** par les pages `[...slug].astro`. **NE PAS les importer** dans les fichiers MDX.

### Callout

```mdx
<Callout type="info">Note importante...</Callout>
```

Types : `info`, `warning`, `success`, `tip`.

### FAQ

Genere automatiquement le JSON-LD FAQPage pour le SEO.

```mdx
<FAQ items={[{ question: "Question ?", answer: "Reponse." }]} />
```

### ProsCons

```mdx
<ProsCons pros={["Avantage 1"]} cons={["Inconvenient 1"]} />
```

### ProductCard

Fiche produit affilie avec liens UTM automatiques.

```mdx
<ProductCard
  nom="Philips Airfryer XXL"
  marque="Philips"
  prix="199 EUR"
  note="4.5/5"
  lienAmazon="https://www.amazon.fr/dp/XXXXXXXXX"
  campaign="comparatif"
/>
```

### RecipeMeta

Fiche resume recette (disponible uniquement dans la collection `recettes`).

```mdx
<RecipeMeta
  prepTime="15 min"
  cookTime="20 min"
  totalTime="35 min"
  servings={4}
  calories={350}
  difficulty="facile"
  appareil="Air Fryer"
/>
```

### InfoBox

```mdx
<InfoBox title="Specifications">Contenu de la boite...</InfoBox>
```

### ExternalLink (liens sortants affiliation)

**Obligatoire** pour tout lien externe vers une boutique ou un produit affilie. Applique automatiquement la convention UTM.

```mdx
<ExternalLink href="https://www.amazon.fr/dp/XXXXXXXXX" campaign="comparatif" affiliate>
  Voir le prix sur Amazon
</ExternalLink>
```

### LinkInterne

```mdx
<LinkInterne href="/blog/meilleur-air-fryer/">texte du lien</LinkInterne>
```

## 6. Regles de redaction

> Section editoriale — proprietaire : Head of SEO.

### Regles generales

1. **Vouvoiement** — ton pratique et gourmand (cf. Section 2)
2. **Hierarchie headings** — H2 → H3 → H4, jamais de saut de niveau. Un seul H1 par page (le `title` du frontmatter)
3. **Pas d'import de composants** — ils sont injectes automatiquement (cf. Section 5)
4. **`published: false` par defaut** — un article passe a `true` uniquement apres validation editoriale

### Longueurs cibles par type

| Collection | Longueur cible | Minimum |
|-----------|---------------|---------|
| recettes | 800-1 200 mots | 600 |
| blog (recette angle) | 1 200-1 800 mots | 1 000 |
| blog (comparatif) | 2 000-3 000 mots | 1 500 |
| blog (test/avis) | 1 500-2 500 mots | 1 200 |
| guides | 2 500-4 000 mots | 2 000 |

### Structure type par collection

**Recettes (`src/content/recettes/`)** :
1. `<RecipeMeta>` — fiche resume (temps, portions, difficulte)
2. Introduction courte (2-3 phrases : pourquoi cette recette, resultat attendu)
3. Ingredients — liste dans le frontmatter, reprise en prose si precisions necessaires
4. Instructions etape par etape (H2 « Preparation », H3 par etape)
5. `<Callout type="tip">` — astuces de cuisson (temperature, variantes)
6. Section « Variantes » (H2) si pertinent
7. `<FAQ>` — 2-3 questions frequentes (genere le JSON-LD FAQPage)

**Articles blog — comparatifs (`src/content/blog/`)** :
1. Introduction (probleme du lecteur, promesse de l'article)
2. Tableau comparatif synthetique (H2)
3. Fiches produits detaillees (H2 par produit, `<ProductCard>` + `<ProsCons>`)
4. Guide d'achat (H2 « Comment choisir », H3 par critere)
5. `<FAQ>` — 3-5 questions (JSON-LD)
6. Verdict / conclusion actionnable

**Articles blog — guides/informationnels** :
1. Introduction (contexte, ce que le lecteur va apprendre)
2. Sections H2 repondant chacune a une sous-question
3. `<Callout>` pour les points importants ou mises en garde
4. Exemples concrets, chiffres, noms de modeles
5. `<FAQ>` — 3-5 questions
6. Conclusion avec action suivante pour le lecteur

### Maillage interne

- **Minimum 3 liens internes** par article (via `<LinkInterne>`)
- Placer les liens la ou ils ajoutent du contexte pour le lecteur, pas en fin de paragraphe par defaut
- L'ancre du lien doit decrire la destination (pas « cliquez ici » ni « en savoir plus »)
- Privilegier les liens vers des pages du meme cluster thematique
- Si le brief mentionne des pages en declin, inclure un lien si thematiquement pertinent

### Liens externes et affiliation

- **Tout lien vers une boutique** doit utiliser le composant `<ExternalLink>` avec `affiliate`
- Minimum 1 lien externe non-affilie par article (source factuelle : constructeur, test independant)
- Ne jamais linker vers un concurrent direct (autre site affilie air fryer)
- Les liens vers les sources factuelles (constructeur, UFC-Que Choisir, Les Numeriques) sont en lien standard markdown

### Images

- **Minimum 1 image par article**, idealement 2-3
- ALT descriptif obligatoire (min 10 caracteres) — decrire ce qu'on voit, pas le nom du fichier
- Noms de fichiers en kebab-case descriptif : `frites-maison-air-fryer-philips-xxl.webp`, pas `IMG_1234.jpg`
- Format privilegie : WebP
- Images stockees dans `public/images/` ou dossier media de la collection

## 7. SEO

> Section editoriale — proprietaire : Head of SEO.

### Mots-cles principaux (wedge air fryer)

| Mot-cle | Volume estime (FR/mois) | Intention | Priorite |
|---------|------------------------|-----------|----------|
| recette air fryer | ~165 000 | informationnelle | P0 |
| air fryer | ~135 000 | mixte (info + commerciale) | P0 |
| friteuse sans huile | ~33 000 | commerciale | P0 |
| meilleur air fryer | ~12 000 | commerciale | P1 |
| air fryer recette poulet | ~8 000 | informationnelle | P1 |
| frites air fryer | ~6 500 | informationnelle | P1 |
| air fryer pas cher | ~4 000 | commerciale | P2 |
| recette air fryer legumes | ~3 500 | informationnelle | P2 |
| air fryer ou friteuse | ~2 500 | informationnelle | P2 |

### Clusters thematiques prioritaires

**Cluster 1 — Recettes air fryer (pilier)** :
Pilier : `/recettes/` (index recettes air fryer)
Sous-pages par aliment : poulet, frites, legumes, poisson, desserts, nems, nuggets, bacon, steak hache
Maillage : chaque recette lie vers le pilier et 2 recettes adjacentes

**Cluster 2 — Comparatifs et guides d'achat** :
Pilier : `/guides/meilleur-air-fryer/`
Sous-pages : par budget (pas cher, milieu de gamme, premium), par marque (Philips, Ninja, Moulinex, Cosori), par capacite (solo, couple, famille), par type (classique, four, double panier)
Maillage : chaque comparatif lie vers le pilier et vers les recettes associees

**Cluster 3 — Utilisation et astuces** :
Pilier : `/guides/comment-utiliser-air-fryer/`
Sous-pages : temperatures et temps de cuisson (tableau), entretien/nettoyage, accessoires, erreurs courantes, air fryer vs friteuse classique
Maillage : les guides d'utilisation lient vers les recettes et comparatifs

**Cluster 4 — Extension Cookeo** (phase 2) :
Pilier : `/guides/recette-cookeo/`
Sous-pages : recettes Cookeo par type de plat, comparatif Cookeo vs multicuiseur
Maillage : croise avec le cluster air fryer quand pertinent (ex: « air fryer ou Cookeo pour les frites ? »)

**Cluster 5 — Extension Thermomix / Ninja** (phase 3) :
A developper apres validation des clusters 1-3.

### Mapping d'intention

| Intention | Format adapte | Collection | Exemples |
|-----------|--------------|------------|----------|
| Informationnelle (« comment », « recette ») | Recette detaillee, guide pas-a-pas | recettes, guides | « recette poulet air fryer », « comment prechauffer air fryer » |
| Commerciale (« meilleur », « comparatif », « avis ») | Comparatif, test, fiche produit | blog, guides | « meilleur air fryer 2026 », « avis Philips XXL » |
| Navigationnelle (marque + modele) | Test/avis detaille | blog | « Ninja AF300 test », « Philips Airfryer 3000 » |
| Transactionnelle (« acheter », « prix ») | Page comparatif avec `<ExternalLink affiliate>` | blog | « air fryer pas cher », « promo air fryer » |

### Concurrents de reference (benchmark)

- **airfryer.fr** — site affilie FR specialise, reference directe sur la niche
- **lesnumeriques.com** (section air fryer) — tests detailles, autorite forte, benchmark qualite
- **quechoisir.org** (section friteuses) — autorite institutionnelle, benchmark fiabilite
- **marmiton.org** (recettes air fryer) — volume de recettes, UGC, forte autorite domaine cuisine
- **750g.com** (recettes air fryer) — idem Marmiton, format recette de reference

### Regles SEO editoriales

- **Meta title** : < 60 caracteres, mot-cle principal present, annee si pertinent (comparatifs)
- **Meta description** : 140-160 caracteres, mot-cle principal, proposition de valeur claire
- **URL** : slug court et descriptif, mot-cle principal, pas de stop words inutiles
- **Canonical** : auto-generee par Astro, verifier l'absence de doublons
- **Liens externes `nofollow`** par defaut sauf sources factuelles allowlistees (constructeurs, UFC-Que Choisir, Les Numeriques)
- **Liens internes** : ancres descriptives, minimum 3 par article (cf. Section 6)

### Schemas JSON-LD utilises

- `Article` (auto sur les pages blog/guides)
- `FAQPage` (genere par le composant `<FAQ>`)
- `BreadcrumbList` (auto)
- `Recipe` (auto sur les pages recettes)

### Sujets hors perimetre SEO

- Regimes medicaux specifiques (diabete, allergies graves) — renvoyer vers un professionnel
- Comparatifs hors appareils de cuisine (electromenager general)
- Recettes sans rapport avec les appareils cibles (air fryer, Cookeo, Thermomix, Ninja)

## 8. Workflow de redaction

> Section editoriale — proprietaire : Head of SEO.

### Processus de creation d'article

1. **Brief** — Le Head of SEO cree une issue avec : mot-cle cible, intention de recherche, collection cible, longueur cible, pages internes a lier, concurrent benchmark, angle editorial. Le brief est assigne au Content Writer.

2. **Recherche** — Le Content Writer analyse la SERP (top 5 resultats), identifie les sous-questions a couvrir, collecte les donnees factuelles (prix, specs, chiffres). Pour les recettes : tester les temps/temperatures ou les sourcer depuis des tests documentes.

3. **Redaction MDX** — Creation du fichier dans `src/content/<collection>/`. Le Content Writer suit les regles de la Section 6 (structure, longueur, maillage, voix Section 2). `published: false` obligatoirement.

4. **Auto-review** — Le Content Writer verifie sa propre checklist (cf. Done checklist dans AGENTS.md) : word count, meta, H1, liens internes, FAQ/JSON-LD, images ALT, anti-AI-slop, voix et ton.

5. **Review editoriale** — Le Content Writer passe l'issue en `in_review` et l'assigne a l'Editorial Reviewer. Celui-ci verifie la qualite editoriale, la conformite au brief, et les criteres SEO. Il peut renvoyer avec des corrections.

6. **Publication** — Apres validation editoriale, le Head of SEO passe `published: true`. Le CTO deploie via merge sur `main`.

7. **Post-publication** — Apres 24h, demande d'indexation GSC (via issue assignee au Search Console Action Agent). Suivi des performances a J+7, J+30.

### Conventions de nommage des fichiers

- **Recettes** : `src/content/recettes/{aliment}-air-fryer.mdx` (ex: `poulet-air-fryer.mdx`)
- **Comparatifs** : `src/content/blog/meilleur-{categorie}-{annee}.mdx` (ex: `meilleur-air-fryer-2026.mdx`)
- **Guides** : `src/content/guides/{sujet}.mdx` (ex: `comment-utiliser-air-fryer.mdx`)
- **Tests** : `src/content/blog/test-{marque}-{modele}.mdx` (ex: `test-philips-airfryer-xxl.mdx`)

## 9. Commandes utiles

| Action | Commande |
|--------|----------|
| Dev server | `npm run dev` |
| Build production | `npm run build` |
| Preview local | `npm run preview` |
| Type-check | `npm run check` |

## 10. Fichiers cles

- `astro.config.mjs` — configuration Astro, integrations, plugins rehype/remark
- `src/content.config.ts` — schemas Zod des collections (source de verite)
- `src/components/mdx/` — composants MDX (Callout, FAQ, ProsCons, ProductCard, RecipeMeta, InfoBox, ExternalLink, LinkInterne)
- `src/layouts/` — layouts Astro (BaseLayout, BlogLayout)
- `src/lib/utm.ts` — helper UTM pour les liens sortants
- `.github/workflows/ci.yml` — pipeline CI

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
- `published: false` par defaut — un article doit avoir `published: true` pour apparaitre dans le build.
