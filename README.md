# Tables en cartes

Flashcards pour apprendre les tables de multiplication de 2 à 12.

- **Jouer en ligne :** https://lechampdelaurore-boop.github.io/tables-en-cartes/
- **Cartes à imprimer :** [cartes-multiplication-a-imprimer.pdf](cartes-multiplication-a-imprimer.pdf) (A4 recto-verso, bord long, échelle 100 %, 99 cartes)

## Le jeu

- Choix des tables de 2 à 12, avec une barre de progression par table.
- Trois exercices : multiplications (7 × 8), nombre manquant (7 × ? = 56), divisions (56 ÷ 7), ou un mélange des trois.
- Deux modes : cartes à retourner, ou réponse à taper sur un pavé numérique intégré (ou au clavier).
- Les cartes ratées reviennent quelques cartes plus tard.
- Astuces de calcul au dos des cartes (×9, ×5, ×11…).
- Option pour ne travailler que les cartes pas encore acquises.
- Écran « Mes cartes difficiles » : les cartes les plus souvent ratées, avec un entraînement ciblé.
- Défi chrono : 1 minute pour trouver un maximum de réponses, avec un record par exercice et par mode.
- Sons et confettis pour les records et les séries parfaites (désactivables).
- S'installe sur l'écran d'accueil d'un téléphone ou d'une tablette et fonctionne hors ligne.

Les progrès restent dans le navigateur de l'appareil : aucun compte, et rien n'est envoyé sur internet.

## Fichiers

- `index.html` : tout le jeu (HTML, CSS et JavaScript, sans bibliothèque).
- `sw.js` et `manifest.webmanifest` : mode hors ligne et installation. Après une modification des fichiers du jeu, changer la valeur de `CACHE` dans `sw.js`.
- `fonts/` : polices Fredoka et Nunito (licence SIL Open Font License, voir les fichiers `OFL-*.txt`).
- `outils/cartes-pdf.js` : génère les cartes à imprimer.
