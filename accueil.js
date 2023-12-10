function ajoutParticipants() {
    // Recuperation du nombre de participants
    let numParticipants = document.getElementById('participants').value;

    // Creation d'un tableau pour stocker les noms des participants
    let nomsParticipants = [];

    //Affichage du nombre de participants dans la console
    console.log('Number of participants:', numParticipants);

    // Recuperation du container des participants
    let container = document.getElementById('participantsContainer');

    for (let i = 1; i <= numParticipants; i++) {
        //Creation d'un element input en fonction du nombre de participants
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'participant' + i;
        input.placeholder = 'Nom du participant ' + i;

        //Ajout d'un event listener pour recuperer le nom du participant
        input.addEventListener('input', function() {
            nomsParticipants[i-1] = this.value;
        });

        //Ajout de l'input texte dans le container
        container.appendChild(input);
        container.appendChild(document.createElement('br'));

        //Affichage du nom du participant dans la console
        console.log('Nom du participant ' + i + ':', nomsParticipants[i-1]);
    }

}
function ajoutTaches(){

    // Recuperation du nombre de taches
    let numTaches = document.getElementById('taches').value;

    // Creation d'un tableau pour stocker les noms des participants
    let taches = [];

    //Affichage du nombre de taches dans la console
    console.log('Number of tahces:', numTaches);

    // Recuperation du container des taches
    let containerTaches = document.getElementById('tachesContainer');

    for (let i = 1; i <= numTaches; i++) {
        //Creation d'un element input en fonction du nombre de participants
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'tache' + i;
        input.placeholder = 'Ecrire la tache  ' + i;

        //Ajout d'un event listener pour recuperer le nom du participant
        input.addEventListener('input', function() {
            taches[i - 1] = this.value;
        });

        //Ajout de l'input texte dans le container
        containerTaches.appendChild(input);
        containerTaches.appendChild(document.createElement('br'));

        //Affichage du nom du participant dans la console
        console.log('Tache ' + i + ':', taches[i - 1]);
    }


}
function ajoutParticipantsEtTaches(){

    ajoutParticipants();
    ajoutTaches();

    //Creation d'un bouton pour passer à l'etape de voote et envoyer le formulaire
    let submitContainer = document.getElementById('submitContainer');
    let submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Etape Suivante'
    submitContainer.appendChild(submitButton);
}
