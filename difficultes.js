// document.addEventListener('DOMContentLoaded', initPage);
onload = initPage;
function fondRouge(){
    let radioButtons = document.querySelectorAll('input[type="radio"]');
        
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('change', function() {
    
            //Pour faire en sorte que quand on change d'avis, la carte qu'on avait choisi n'est plus selectionee
            document.querySelectorAll('img').forEach(function(img) {
                img.classList.remove('red-background');
            });
    
            //Si le radio est selectionne on ajoute la classe red-background à la carte (l'element avant le radio du dom)
            if (this.checked) {
                let img = this.previousElementSibling;
                img.classList.add('red-background');
            }
        });
    });
}

function tourJoueur() {
    fetch('participants.json')
        .then(response => response.json())
        .then(data => {
            displayJoueur(data);
            console.log(data);
        })
        .catch(error => console.error('Désolé, une erreur est survenue', error));
}
let currentIndex = 0;

function displayJoueur(data) {
    const nomForm = document.getElementById('difficultes');
    // Afficher la première personne
    displayPerson(data, currentIndex);

    // Ajouter un gestionnaire d'événements pour le clic sur le bouton
    nomForm.addEventListener('submit', function(event) {
        // Afficher la personne suivante.
        event.preventDefault();
        currentIndex = (currentIndex + 1) % data.length;
        displayPerson(data, currentIndex);
    });
}

function displayPerson(data, index) {
    const jsonDataContainer = document.getElementById('jsonJoueur');
    if(jsonDataContainer){
    if (Array.isArray(data) && data.length > 0) {
        const person = data[index];
        jsonDataContainer.innerHTML = '<p>${person} à toi de jouer</p>';
    }} else {
        jsonDataContainer.innerHTML = '<p>Aucune donnée disponible.</p>';
    }
}

function initPage() {
    console.log('DOM chargé');
    fondRouge();
    tourJoueur();
}

