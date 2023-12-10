function ajoutParticipants() {

    let numParticipants = document.getElementById('participants').value;
    let nomsParticipants = [];
    console.log('Number of participants:', numParticipants);

    let container = document.getElementById('participantsContainer');
    let form = document.getElementById('initialisation');

    for (let i = 1; i <= numParticipants; i++) {
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'participant' + i;
        input.placeholder = 'Nom du participant ' + i;

        input.addEventListener('input', function() {
            nomsParticipants[i-1] = this.value;
        });

        container.appendChild(input);
        container.appendChild(document.createElement('br'));

        console.log('Nom du participant ' + i + ':', nomsParticipants[i-1]);
    }

}
function ajoutTaches(){

    let numTaches = document.getElementById('taches').value;
    let taches = [];
    console.log('Number of tahces:', numTaches);

    let containerTaches = document.getElementById('tachesContainer');
    let form = document.getElementById('initialisation');

    for (let i = 1; i <= numTaches; i++) {
        let input = document.createElement('input');
        input.type = 'text';
        input.name = 'tache' + i;
        input.placeholder = 'Ecrire la tache  ' + i;

        input.addEventListener('input', function() {
            taches[i - 1] = this.value;
        });

        containerTaches.appendChild(input);
        containerTaches.appendChild(document.createElement('br'));

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
    submitButton.value = 'Etape Suivante';
    submitContainer.appendChild(submitButton);
}
