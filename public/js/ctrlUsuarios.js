import { muestraError } from "./lib/util.js";
const lista = document.querySelector("lista-basica");
lista.cargando();
firebase.database().ref("USUARIO").orderByChild("USU_UPPER_CUE").on("value",
  dataSnapshot => {
    const filas = [];
    dataSnapshot.forEach(ds => {
      const usuario = ds.val();
      const fila = {
        id: ds.key,
        imagen: usuario.USU_AVATAR,
        texto1: usuario.USU_CUE,
        texto2: usuario.ROL_IDS ? Object.keys(usuario.ROL_IDS).join(", ") : ""
      };
      filas.push(fila);
    });
    lista.muestra("usuario.html?key=", filas);
  },
  muestraError);