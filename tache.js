window.addEventListener("DOMContentLoaded",ajoutTache);

function ajoutTache() {
    let tacheInput = document.getElementById("tache");
    let tachesInput = document.createElement('input');
    tachesInput.type ='hidden';
    tachesInput.name = 'toutesLesTaches';

    // Récupérer le tableau de tâches actuel depuis le champ caché
    let taches = JSON.parse(document.getElementById("toutesLesTaches").value);

    // Ajouter la nouvelle tâche
    let nouvelleTache = tacheInput.value.trim();
    if (nouvelleTache !== '') {
        taches.push(nouvelleTache);

        // Mettre à jour la valeur du champ caché avec le tableau mis à jour
        tachesInput.value = JSON.stringify(taches);

        // Réinitialiser le champ de saisie
        tacheInput.value = '';

        // Ajouter le champ caché au formulaire
        document.getElementById("saisieTache").appendChild(tachesInput);
    }

    // Retourner false pour empêcher la soumission du formulaire
    return false;
}
