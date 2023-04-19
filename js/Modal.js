import autorization from "./RequestLogin.js";
import modalBackground from "./modalBg.js";

export default class Modal {
  constructor() {
    this.form = document.createElement("form");
  }
  loginHandler(e) {
    e.preventDefault();
    const email = this.form.querySelector("#email").value;
    const password = this.form.querySelector("#password").value;
    autorization(email, password);
  }
  createElement() {
    this.form.classList.add(
      "w-50",
      "d-flex",
      "flex-column",
      "border",
      "border-primary",
      "rounded",
      "p-4",
      "position-absolute",
      "top-50",
      "start-50",
      "translate-middle",
      "bg-light",
      "z-3"
    );
    this.form.id = "form";

    this.form.innerHTML = `<label class="form-label" for="email">Email address</label>
    <input class="form-control" id="email" type="email">
    <label class="form-label" for="password">Password</label>
    <input type="password" id="password" class="form-control">
    <button class="btn btn-primary mt-3">Войти</button>
    <button class="cancel-btn btn btn-danger mt-2">Отменить</button>`;

    this.form.querySelector(".cancel-btn").addEventListener("click", () => {
      this.form.remove();
      modalBackground.remove();
    });

    this.form.addEventListener("submit", (e) => {
      this.loginHandler(e);
    });
  }

  render() {
    this.createElement();
    modalBackground.add(this.form);
    document.body.append(this.form);
  }
}
