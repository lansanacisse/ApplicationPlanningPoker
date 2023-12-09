// document.addEventListener('DOMContentLoaded', initPage);
onload = initPage;
let votes = [];
let data;

function fondRouge() {
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    let form = document.querySelector('form'); // Sélectionnez votre formulaire
    
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {
            // Pour faire en sorte que quand on change d'avis, la carte qu'on avait choisi n'est plus sélectionnée
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
    fetch('participantsEtTaches.json')
        .then(response => response.json())
        .then(dataObject => {
            traitementParticipant(dataObject);
            data = dataObject;
            console.log(dataObject);
        })
        .catch(error => console.error('Désolé, une erreur est survenue', error));
}

let currentIndexParticipant = 0;
let participantsVote = 0;
let currentIndexTache = 0;

function traitementParticipant(data) {
    const nomForm = document.getElementById('difficultes');

    // Afficher la première personne
    displayParticipant(data.tabParticipants, currentIndexParticipant);

    // Afficher la première tâche
    displayTache(data.tabTaches, currentIndexTache);


    // Ajouter un gestionnaire d'événements pour le clic sur le bouton
    nomForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêcher la soumission par défaut

        console.log('currentIndexTache', currentIndexTache);
        participantsVote++;
        
        //Fonction pour stocker les votes dans un tableau
        stocker();

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
            participantsVote = 0;
            if(!res){
                currentIndexParticipant = (currentIndexParticipant + 1) % data.tabParticipants.length;
            }else{currentIndexParticipant = 0;}
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
    const jsonDataContainer = document.getElementById('jsonParticipant');
    if (jsonDataContainer) {
        if (Array.isArray(data) && data.length > 0) {
            const person = data[index];
            jsonDataContainer.innerHTML = `<p> ${person} à toi de voter</p>`;
        }
    } else {
        jsonDataContainer.innerHTML = `<p>Aucune donnée disponible.</p>`;
    }
}

function displayTache(data, index) {
    const jsonDataContainer = document.getElementById('jsonTache');
    if (jsonDataContainer) {
        if (Array.isArray(data) && data.length > 0) {
            const tache = data[index];
            jsonDataContainer.innerHTML = `<p> On traite la tache : ${tache}</p>`;
        }
    } else {
        jsonDataContainer.innerHTML = `<p>Aucune donnée disponible.</p>`;
    }
}

function stocker(){
    let vote;
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(function(radioButton) {
        if (radioButton.checked) {
            vote = radioButton.value; // Store the value of the selected radio button
            // console.log('vote', vote);
            votes.push(vote);
            console.log('votes', votes);
        }
    });
    document.getElementById('tabVotes').value = JSON.stringify(votes);

}
function parole() {
    let minVote = 500;
    let maxVote = 0;
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
        currentIndexTache = currentIndexTache - 1;

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