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
            nomsParticipants[i - 1] = this.value;
        });

        container.appendChild(input);
        container.appendChild(document.createElement('br'));

        console.log('Nom du participant ' + i + ':', nomsParticipants[i - 1]);
    }

    let nomsInput = document.createElement('input');
    nomsInput.type = 'hidden';
    nomsInput.name = 'nomsParticipants';
    nomsInput.value = JSON.stringify(nomsParticipants);

    form.appendChild(nomsInput);
    console.log('Noms des participants:', nomsParticipants);
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

    let tachesInput = document.createElement('input');
    tachesInput.type = 'hidden';
    tachesInput.name = 'nomsParticipants';
    tachesInput.value = JSON.stringify(taches);

    form.appendChild(tachesInput);

}
function ajoutParticipantsEtTaches(){
    ajoutParticipants();
    ajoutTaches();
    let submitContainer = document.getElementById('submitContainer');
    let submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Etape Suivante'
    submitContainer.appendChild(submitButton)
}