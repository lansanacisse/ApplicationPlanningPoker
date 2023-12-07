// document.addEventListener('DOMContentLoaded', initPage);
onload = initPage;
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

    // Ajouter un écouteur d'événements sur l'événement submit du formulaire
    form.addEventListener('submit', function(event) {
        // Retirer la classe red-background de toutes les images lorsque le formulaire est soumis
        document.querySelectorAll('img').forEach(function(img) {
            img.classList.remove('red-background');
        });

        // Décocher tous les boutons radio lorsque le formulaire est soumis
        radioButtons.forEach(function(radioButton) {
            radioButton.checked = false;
        });
    });
}


function tourParticipant() {
    fetch('participantsEtTaches.json')
        .then(response => response.json())
        .then(data => {
            traitementParticipant(data);
            console.log(data);
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
        // Afficher la personne suivante.
        // event.preventDefault();
        participantsVote++;

        if (participantsVote === data.tabParticipants.length) {
            participantsVote = 0;
            currentIndexParticipant = (currentIndexParticipant + 1) % data.tabParticipants.length;
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
            jsonDataContainer.innerHTML = `<p> ${person} à toi de jouer</p>`;
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

function initPage() {
    console.log('DOM chargé');
    fondRouge();
    tourParticipant();
}