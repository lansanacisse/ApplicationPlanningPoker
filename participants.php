<?php

// Démarrer la session
session_start();

// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Récupérer le nombre de participants
    $numParticipants = $_POST['participants'];

    // Récupérer le nombre de tâches
    $numTaches = $_POST['taches'];

    // Enregistrer les données dans la session
    $_SESSION['participants'] = $numParticipants;

    // Enregistrer les données dans la session
    $_SESSION['taches'] = $numTaches;

    // Créer un tableau  avec les noms des participants
    $participants = [];

    // Créer un tableau  avec les noms des tâches
    $taches = [];

    // Récupérer les noms des participants
    for ($i = 0; $i < $numParticipants; $i++) {
        $participants[$i] = $_POST['participant' . ($i + 1)];
    }

    // Récupérer les noms des tâches
    for ($i = 0; $i < $numTaches; $i++) {
        $taches[$i] = $_POST['tache' . ($i + 1)];
    }

    // Créer un tableau avec les noms des participants et des tâches
    $donnees = array('tabParticipants' => $participants, 'tabTaches' => $taches);

    // Convertir les tableaux en format JSON
    $jsonParticipants = json_encode($participants);
    $jsonTaches = json_encode($taches);
    $jsonDonnees = json_encode($donnees);

    // Écrire le JSON dans un fichier
    file_put_contents('participants.json', $jsonParticipants);
    file_put_contents('taches.json', $jsonTaches);
    file_put_contents('participantsEtTaches.json', $jsonDonnees);

    // Rediriger l'utilisateur vers une autre page après le traitement
    header('Location: difficultes.html');

    // Arrêter l'exécution du script
    exit();
}
?>

