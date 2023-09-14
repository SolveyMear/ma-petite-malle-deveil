# Site-Laurie

-Ouvrir page sur mamp
puis lancer vite dans dossier vitephp
mais ne pas cliquer sur le lien.

-Si un élément sort de la page: supprimer chaque section le unes après les autres pour voir quand ça arrête de scroller.

-Virgules du pourcentage: alt+ flèche haut/bas pour les virgules du pourcentage.

-Relatif/Absolute: priviligier le positionnement avec top/left/right/bottom.

-Structure de base à respecter:
    -section{
        width: 100%;
        -wrapper{
            max-width: 1100px;
            width: 90%;
        }
    }

-Pour que les éléments prennent toute la place disponible automatiquement quand ça devient trop petit:
responsive: max-width: 1050px{
    max-width: 610px
    width: 100%
}


-Pour éviter d'avoir une taille fixe à une section, on ajoute un padding au parent pour que la taille puisse augmenter en gardant tout le temps la même marge avec le bord du site.


Mon ecran: 1240px, quand je mets en responsive sur la console à 1240px, l'agencement est différent. Pourquoi?
Pq 1240px c'est la taille totale de l'écran, donc avec la barre du navigateur en haut et en bas la barre des applis.

Pour positionner correctement un absolute sur un relatif, il faut faire attention à quoi on attache l'absolute. L'absolute doit être l'enfant du relatif. On le place en top 0 et left 0 pour voir comment ça réagit.


Comment déterminer quand donner une taille à une section ou une div ???

Si erreur faites, vérifier git et faire flèche pour annuler.

En général si qqchose fonctionne pas, ça fini par se gérer avec flex, donc dans la mesure du possible utiliser flex...

Svg se copie-colle direct dans le html, sauf quand c'est en before, là c'est l'url dans le css.

