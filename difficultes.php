<?php
session_start();
$numParticipants = $_SESSION['participants'];
$numTaches = $_SESSION['taches'];
    for ($i = 0; $i < $numTaches; $i++) {
        for ($j = 0; $j < $numParticipants; $j++) {
            $difficulte = $_POST['difficulte'];
            $difficultes = [];
            array_push($difficultes, $difficulte);
            header('Location: difficultes.html');
        }
    }

?>