import Modal from "./Modal.js";
import VisitForm from "./visit.js";
import getCardsFromServer from "./getCardsfromServer.js";
import logOut from "./logout.js";
import modalBackground from "./modalBg.js";

const form = new VisitForm();
const createVisitBtn = document.querySelector("#create-visit-btn");
createVisitBtn.addEventListener("click", (e) => {
  if (!document.querySelector("#create-visit-form")) {
    const visitForm = form.render();
    modalBackground.add();
    document.body.prepend(visitForm);
  }
});

const logInBtn = document.querySelector(".authorization-btn");
logInBtn.addEventListener("click", (e) => {
  if (!document.querySelector("#form")) {
    new Modal().render();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.Authorization) {
    document.querySelector(".authorization-btn").style.display = "none";
    document.querySelector("#create-visit-btn").style.display = "block";
    const logout = document.querySelector("#logout");
    logout.style.display = "inline-block";
    logout.addEventListener("click", (e) => {
      logOut(e);
    });
    getCardsFromServer();
  } else {
    return;
  }
});