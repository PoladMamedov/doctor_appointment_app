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
logInBtn.addEventListener("click", (e) => {
  new Modal().render();
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
