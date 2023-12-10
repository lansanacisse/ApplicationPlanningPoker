// document.addEventListener('DOMContentLoaded', initPage);

// A l'ouverture de la page on execute la fonction initPage
onload = initPage;

// Tableau pour stocker les votes
let votes = [];

// Variable pour stocker la data json
let data;

function fondRouge() {

    // Recuperer les boutons radio
    let radioButtons = document.querySelectorAll('input[type="radio"]');

    // Ajouter un gestionnaire d'événements sur les boutons radio
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {
            // Quand on change d'un bouton à l'autre on elimine la classe 'red-background' à l'image
            document.querySelectorAll('img').forEach(function(img) {
                img.classList.remove('red-background');
            });

            // Si le radio est sélectionné, on ajoute la classe red-background à la carte (l'élément avant le radio du DOM)
            if (this.checked) {
                let img = this.previousElementSibling;
                img.classList.add('red-background');
            }
        });
    });
}

function reinitialiser_formulaire() {

    // Recuperer les boutons radio
    let radioButtons = document.querySelectorAll('input[type="radio"]');

     // Retirer la classe red-background de toutes les images lorsque le formulaire est soumis
     document.querySelectorAll('img').forEach(function(img) {
        img.classList.remove('red-background');
     });
    
     // Décocher tous les boutons radio lorsque le formulaire est soumis
     radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
     });
}


function tourParticipant() {

    // Recuperer les données json
    fetch('participantsEtTaches.json')
        .then(response => response.json())
        .then(dataObject => {
            traitementParticipant(dataObject);
            data = dataObject;
            console.log(dataObject);
        })
        .catch(error => console.error('Désolé, une erreur est survenue', error));
}

// Variable pour stocker l'index du participant en cours
let currentIndexParticipant = 0;

// Variable pour stocker l'index de la tâche en cours
let participantsVote = 0;

// Variable pour stocker l'index de la tâche en cours
let currentIndexTache = 0;

function traitementParticipant(data) {

    // Recuperer le formulaire
    const nomForm = document.getElementById('difficultes');

    // Afficher la première personne
    displayParticipant(data.tabParticipants, currentIndexParticipant);

    // Afficher la première tâche
    displayTache(data.tabTaches, currentIndexTache);


    // Ajouter un gestionnaire d'événements pour le clic sur le bouton
    nomForm.addEventListener('submit', function (event) {

         // Empêcher la soumission par défaut du formulaire
        event.preventDefault();

        console.log('currentIndexTache', currentIndexTache);
        
        // Incrementer le nombre de participants qui ont voté
        participantsVote++;
        
        //Fonction pour stocker les votes dans un tableau
        stocker();

        // Reinitialiser le formulaire
        reinitialiser_formulaire();

        if (
            participantsVote === data.tabParticipants.length &&
            currentIndexParticipant === data.tabParticipants.length - 1 &&
            currentIndexTache === data.tabTaches.length - 1
        ) {
            // C'est la dernière tâche, le dernier participant, autoriser la soumission
            if(!parole()){
            nomForm.submit(); // Soumettre le formulaire
            }

        } else if (participantsVote === data.tabParticipants.length) { //Tous le participants votent mais pas la dernière tâche
            
            let res = parole();

            // Remettre le nombre des participants qui ont voté à 0
            participantsVote = 0;
            
            if(!res){
                // Si les participants ont voté et pas de divergeance, on passe au participant suivant et on incrémente l'index de la tâche
                // Cette ligne permet de passer au participant suivant dans un tableau circulaire. Une fois que currentIndexParticipant atteint la fin du tableau, il revient au début, créant ainsi une boucle.
                currentIndexParticipant = (currentIndexParticipant + 1) % data.tabParticipants.length;
            }else{

                currentIndexParticipant = 0;
            }

            // Afficher le participant suivant
            displayParticipant(data.tabParticipants, currentIndexParticipant);

            // Afficher la tâche suivante après que tous les participants ont voté
            currentIndexTache = (currentIndexTache + 1) % data.tabTaches.length;
            displayTache(data.tabTaches, currentIndexTache);

        } else {
            // Il reste des participants à faire voter
            currentIndexParticipant = (currentIndexParticipant + 1) % data.tabParticipants.length;
            displayParticipant(data.tabParticipants, currentIndexParticipant);
        }
    });
}


function displayParticipant(data, index) {

    // Recuperer le container pour les données json
    const jsonDataContainer = document.getElementById('jsonParticipant');

    if (jsonDataContainer) {
        // Si le container existe, on affiche les données json
        if (Array.isArray(data) && data.length > 0) {

            // Recuperer la personne à afficher
            const person = data[index];

            // Afficher la personne dans le container
            jsonDataContainer.innerHTML = `<p> ${person} à toi de voter</p>`;
        }
    } else {
        jsonDataContainer.innerHTML = `<p>Aucune donnée disponible.</p>`;
    }
}

function displayTache(data, index) {

    // Recuperer le container pour les données json
    const jsonDataContainer = document.getElementById('jsonTache');

    if (jsonDataContainer) {
        // Si le container existe, on affiche les données json
        if (Array.isArray(data) && data.length > 0) {

            // Recuperer la tache à afficher
            const tache = data[index];

            // Afficher la tache dans le container
            jsonDataContainer.innerHTML = `<p> On traite la tache : ${tache}</p>`;
        }
    } else {
        jsonDataContainer.innerHTML = `<p>Aucune donnée disponible.</p>`;
    }
}

function stocker(){

    let vote;
    let radioButtons = document.querySelectorAll('input[type="radio"]');

    // Parcourir les boutons radio
    radioButtons.forEach(function(radioButton) {

        // Si le bouton radio est sélectionné, on stocke la valeur du bouton radio
        if (radioButton.checked) {
            vote = radioButton.value;

            // console.log('vote', vote);

            // Ajouter le vote dans le tableau votes
            votes.push(vote);

            // Afficher le tableau votes dans la console
            console.log('votes', votes);
        }
    });

    // Stocker le tableau votes dans un champ caché du formulaire pour les envoyer au serveur php
    document.getElementById('tabVotes').value = JSON.stringify(votes);

}
function parole() {

    //Initialiser les variables minVote et maxVote
    let minVote = 500;
    let maxVote = 0;

    //Parcourir le tableau votes pour trouver le min et le max. Ce parcours se fait de tache en tache
    for (let i = currentIndexTache * data.tabParticipants.length; i < (currentIndexTache + 1) * data.tabParticipants.length; i++) {
        if (votes[i] > maxVote) {
            maxVote = votes[i];
        }
        if (votes[i] < minVote) {
            minVote = votes[i];
        }
    
    }

    if(minVote != maxVote)
    {
        alert("Il y a des divergences, il faut en discuter");

        //Eliminer les cases du tableau votes de la tache en cours
        votes.splice(currentIndexTache * data.tabParticipants.length, data.tabParticipants.length);

        // Decrementer l'index de la tache en cours vu qu'on doit revoter
        currentIndexTache = currentIndexTache - 1;

        // Reinitialiser le formulaire
        reinitialiser_formulaire();
        
        return true;
    }
    return false;
}

function initPage() {
    console.log('DOM chargé');
    tourParticipant();
    fondRouge();
}