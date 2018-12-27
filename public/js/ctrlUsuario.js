import { seleccion, texto, muestraError, archivoSeleccionado, agregaOpciones, muestraArchivoSeleccionado, getValores, subeArchivo }
  from "./lib/util.js";
const parametros = new URLSearchParams(location.search);
const key = parametros.get("key");
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
vista.elimina.addEventListener("click", elimina);
/* Cuando cambia el el archivo seleccionado por el usuario, se invoca la
 * función muestraArchivoSeleccionado. */
avatar.addEventListener("change", muestraArchivoSeleccionado.bind(null, img));
firebase.database().ref("USUARIO").child(key).once("value",
  dataSnapshot => {
    if (dataSnapshot.exists) {
      const modelo = dataSnapshot.val();
      const USU_CUE = texto(modelo.USU_CUE);
      document.title = USU_CUE;
      vista.titulo.value = USU_CUE;
      document.querySelector("img").src = texto(modelo.USU_AVATAR);
      firebase.database().ref("PASATIEMPO").orderByChild("PAS_UPPER_NOMBRE").once("value",
        dataSnapshot => {
          const filas = [{ id: "", texto: "Sin pasatiempo" }];
          dataSnapshot.forEach(ds => { filas.push({ id: ds.key, texto: ds.val().PAS_NOMBRE }); });
          agregaOpciones(vista.pasatiempo, seleccion(modelo.PAS_ID), filas);
        },
        muestraError);
      firebase.database().ref("ROL").orderByChild("ROL_UPPER_ID").once("value",
        dataSnapshot => {
          const filas = [];
          dataSnapshot.forEach(ds => {
            filas.push({ id: ds.key, texto: ds.key + ": " + ds.val().ROL_DESCRIPCION });
          });
          agregaOpciones(vista.roles, modelo.ROL_IDS, filas);
        },
        muestraError);
    } else {
      alert("Usuario no encontrado.");
      document.location = "index.html";
    }
  },
  muestraError);
async function guarda(evt) {
  try {
    evt.preventDefault();
    const cambios = {
      PAS_ID: vista.pasatiempo.value ? null : vista.pasatiempo.value,
      ROL_IDS: getValores(vista.roles)
    }
    if (archivoSeleccionado(avatar)) {
      cambios.USU_AVATAR = await subeArchivo(avatar, key);
    }
    await firebase.database().ref("USUARIO").child(key).update(cambios);
    document.location = "index.html";
  } catch (e) {
    muestraError(e);
  }
}
async function elimina(evt) {
  try {
    if (confirm("Confirma la eliminación.\nPerderás los datos.")) {
      await firebase.database().ref("USUARIO").child(key).remove();
      // Se elimina el archivo del servicio storage de Firebase.
      delete firebase.storage().ref(key).delete()
      document.location = "index.html";
    }
  } catch (e) {
    muestraError(e);
  }
}