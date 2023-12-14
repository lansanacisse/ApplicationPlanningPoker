const fs = require('fs');

// Fonction pour charger le fichier JSON
function chargerFichierJson() {
    // Vérifie si le fichier JSON existe
    if (fichierJsonExiste()) {
        // Charge les données et affiche la page de difficultés
        chargerDonnees();
        afficherPageDifficultes();
    } else {
        // Affiche une alerte et redirige vers la page d'accueil
        afficherAlerte();
    }
}

// Fonction pour vérifier si le fichier JSON existe
function fichierJsonExiste() {
    // Vérification de l'existence du fichier JSON
    const filePath = 'tableau_scores.json';
    return fs.existsSync(filePath);
}

// Fonction pour charger les données depuis le fichier JSON
function chargerDonnees() {
    // Charge les données depuis le fichier JSON
    const filePath = 'tableau_scores.json';
    // (Ajouter le code pour charger les données depuis le fichier)
}

// Fonction pour afficher la page de difficultés
function afficherPageDifficultes() {
    // Redirige vers la page de difficultés
    window.location.href = 'difficultes.html'; // Remplacez 'page_difficultes.html' par le chemin de votre page de difficultés
}

// Fonction pour afficher une alerte et rediriger
function afficherAlerte() {
    // Affiche une alerte
    alert("Aucune partie n'a été commencée, veuillez commencer une partie.");

    // Attend la fermeture de l'alerte pour rediriger
    window.addEventListener('load', function () {
        const redirectFunction = function () {
            // Redirige vers la page index.html
            window.location.href = 'index.html';
        };

        // Vérifie si la fonction window.alert existe
        const interval = setInterval(function () {
            if (!window.alert) {
                clearInterval(interval);
                redirectFunction();
            }
        }, 100);
    });
}
