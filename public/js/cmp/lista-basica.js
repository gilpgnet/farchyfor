import { eh } from "../lib/util.js";
customElements.define("lista-basica", class extends HTMLElement {
  cargando() {
    this.innerHTML = "";
    this.classList.remove("vacio");
    this.classList.add("cargando");
  }
  muestra(urlDetalle, lista) {
    if (lista.length) {
      this.classList.remove("cargando");
      this.classList.remove("vacio");
      let contenido = "";
      for (const modelo of lista) {
        contenido += "<div class='fila'>";
        if (modelo.imagen) {
          contenido += `<img class='imagen' src="${modelo.imagen}">`;
        }
        if (urlDetalle) {
          contenido +=
            `<a class='texto1' href="${urlDetalle}${eh(encodeURIComponent(modelo.id))}">
              ${eh(modelo.texto1)}
            </a>`;
        } else {
          contenido += `<span class='texto1'>${eh(modelo.texto1)}"</span>`;
        }
        if (modelo.texto2) {
          contenido += `<div class='texto2'>${eh(modelo.texto2)}</div>`;
        }
        contenido += "</div>";
      }
      this.innerHTML = contenido;
    } else {
      this.innerHTML = "";
      this.classList.remove("cargando");
      this.classList.add("vacio");
    }
  }
});