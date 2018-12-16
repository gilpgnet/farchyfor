customElements.define("herramientas-detalle", class extends HTMLElement {
  connectedCallback() {
    const regreso = this.hasAttribute("regreso") ? this.getAttribute("regreso") : "index.html";
    let contenido =
      `<a accesskey="C" href="${regreso}">Cancelar</a>
      <input type="submit" accesskey="G" value="Guardar">`;
    if (!this.hasAttribute("agrega")) {
      contenido +=
        `<input name="elimina" type="button" accesskey="E" value="Eliminar">`;
    }
    this.innerHTML = contenido;
  }
});