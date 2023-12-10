// document.addEventListener('DOMContentLoaded', initPage);

// Des le chargement de la page, on appelle la fonction initPage
onload = initPage;

//Creation d'un tableau pour stocker les votes
let votes = [];

// Creation d'une variable data pour y contenir la data json
let data;

function fondRouge() {

    // Recuperer tous les boutons radio
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    
    // Ajouter un gestionnaire d'événements pour le changement d'état de chaque bouton radio
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {

            // Pour faire en sorte que quand on change d'avis, la carte qu'on avait choisi n'est plus sélectionnée
            document.querySelectorAll('img').forEach(function(img) {
                img.classList.remove('red-background'); // Eliminer la classe red-background de toutes les images
            });

            // Si le radio est sélectionné, on ajoute la classe red-background à la carte (l'élément avant le radio du DOM)
            if (this.checked) {

                // this = le bouton radio. Vu que l'image est placé avant le bouton on récupere l'image grace à cette ligne
                let img = this.previousElementSibling;

                // Ajouter la classe red-background à l'image
                img.classList.add('red-background');
            }
        });
    });
}

function reinitialiser_formulaire() {

    // Recuperer tous les boutons radio
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

    // Recuperer le fichier json
    fetch('participantsEtTaches.json')
        .then(response => response.json())
        .then(dataObject => {
            traitementParticipant(dataObject);
            data = dataObject;
            console.log(dataObject);
        })
        .catch(error => console.error('Désolé, une erreur est survenue', error));
}

// Index du participant actuel
let currentIndexParticipant = 0;

// Index de la tâche actuelle
let participantsVote = 0;

// Index de la tâche actuelle
let currentIndexTache = 0;

function traitementParticipant(data) {

    // Recuperer le formulaire
    const nomForm = document.getElementById('difficultes');

    // Afficher la première personne
    displayParticipant(data.tabParticipants, currentIndexParticipant);

    // Afficher la première tâche
    displayTache(data.tabTaches, currentIndexTache);


    // Ajouter un gestionnaire d'événements pour le clic sur le bouton submit du formulaire
    nomForm.addEventListener('submit', function (event) {

        // Empêcher la soumission par défaut du formulaire
        event.preventDefault(); 

        // Afficher le numéro de la tache actuelle
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

            // Remetter les participantsVote à 0
            participantsVote = 0;
            
            if(!res){
                // Si parole renvoi false on incrémente currentIndexParticipant
                
                // Cette ligne permet de passer au participant suivant dans un tableau circulaire.
                // Une fois que currentIndexParticipant atteint la fin du tableau, il revient au début, créant ainsi une boucle.
                currentIndexParticipant = (currentIndexParticipant + 1) % data.tabParticipants.length;

            }else{
                // Sinon on le remet à 0
                currentIndexParticipant = 0;}
            
                // Afficher le prochain participant
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

    // Recuperer le container pour afficher le nom du participant
    const jsonDataContainer = document.getElementById('jsonParticipant');

    // Si le container existe
    if (jsonDataContainer) {

        // Si la data est un tableau et qu'il y a au moins un élément
        if (Array.isArray(data) && data.length > 0) {

            // Recuperer le nom du participant
            const person = data[index];

            // Afficher le nom du participant dans le container
            jsonDataContainer.innerHTML = `<p> ${person} à toi de voter</p>`;
        }
    } else {
        jsonDataContainer.innerHTML = `<p>Aucune donnée disponible.</p>`;
    }
}

function displayTache(data, index) {

    // Recuperer le container pour afficher le nom du participant
    const jsonDataContainer = document.getElementById('jsonTache');

    // Si le container existe
    if (jsonDataContainer) {

        // Si la data est un tableau et qu'il y a au moins un élément
        if (Array.isArray(data) && data.length > 0) {

            // Recuperer le nom du participant
            const tache = data[index];

            // Afficher le nom du participant dans le container
            jsonDataContainer.innerHTML = `<p> On traite la tache : ${tache}</p>`;
        }
    } else {
        jsonDataContainer.innerHTML = `<p>Aucune donnée disponible.</p>`;
    }
}

function stocker(){

    let vote;
    let radioButtons = document.querySelectorAll('input[type="radio"]');

    // Parcourir tous les boutons radio
    radioButtons.forEach(function(radioButton) {

        // Si le bouton radio est sélectionné
        if (radioButton.checked) {

            // Recuperer la valeur du bouton radio
            vote = radioButton.value;

            // console.log('vote', vote);

            // Ajouter le vote au tableau votes
            votes.push(vote);

            // Afficher le tableau votes dans la console
            console.log('votes', votes);
        }
    });

    // Stocker le tableau votes dans un input hidden pour après l'envoyer au serveur php quand on submit le formulaire
    document.getElementById('tabVotes').value = JSON.stringify(votes);

}


function parole() {

    // Initialiser les variables minVote et maxVote
    let minVote = 500;
    let maxVote = 0;

    // Parcourir le tableau votes pour trouver le min et le max des votes pour chaque tache.
    // Donc on traite les votes de la tache en cours
    for (let i = currentIndexTache * data.tabParticipants.length; i < (currentIndexTache + 1) * data.tabParticipants.length; i++) {
        if (votes[i] > maxVote) {
            maxVote = votes[i];
        }
        if (votes[i] < minVote) {
            minVote = votes[i];
        }
    
    }

    // Si le min et le max sont différents, il y a des divergences, les participants qui ont le vote min et max doivent en discuter
    if(minVote != maxVote)
    {
        alert("Il y a des divergences, il faut en discuter"); // Il faudrait aussi afficher le nom des participants qui parlent

        //Eliminer les cases du tableau votes de la tache en cours
        votes.splice(currentIndexTache * data.tabParticipants.length, data.tabParticipants.length);
        
        // Vu qu'on revote la tache, il faut decrementer currentIndexTache
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