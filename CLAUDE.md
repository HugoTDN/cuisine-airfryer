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

> TODO: a completer par Head of SEO

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

> TODO: a completer par Head of SEO

## 7. SEO

> TODO: a completer par Head of SEO (strategie de mots-cles, maillage interne, schema.org, concurrents de reference)

### Schemas JSON-LD utilises

- `Article` (auto sur les pages blog/guides)
- `FAQPage` (genere par le composant `<FAQ>`)
- `BreadcrumbList` (auto)
- `Recipe` (auto sur les pages recettes)

## 8. Workflow de redaction

> TODO: a completer par Head of SEO

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
