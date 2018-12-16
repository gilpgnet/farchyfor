<?php
function valida($condicion, $mensaje) {
  if (!$condicion) {
    throw new Exception($mensaje);
  }
}
function atrapa_error($respuesta, $e) {
  $respuesta->error = $e->getMessage();
}
function devuelve($respuesta) {
  header('Content-type: application/json');
  echo \json_encode($respuesta);
}
function getDataAsURL($archivo) {
  $finfo = new finfo(FILEINFO_MIME);
  return 'data: ' . $finfo->file($archivo) . ';base64,' . base64_encode(file_get_contents($archivo));
}