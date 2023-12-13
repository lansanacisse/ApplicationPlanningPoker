// A l'ouverture de la page on execute la fonction initPage
onload = initPage;

function recupererLesDonnees() {
    // Recuperer les données json
    fetch('votes.json')
        .then(response => response.json())
        .then(dataObject => {
            afficherTachesEtDifficultes(dataObject);
            console.log(dataObject);
        })
        .catch(error => console.error('Désolé, une erreur est survenue', error));
}

function afficherTachesEtDifficultes(dataObject) {
    // Afficher les taches et les difficultes
    displayTacheEtDifficulte(dataObject);
}

function displayTacheEtDifficulte(data) {

    // Recuperer le container pour les données json
    const jsonDataContainer = document.getElementById('jsonTaches');

    if (jsonDataContainer) {
        // Si le container existe, on affiche les données json
        
            // Recuperer les  tache à afficher
            let keys = Object.keys(data);

            // Afficher les taches
            keys.forEach(key => {
                let difficulte = data[key];
                // Afficher la tache dans le container
                jsonDataContainer.innerHTML += `<p>La tache : ${key}, a une difficulte de : ${difficulte}</p>`;
            })
    } else {

        // Message d'erreur si le container n'existe pas
        jsonDataContainer.innerHTML = `<p>Aucune donnée disponible.</p>`;
    }
}

// Fonction pour initialiser la page
function initPage() {
    console.log('Page chargee');
    recupererLesDonnees();
}