# Kanaye — site vitrine

Site vitrine statique pour **Kanaye**, la confiserie péi signée **M4PED**
(projet étudiant, Challenge Food Entrepreneur, ESIROI — Université de La
Réunion).

Une seule page (`index.html`), aucun framework, aucune étape de build :
tout est modifiable directement dans les fichiers, sans rien installer.

---

## 📁 Structure du projet

```
kanaye-website/
├── index.html              ← tout le contenu et le texte du site
├── assets/
│   ├── css/style.css       ← couleurs, typographie, mise en page, animations
│   ├── js/main.js          ← menu mobile, effets d'interaction
│   ├── img/                ← toutes les images (logo, photos, favicons)
│   └── dossier/            ← le PDF du dossier technique, téléchargeable depuis le site
├── Dockerfile               ← image de déploiement (Nginx)
├── nginx.conf                ← configuration du serveur web
└── README.md                 ← ce fichier
```

---

## 🚀 Déployer sur Coolify

Le projet contient déjà tout ce qu'il faut : Coolify n'a qu'à construire le
`Dockerfile` fourni.

1. Poussez ce dossier sur un dépôt GitHub (voir plus bas).
2. Dans Coolify : **New Resource → Application → Public/Private Git
   Repository**, et sélectionnez votre dépôt.
3. Comme méthode de build ("Build Pack"), choisissez **Dockerfile**
   (Coolify le détecte normalement tout seul).
4. Port exposé : **80** (déjà déclaré dans le `Dockerfile`).
5. Déployez. C'est tout — pas de variables d'environnement, pas de base de
   données, pas d'étape de build à configurer.

Chaque `git push` sur la branche suivie déclenchera un redéploiement (si
vous activez le déploiement automatique dans Coolify).

### Mettre le projet sur GitHub

```bash
cd kanaye-website
git init
git add .
git commit -m "Site Kanaye — version initiale"
git branch -M main
git remote add origin https://github.com/<votre-compte>/<votre-repo>.git
git push -u origin main
```

### Tester en local avant de déployer

Pas besoin de serveur particulier, un simple serveur statique suffit :

```bash
cd kanaye-website
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

Ou avec Docker directement (identique à ce que fera Coolify) :

```bash
docker build -t kanaye-site .
docker run -p 8080:80 kanaye-site
# puis ouvrez http://localhost:8080
```

---

## ✏️ Modifier le contenu

Tout le texte visible est dans **`index.html`** — cherchez simplement la
phrase à changer et remplacez-la. Les grandes sections sont annoncées par
des commentaires du type `<!-- ============ HERO -->`.

Points à personnaliser avant une mise en ligne définitive :

- **Contact** (bas de `index.html`, section `<footer>`) : l'e-mail
  `contact@kanaye.re` et l'adresse sont des exemples à remplacer par vos
  vraies coordonnées (un commentaire `TODO` les repère dans le code).
- **Réseaux sociaux** : aucun lien n'est présent pour l'instant — ajoutez
  vos liens dans le footer si besoin.
- **Nutri-Score** : le score affiché est une **estimation théorique de
  laboratoire, non certifiée** (précisé sur le site et dans le PDF). À
  remplacer par une valeur certifiée avant toute vente réelle.

## 🎨 Modifier les couleurs et les polices

Tout se passe en haut de `assets/css/style.css`, dans le bloc `:root` — une
seule variable à changer met à jour toute la page :

```css
:root {
  --green-deep: #1f4a2a;   /* vert principal */
  --gold: #b8901f;         /* accent doré */
  --lava: #b6401f;         /* accent volcanique (édition Lava Cane) */
  --cream: #faf6ea;        /* fond clair */
  --ink: #12190f;           /* fond sombre (fabrication, footer) */
  /* ... */
}
```

Les polices (Fraunces pour les titres, Inter pour le texte courant) sont
chargées depuis Google Fonts dans l'en-tête de `index.html` — remplacez le
lien `<link href="https://fonts.googleapis.com/...">` pour en changer.

## 🖼️ Remplacer une image

Toutes les images sont dans `assets/img/`. Gardez le même nom de fichier
pour ne rien casser, ou changez le chemin correspondant dans `index.html`
(attribut `src`). Pensez à compresser vos images (JPEG qualité ~80-85,
largeur max ~1500px) pour que le site reste rapide.

## 📄 Mettre à jour le dossier technique (PDF)

Remplacez simplement le fichier
`assets/dossier/kanaye-dossier-technique.pdf` par une nouvelle version en
gardant exactement le même nom — tous les liens du site continueront de
fonctionner automatiquement.

---

## Détails techniques

- HTML/CSS/JS natifs, aucune dépendance à installer, aucune étape de build.
- Polices via Google Fonts (CDN, chargées au runtime par le navigateur du
  visiteur).
- Animations légères en CSS, avec repli automatique si JavaScript est
  désactivé (le contenu reste toujours visible) et respect de la
  préférence système « mouvement réduit ».
- Compatible tous navigateurs modernes (Chrome, Firefox, Safari, Edge).
