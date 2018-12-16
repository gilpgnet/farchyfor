customElements.define("campos-usuario", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      `<p>
        <label accesskey="A">
          Avatar
          <input type="file" name="avatar" accept=".png,.jpg,.jpeg,.gif">
        </label>
        <img alt="Falta seleccionar imagen.">
      </p>
      <p>
        <label accesskey="P">
          Pasatiempo
          <select name="pasatiempo"></select>
        </label>
      </p>
      <p>
        <label accesskey="R">
          Roles
          <select name="roles" multiple></select>
        </label>
      </p>`;
  }
});