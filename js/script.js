import Modal from "./Modal.js";
import VisitForm from "./visit.js";
import getCardsFromServer from "./getCardsfromServer.js";


const form = new VisitForm();
const createVisitBtn = document.querySelector("#create-visit-btn");
createVisitBtn.addEventListener("click", (e) => {
  if (document.body.contains(document.querySelector("#create-visit-form"))) {
    return;
  } else {
    const visitForm = form.render();
    document.body.prepend(visitForm);
  }
});

const logInBtn = document.querySelector(".authorization-btn");

var modalOpen = false;

logInBtn.addEventListener("click", (e) => {
  if (!modalOpen) { // перевірка, чи відкрите модальне вікно
    modalOpen = true; // оновлення змінної
    new Modal().render();
  }
});

cancelBtn.addEventListener('click', (e) => {
  this.form.remove()
});


document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.Authorization) {
    document.querySelector(".authorization-btn").remove();
    document.querySelector("#create-visit-btn").style.display = "block";

    getCardsFromServer()
  } else {
    return;
  }
});
