// Ajouter un gestionnaire d'événement submit au formulaire
document.getElementById('partie').addEventListener('submit', function(event) {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();

    // Récupérer la valeur du bouton qui a déclenché l'événement submit
    let choixPartie = document.activeElement.value;

    // Stocker la valeur dans localStorage
    localStorage.setItem('choixPartie', choixPartie);

    if (choixPartie === 'reprendre') {
        // Rediriger vers la page difficultes.html
        window.location.href = 'difficultes.html';
    } else {
        window.location.href = 'accueil.html';
    }
});