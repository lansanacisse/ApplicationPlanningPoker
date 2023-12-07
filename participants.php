<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer le nombre de participants
    $numParticipants = $_POST['participants'];
    $numTaches = $_POST['taches'];
    $_SESSION['participants'] = $numParticipants;
    $_SESSION['taches'] = $numTaches;
    // Créer un tableau associatif avec les noms des participants
    $participants = [];
    $taches = [];
    for ($i = 0; $i < $numParticipants; $i++) {
        $participants[$i] = $_POST['participant' . ($i + 1)];
    }
    for ($i = 0; $i < $numTaches; $i++) {
        $taches[$i] = $_POST['tache' . ($i + 1)];
    }
    $donnees = array('tabParticipants' => $participants, 'tabTaches' => $taches);
    // Convertir le tableau en format JSON
    $jsonParticipants = json_encode($participants);
    $jsonTaches = json_encode($taches);
    $jsonDonnees = json_encode($donnees);
    // Écrire le JSON dans un fichier (par exemple, participants.json)
    file_put_contents('participants.json', $jsonParticipants);
    file_put_contents('taches.json', $jsonTaches);
    file_put_contents('participantsEtTaches.json', $jsonDonnees);
    // Rediriger l'utilisateur vers une autre page après le traitement
    header('Location: difficultes.html');
    exit();
}
?>

