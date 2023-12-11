<?php

// Démarrer la session
session_start();

// Récupérer le nombre de participants
$numParticipants = $_SESSION['participants'];

// Lire le fichier JSON contenant les noms des tâches
$tachesJson = file_get_contents('taches.json');
$taches = json_decode($tachesJson, true);

// Recuperer le tableau des votes
if (isset($_POST['votes'])) {
    // Diviser la chaîne de caractères en un tableau
    $tabVotes = explode(",", $_POST['votes']);
}

$indexTache = $_POST['indexTache'];
echo $indexTache;

// Cases du tableau tabDifficultes
$j = 0;

// Parcourir le tableau tabVotes et récupérer les difficultés des tâches
// Le code parcourt avec un pas de numParticipants afin d'avoir une seule valeur pour chaque tâche
for ($i = 0; $i < count($tabVotes); $i = $i + $numParticipants) {

    $tabDifficultes[$j] = $tabVotes[$i];
    $j++;
}
echo count($tabDifficultes);
// Obtenir la dernière clé du tableau
$derniereCaseIndex = key(array_slice($tabDifficultes, -1, 1, TRUE));

// Obtenir la dernière valeur du tableau
$derniereCase = $tabDifficultes[$derniereCaseIndex];

// Vérifier si la dernière valeur est un entier
if (!is_numeric($derniereCase)) {

    // Si ce n'est pas un entier, supprimer cette entrée
    unset($tabDifficultes[$derniereCaseIndex]);
}
echo count($tabDifficultes);

// Créer un tableau associatif où chaque nom de tâche est associé à sa difficulté
$tachesEtDifficultes = [];
for ($i = 0; $i < count($tabDifficultes); $i++) {
    $tachesEtDifficultes[$taches[$i]] = $tabDifficultes[$i];
}

if (count($tabDifficultes) == $numParticipants) {
    // Convertir le tableau associatif en format JSON
    $tachesEtDifficultesJson = json_encode($tachesEtDifficultes);

    // Ecrire le JSON dans un nouveau fichier
    file_put_contents('votes.json', $tachesEtDifficultesJson);
}

else{
    $tachesEtDifficultes['tacheCourante'] = $indexTache;
    $tachesEtDifficultesJson = json_encode($tachesEtDifficultes);

    // Ecrire le JSON dans un nouveau fichier
    file_put_contents('votesCafe.json', $tachesEtDifficultesJson);
}
?>