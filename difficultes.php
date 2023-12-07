<?php
// session_start();
print_r($_POST);
// $numParticipants = $_SESSION['participants'];
// $numTaches = $_SESSION['taches'];
$numParticipants = 1;
$numTaches = 1;
if (isset($_POST['difficulte'])) {
    $selectedDifficulte = $_POST['difficulte'];
    echo $_POST['difficulte'];
}else{
    echo "erreur";
}
// echo $_POST['difficulte'];
//     for ($i = 0; $i < $numTaches; $i++) {
//         for ($j = 0; $j < $numParticipants; $j++) {
//             $difficulte = $_POST['difficulte'];
//             $difficultes = [];
//             array_push($difficultes, $difficulte);
//             // header('Location: difficultes.html');
//             echo $difficultes;
//         }

//     }

?>