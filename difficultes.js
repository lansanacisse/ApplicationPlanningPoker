// document.addEventListener('DOMContentLoaded', initPage);

// A l'ouverture de la page on execute la fonction initPage
onload = initPage;

// Tableau pour stocker les votes
let votes = [];

// Variable pour stocker la data json
let data;

const nomForm = document.getElementById('difficultes');

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
    // const nomForm = document.getElementById('difficultes');

    // Afficher la première personne
    displayParticipant(data.tabParticipants, currentIndexParticipant);

    // Afficher la première tâche
    displayTache(data.tabTaches, currentIndexTache);


    // Ajouter un gestionnaire d'événements pour le clic sur le bouton
    nomForm.addEventListener('submit', function (event) {

        // Si pas c'est la dernière tâche et le dernier participant, on ne soumet pas le formulaire
        if (!(currentIndexParticipant === data.tabParticipants.length - 1 &&currentIndexTache === data.tabTaches.length - 1))
        {event.preventDefault();}
        
        // Afficher l'index du tache en cours
        console.log('currentIndexTache', currentIndexTache);
        
        
        //Fonction pour stocker les votes dans un tableau
        stocker();

        // Incrementer le nombre de participants qui ont voté
        participantsVote++;

        // Reinitialiser le formulaire
        reinitialiser_formulaire();

        if (participantsVote === data.tabParticipants.length) { 
            //Tous le participants ont voté mais pas la dernière tâche
            
            // Verifier si il y a des divergences
            let divergences = parole();

            // Si c'est la dernière tâche et le dernier participant et qu'il n'y a pas de divergences
        if (currentIndexParticipant === data.tabParticipants.length - 1 &&
            currentIndexTache === data.tabTaches.length - 1 &&
            !divergences) {
            // Soumettre le formulaire
            nomForm.submit();
        } else {
            // Sinon, empêcher la soumission par défaut du formulaire
            event.preventDefault();
        }

            // Remettre le nombre des participants qui ont voté à 0
            participantsVote = 0;
            

            // Modifier currentIndexParticipant pour passer au participant suivant (modulo pour revenir au début du tableau)
            currentIndexParticipant = (currentIndexParticipant + 1) % data.tabParticipants.length;
            
            // Afficher le participant suivant
            displayParticipant(data.tabParticipants, currentIndexParticipant);

            // Afficher la tâche suivante après que tous les participants ont voté
            currentIndexTache = (currentIndexTache + 1) % data.tabTaches.length;
            displayTache(data.tabTaches, currentIndexTache);

        } else {
            // Il reste des participants à faire voter

            // Modifier currentIndexParticipant pour passer au participant suivant
            currentIndexParticipant = (currentIndexParticipant + 1) % data.tabParticipants.length;

            // Afficher le participant suivant
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

        // Message d'erreur si le container n'existe pas
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

        // Message d'erreur si le container n'existe pas
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
    document.getElementById('tabVotes').value = votes;

}


function parole() {

    //Initialiser les variables minVote, maxVote, nomMin, nomMax, cafes et abstentions
    let minVote = Infinity;
    let maxVote = -Infinity;
    let nomMin= '';
    let nomMax= '';
    let cafes = 0;
    let abstentions = 0;

    //Parcourir le tableau votes pour trouver le min et le max. Ce parcours se fait de tache en tache
    for (let i = currentIndexTache * data.tabParticipants.length; i < (currentIndexTache + 1) * data.tabParticipants.length; i++) {
        
        // Convertir la valeur du vote en nombre
        let valeurNumerique = parseInt(votes[i]);

        // Si la valeur du vote est un nombre et n'est pas '?' ou 'cafe'
        if (!isNaN(valeurNumerique)) {
            if (valeurNumerique > maxVote) {
                maxVote = valeurNumerique;
                nomMax = data.tabParticipants[i % data.tabParticipants.length];
            }
            if (valeurNumerique < minVote) {
                minVote = valeurNumerique;
                nomMin = data.tabParticipants[i % data.tabParticipants.length];
            }
        } else if (votes[i] == '?'){
            abstentions++;
        } else {
            cafes++;
        }
    }

    
    // Si il y a des divergences entre les participants ou si tous les participants ont voté 'cafe' ou 'abstention'
    if(minVote != maxVote && minVote != Infinity && maxVote != -Infinity)
    {
        alert("Il y a des divergences entre "+ nomMin + " et " + nomMax + ", il faut en discuter");

        //Eliminer les cases du tableau votes de la tache en cours
        votes.splice(currentIndexTache * data.tabParticipants.length, data.tabParticipants.length);

        // Decrementer l'index de la tache en cours vu qu'on doit revoter
        currentIndexTache = currentIndexTache - 1;

        // Reinitialiser le formulaire
        reinitialiser_formulaire();

        return true;

    } 
    if (cafes == data.tabParticipants.length){

        alert("Pause café !");

        //Eliminer les cases du tableau votes de la tache en cours
        votes.splice(currentIndexTache * data.tabParticipants.length, data.tabParticipants.length);

        // Decrementer l'index de la tache en cours vu qu'on doit revoter
        currentIndexTache = currentIndexTache - 1;

        // Reinitialiser le formulaire
        reinitialiser_formulaire();

        // return true;
        document.getElementById('indexTache').value = currentIndexTache;

        nomForm.submit();


    } 
    if (abstentions == data.tabParticipants.length){

        alert("Abstention. REVOTER.");
        
        //Eliminer les cases du tableau votes de la tache en cours
        votes.splice(currentIndexTache * data.tabParticipants.length, data.tabParticipants.length);

        // Decrementer l'index de la tache en cours vu qu'on doit revoter
        currentIndexTache = currentIndexTache - 1;

        // Reinitialiser le formulaire
        reinitialiser_formulaire();

        return true;

    }
    else if (
        (
            ((abstentions < data.tabParticipants.length) && (abstentions >= 1)) || 
            ((cafes < data.tabParticipants.length) && (cafes >= 1))
        ) && 
        (minVote == maxVote)
    ) {// Si on a au moins une abstention ou un café et que tous les votes sont égaux
        
        alert("Unanimité non achevée. Il faut revoter.");
        
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