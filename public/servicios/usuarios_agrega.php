<?php
mb_internal_encoding("UTF-8");
require_once "util.php";
require_once "conecta.php";
$respuesta = new stdClass();
try {
  $con->verifica();
  $avatar = null;
  $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
  $cue = trim(filter_input(INPUT_POST, "cue"));
  $match = trim(filter_input(INPUT_POST, "match"));
  $nombre = trim(filter_input(INPUT_POST, "nombre"));
  $pas_id = trim(filter_input(INPUT_POST, "pasatiempo"));
  if (!$pas_id) {
    $pas_id = null;
  }
  $rol_ids = isset($_POST["roles"]) ? $_POST["roles"] : [];
  valida($cue, "Falta el cue.");
  valida(preg_match("/^\\w{5,16}$/", $cue),
    "El cue debe tener 5 a 16 letras o dígitos.");
  valida(preg_match("/^\\w{5,25}$/", $match),
    "El match debe tener 5 a 25 letras o dígitos.");
  valida($nombre, "Falta el nombre.");
  if (isset($_FILES["avatar"]) && $_FILES["avatar"]["size"] > 0) {
    $avatar = getDataAsURL($_FILES["avatar"]["tmp_name"]);
  } else {
    throw new Exception("Falta el Avatar.");
  }
  $con->execute(
    "INSERT INTO USUARIO (USU_CUE, USU_AVATAR, USU_MATCH, USU_NOMBRE, PAS_ID)
     VALUES (?,?,SHA1(?),?,?)",
    "ssssi", $cue, $avatar, $match, $nombre, $pas_id);
  if ($rol_ids) {
    $con->prepare("INSERT INTO USUARIO_ROL (USU_CUE,ROL_ID) VALUES (?,?)");
    foreach ($rol_ids as $rol_id) {
      $con->bind_execute("ss", $cue, $rol_id);
    }
  }
  $con->commit();
} catch (Exception $e) {
  atrapa_error($respuesta, $e);
}
devuelve($respuesta);