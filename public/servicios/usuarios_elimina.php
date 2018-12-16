<?php
mb_internal_encoding("UTF-8");
require_once "util.php";
require_once "conecta.php";
$respuesta = new stdClass();
try {
  $con->verifica();
  $cue = trim(filter_input(INPUT_POST, "cue"));
  $con->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);
  $con->execute("DELETE FROM USUARIO_ROL WHERE USU_CUE = ?", "s", $cue);
  $con->execute("DELETE FROM USUARIO WHERE USU_CUE = ?", "s", $cue);
  $con->commit();
} catch (Exception $e) {
  atrapa_error($respuesta, $e);
}
devuelve($respuesta);