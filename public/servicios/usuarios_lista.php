<?php
mb_internal_encoding("UTF-8");
require_once "util.php";
require_once "conecta.php";
$respuesta = new stdClass();
try {
  $respuesta->cue = isset($_SESSION["cue"]) ? $_SESSION["cue"] : "";
  $respuesta->roles = isset($_SESSION["roles"]) ? $_SESSION["roles"] : [];
  $con->verifica();
  $con->query(
    "SELECT U.USU_AVATAR AS imagen, U.USU_CUE AS id, U.USU_CUE AS texto1,
        GROUP_CONCAT(ROL_ID) AS texto2
      FROM USUARIO U LEFT JOIN USUARIO_ROL URL
      ON U.USU_CUE = URL.USU_CUE
      GROUP BY U.USU_CUE
      ORDER BY UPPER(U.USU_CUE)");
  $respuesta->lista = $con->fetch_all();
} catch (Exception $e) {
  atrapa_error($respuesta, $e);
}
devuelve($respuesta);