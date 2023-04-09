import Modal from "./Modal.js";
import VisitForm from "./visit.js";
import getCardsFromServer from "./getCardsfromServer.js";
import logOut from "./logout.js";
import {noItem, ul} from  "./constants.js";

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
  if(!document.querySelector("#form")) {
    new Modal().render();
  }
});


document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.Authorization) {
    document.querySelector(".authorization-btn").style.display = "none";
    document.querySelector("#create-visit-btn").style.display = "block";
    const logout =  document.querySelector("#logout")
    logout.style.display = "inline-block";
    logout.addEventListener("click",(e) => {
      logOut(e)
    })
    getCardsFromServer()
  } else {
    return;
  }
});




