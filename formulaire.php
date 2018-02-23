


<?php
/*Sanitisation*/
$options = array(
  'tache'         => FILTER_SANITIZE_STRING,
  'tache_ligne'   => FILTER_SANITIZE_STRING
);
$result = filter_input_array(INPUT_POST, $options);
/*fin Sanitisation*/


//Requête POST:
//vérification des valeurs après la Sanitisation
if($result != null && $result != FALSE && $_SERVER['REQUEST_METHOD']=='POST')
{
  /*vérifie si on a cliqué sur le bouton "ajouter".*/
  if(isset($_POST["ajouter"]) && $_POST["ajouter"] == "Ajouter")
  {
    /*nom de la tache contenu dans le "TextBox"*/
    $tache=$_POST["tache"];
    /*utilisation de la fonction ecrireJSON*/
    ecrireJSON($tache, false);
  }
  /*vérifie si on a cliqué sur le bouton "Enregistrer".*/
  if(isset($_POST["submit"]) && $_POST["submit"] == "Enregistrer")
  {
    /*$tache_ligne est un tableau*/
    $tache_ligne = $_POST["tache_ligne"];
    /*boucle sur le tableau $tache_ligne*/
    // for($i = 0; $i < sizeof($tache_ligne); $i++)
    //   enregistreJSON($tache_ligne[$i]);
    enregistreJSON($tache_ligne);
  }
  /*Requete POST provenant de la fonction "post_dragdrop" du fichier javascript (script.js)*/
  if(isset($_POST["dragdrop"]) && $_POST["dragdrop"] == "true")
  {
    /*récupère l'index source*/
    $src_index = $_POST["src_index"];
    /* récupère l'index destination*/
    $dest_index = $_POST["dest_index"];
    /*utilise la fonction dragdropJSON*/
    dragDropJSON($src_index, $dest_index);
  }
}

/*fonction qui transforme les variable en format JSON*/
function ecrireJSON($tache, $terminer)
{
  /*appel de la fonction "tableauJSON", $tabjson reçoit un tableau d'objet JSON*/
  $tabjson = tableauJSON();

  /*CREATION JSON*/
  /*Création d'une table ($tab) qui deviendra un objet JSON*/
  $tab = array("Nom" => $tache, "Terminer" => $terminer );
  /*ajout de l'objet JSON dans  la table qui reçois les objets JSON*/
  $tabjson[] = $tab;

  /*utilise la fonction "sauvegardeJSON" en lui envoyant un tablreau d'objets JSON ($tabjson)*/
  sauvegardeJSON($tabjson);
}
/*fonction qui reçoit l'index source et l'index destination et qui les échange*/
function dragDropJSON($src_index, $dest_index)
{
  /*appel de la fonction "tableauJSON", $tabjson reçoit un tableau d'objet JSON*/
  $tabjson = tableauJSON();
  /*vérifie que les index sont des entiers*/
  $src_index = (int)$src_index;
  $dest_index = (int)$dest_index;
  /*échange les valeur dans le tableau*/
  $obj = $tabjson[$src_index];
  $tabjson[$src_index] = $tabjson[$dest_index];
  $tabjson[$dest_index] = $obj;

  /*utilise la fonction "sauvegardeJSON" en lui envoyant un tablreau d'objets JSON ($tabjson)*/
  sauvegardeJSON($tabjson);

}



 ?>
