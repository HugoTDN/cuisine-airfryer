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

> TODO: a completer par Head of SEO

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

> TODO: a completer par Head of SEO

## 7. SEO

> TODO: a completer par Head of SEO (strategie de mots-cles, maillage interne, schema.org, concurrents de reference)

## 8. Workflow de redaction

> TODO: a completer par Head of SEO

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
