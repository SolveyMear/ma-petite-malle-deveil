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