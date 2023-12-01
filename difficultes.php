<?php
session_start();
$numParticipants = $_SESSION['participants'];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    for ($i = 0; $i < $numParticipants; $i++) {
        $difficulte = $_POST['difficulte'];
        $difficultes = [];
        array_push($difficultes, $difficulte);
        header('Location: difficultes.html');
    }

}
?>