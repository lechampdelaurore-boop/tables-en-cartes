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
- Récompenses animées : étoiles, rebond de la carte et une créature (15 petits dragons, fées et compagnons) à chaque bonne réponse ; la carte secoue la tête en cas d'erreur. Sons et confettis pour les séries et les records. Tout se désactive avec l'option « Sons et animations ».
- S'installe sur l'écran d'accueil d'un téléphone ou d'une tablette et fonctionne hors ligne.

Les progrès restent dans le navigateur de l'appareil : aucun compte, et rien n'est envoyé sur internet.

## Cartes à imprimer

Questions au recto, réponses au verso. Imprimer en A4 recto-verso, retournement sur le bord long, à l'échelle 100 %.

Beaucoup d'imprimantes décalent le verso de quelques millimètres. La page `imprimer.html` corrige ce décalage :

1. Imprimer la page de test, puis regarder le verso contre une fenêtre.
2. Lire sur les deux règles où tombent les lignes du recto, et ajouter ces nombres au réglage.
3. Imprimer les cartes.

Le verso des cartes n'a ni bord ni bandeau près du trait de coupe : un petit décalage restant ne se voit pas.

## Fichiers

- `index.html` : tout le jeu (HTML, CSS et JavaScript, sans bibliothèque).
- `sw.js` et `manifest.webmanifest` : mode hors ligne et installation. Après une modification des fichiers du jeu, changer la valeur de `CACHE` dans `sw.js`.
- `fonts/` : polices Fredoka et Nunito (licence SIL Open Font License, voir les fichiers `OFL-*.txt`).
- `imprimer.html` : les cartes à imprimer. Le PDF en est une impression avec le réglage à 0.

