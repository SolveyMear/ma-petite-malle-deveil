<?php 
require_once __DIR__ . '/../vitephp/helpers.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <section class="header-main-img">
    
        <header>
            <div class="background"></div>
            <nav>
                <ul>
                    <li class="logo-header">
                        <img src="../images/logo-rond.png" alt="Ma Petite Malle d'Eveil" />
                    </li>
                    <li class="tab">Particuliers</li>
                    <li class="tab">Professionnels</li>
                    <li class="tab">Presse</li>
                    <li class="tab">Contactez-moi</li>
                </ul>
            </nav>
            
        </header>
    
    <div class="main-img">
    
            <div class="left-section">
                <div class="container-img">
                    <div class="main-img-bouteille-bleue">
                        <!-- <img src="../images/bouteille-bleue.jpg" alt="bouteille-bleue"> -->
                    </div>
                    <div class="main-img-bouteille-hiver">
                        <!-- <img src="../images/bouteille-hiver.jpg" alt="bouteille-hiver"> -->
                    </div>
                </div>
            </div>
            <div class="right-section">               
                <div class="container-text">
                    <h1 class="main-title">
                        Outils d'éveil sensoriels </br><span>respectueux de
                            l'environnement.</span> 
                    </h1>
                    <p>J'ai conçu des bouteilles inclusives et non genrées pour s'adapter à tous les utilisateurs</p>
                    <div class="buttons-main">Je suis intéressé !
                    </div>
                </div>
            </div>
    </div>
    
    </section>
    <!-- <script type="module" src="../js/main.js"></script> -->
    <?= vite('js/main.js') ?>
</body>
</html>
