function ajoutParticipants() {

    //Recuperation de la methode de vote
    let methode = document.querySelector('input[name="methode"]:checked').value;

    // Afficher la methode de vote dans la console
    console.log('Methode de vote:', methode);
    
    // Dans le fichier source.js
    localStorage.setItem('methodeVote', methode);

    //Recuperation du nombre de participants
    let numParticipants = document.getElementById('participants').value;

    // Creation d'un tableau pour stocker les noms des participants
    let nomsParticipants = [];

    // Afficher le nombre de participants dans la console
    console.log('Number of participants:', numParticipants);

    // Recuperation du container pour les participants
    let container = document.getElementById('participantsContainer');

    // Ajout des champs pour les participants en fonction du nombre de participants
    for (let i = 1; i <= numParticipants; i++) {

        // Creation d'un champ de texte pour le nom du participant
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'participant' + i;
        input.placeholder = 'Nom du participant ' + i;

        // Ajout d'un event listener pour recuperer le nom du participant
        input.addEventListener('input', function() {

            // Ajout du nom du participant dans le tableau
            nomsParticipants[i-1] = this.value;
        });

        // Ajout du champ de texte dans le container
        container.appendChild(input);
        container.appendChild(document.createElement('br'));

        console.log('Nom du participant ' + i + ':', nomsParticipants[i-1]);
    }

}
function ajoutTaches(){

    //Recuperation du nombre de taches
    let numTaches = document.getElementById('taches').value;

    // Creation d'un tableau pour stocker les noms des taches
    let taches = [];

    // Afficher le nombre de taches dans la console
    console.log('Number of tahces:', numTaches);

    // Recuperation du container pour les taches
    let containerTaches = document.getElementById('tachesContainer');

    // Ajout des champs pour les taches en fonction du nombre de taches
    for (let i = 1; i <= numTaches; i++) {

        // Creation d'un champ de texte pour le nom de la tache
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'tache' + i;
        input.placeholder = 'Ecrire la tache  ' + i;

        // Ajout d'un event listener pour recuperer le nom de la tache
        input.addEventListener('input', function() {
            taches[i - 1] = this.value;
        });

        // Ajout du champ de texte dans le container
        containerTaches.appendChild(input);
        containerTaches.appendChild(document.createElement('br'));

        // Afficher le nom de la tache dans la console
        console.log('Tache ' + i + ':', taches[i - 1]);
    }


}
function ajoutParticipantsEtTaches(){
    ajoutParticipants();
    ajoutTaches();

    //Creation d'un bouton pour passer à l'etape de vote et ajout dans le container
    const submitContainer = document.getElementById('submitContainer');
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Etape Suivante'
    submitContainer.appendChild(submitButton);
}
