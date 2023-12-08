function ajoutParticipants() {
    const numParticipants = document.getElementById('participants').value;
    const nomsParticipants = [];

    console.log('Number of participants:', numParticipants);

    const container = document.getElementById('participantsContainer');
    const form = document.getElementById('initialisation');

    for (let i = 1; i <= numParticipants; i++) {
        const input = document.createElement('input');
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

    const nomsInput = document.createElement('input');
    nomsInput.type = 'hidden';
    nomsInput.name = 'nomsParticipants';
    nomsInput.value = JSON.stringify(nomsParticipants);

    form.appendChild(nomsInput);
    console.log('Noms des participants:', nomsParticipants);
}

function ajoutTaches() {
    const numTaches = document.getElementById('taches').value;
    const taches = [];

    console.log('Number of taches:', numTaches);

    const containerTaches = document.getElementById('tachesContainer');
    const form = document.getElementById('initialisation');

    for (let i = 1; i <= numTaches; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.name = 'tache' + i;
        input.placeholder = 'Ecrire la tache ' + i;

        input.addEventListener('input', function() {
            taches[i - 1] = this.value;
        });

        containerTaches.appendChild(input);
        containerTaches.appendChild(document.createElement('br'));

        console.log('Tache ' + i + ':', taches[i - 1]);
    }

    const tachesInput = document.createElement('input');
    tachesInput.type = 'hidden';
    tachesInput.name = 'nomsTaches';
    tachesInput.value = JSON.stringify(taches);

    form.appendChild(tachesInput);
}

function sauvegardeParticipantsEtTaches() {
    const participants = JSON.parse(document.getElementsByName('nomsParticipants')[0].value);
    const taches = JSON.parse(document.getElementsByName('nomsTaches')[0].value);

    const data = {
        participants,
        taches
    };

    const jsonData = JSON.stringify(data);

    // Code to save jsonData to a file

    console.log('Participants et taches sauvegardés:', jsonData);
}

function ajoutParticipantsEtTaches() {
    ajoutParticipants();
    ajoutTaches();
    const submitContainer = document.getElementById('submitContainer');
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Etape Suivante';
    submitContainer.appendChild(submitButton);
}
