import autorization from "./RequestLogin.js";

export default class Modal {
  constructor() {

    this.body = document.querySelector("body");
    this.form = document.createElement("form");
    this.labelEmail = document.createElement("label");
    this.inputEmail = document.createElement("input");
    this.labelPass = document.createElement("label");
    this.inputPass = document.createElement("input");
    this.submitBtn = document.createElement("button");
    this.cancelBtn = document.createElement("button");
  }
  handleClickOutsideTheForm(e, form) {
    console.log(e.target);
    if (form.contains(e.target) || e.target.classList.contains("authorization-btn")) {
      return;
    } else {
      this.window.classList.remove('active')
      this.window.remove()
      form.remove();
      document.removeEventListener("click", this.handleClickOutsideTheForm);
    }
  }
  createElement() {
    this.window = document.createElement("div");
    this.window.classList.add('modal', 'active')
    this.form.classList.add("w-50", "d-flex", "flex-column", "border", "border-primary", "rounded", "p-4", "position-absolute", "top-50", "start-50", "translate-middle", "bg-light");
    this.form.id = ("form")
    this.labelEmail.classList.add("form-label");
    this.labelEmail.setAttribute("for", "email")
    this.labelEmail.innerText = "Email address";
    this.inputEmail.classList.add("form-control");
    this.inputEmail.id = "email";
    this.labelPass.innerText = "Password";
    this.labelPass.classList.add("form-label");
    this.labelPass.setAttribute("for", "password")
    this.inputEmail.type = "email";
    this.inputPass.type = "password";
    this.inputPass.id = "password";
    this.inputPass.classList.add("form-control");
    this.submitBtn.innerText = "Войти";
    this.cancelBtn.innerText = "Отменить";
    this.submitBtn.classList.add("btn", "btn-primary", "mt-3");
    this.cancelBtn.classList.add("btn", "btn-danger", "mt-2");


    this.form.append(
      this.labelEmail,
      this.inputEmail,
      this.labelPass,
      this.inputPass,
      this.submitBtn,
      this.cancelBtn
    );
    this.window.append(this.form)
    console.log(this.cancelBtn);
    this.cancelBtn.addEventListener('click', () => {
      this.window.remove()
      this.window.classList.remove('active')
      this.form.remove()
    });

    this.submitBtn.addEventListener("click", (e) => {
      this.window.classList.remove('active')

      e.preventDefault();
      autorization(this.inputEmail.value, this.inputPass.value);
    });

    return this.window
  }

  render(selector) {
    this.createElement();
    document.addEventListener("click", (e) => {
      this.handleClickOutsideTheForm(e, this.form);
    });
    document.querySelector("body").append(this.window);
  }
}




