import { seleccion, valida, muestraError, archivoSeleccionado, agregaOpciones, muestraArchivoSeleccionado, getValores, subeArchivo }
  from "./lib/util.js";
const vista = document.vista;
const avatar = vista.avatar;
/** Apunta al primer element dentro de body que tenga la etiqueta
 * img. El método querySelector busca el primer elemento que
 * corresponda al selector de hoja de estilo que recibe como
 * parámetro. Por ejemplo:
 * "img" corresponde a la etiqueta img
 * ".mxy" corresponde a una etiqueta que tenga class="mxy"
 * "#bb" corresponde a una etiqueta que tenga id="bb" */
const img = document.querySelector("img");
vista.addEventListener("submit", guarda);
/* Cuando cambia el el archivo seleccionado por el usuario, se invoca la
 * función muestraArchivoSeleccionado. */
avatar.addEventListener("change", muestraArchivoSeleccionado.bind(null, img));
firebase.database().ref("PASATIEMPO").orderByChild("PAS_UPPER_NOMBRE").once("value",
  dataSnapshot => {
    const filas = [{ id: "", texto: "Sin pasatiempo" }];
    dataSnapshot.forEach(ds => {filas.push({ id: ds.key, texto: ds.val().PAS_NOMBRE });});
    agregaOpciones(vista.pasatiempo, seleccion(), filas);
  },
  muestraError);
firebase.database().ref("ROL").orderByChild("ROL_UPPER_ID").once("value",
  dataSnapshot => {
    const filas = [];
    dataSnapshot.forEach(ds => {
      filas.push({ id: ds.key, texto: ds.key + ": " + ds.val().ROL_DESCRIPCION });
    });
    agregaOpciones(vista.roles, seleccion(), filas);
  },
  muestraError);
function guarda(evt) {
  try {
    evt.preventDefault();
    const USU_CUE = vista.cue.value.trim();
    valida(USU_CUE, "Falta el cue.");
    valida(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(USU_CUE),
      "El cue debe ser un email.");
    valida(archivoSeleccionado(avatar), "Falta el avatar.");
    const USU_UPPER_CUE = USU_CUE.toUpperCase();
    const ref = firebase.database().ref("USUARIO").push();
    // Busca el cue en la base de datos.
    firebase.database().ref("USUARIO")
      .orderByChild("USU_UPPER_CUE").equalTo(USU_UPPER_CUE).once("value",
        async dataSnapshot => {
          try {
            if (dataSnapshot.forEach(ds => true)) {
              alert("El cue ya está registrado.");
            } else {
              const USU_AVATAR = await subeArchivo(avatar, ref.key);
              await ref.set({
                USU_CUE,
                USU_AVATAR,
                PAS_ID: vista.pasatiempo.value ? vista.pasatiempo.value : null,
                ROL_IDS: getValores(vista.roles),
                USU_UPPER_CUE
              });
              document.location = "index.html";
            }
          } catch (e) {
            muestraError(e);
          }
        },
        muestraError);
  } catch (e) {
    muestraError(e);
  }
}
