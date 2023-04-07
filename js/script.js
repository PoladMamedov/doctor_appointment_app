import Modal from "./Modal.js";
import VisitForm from "./visit.js";

const form = new VisitForm();
const createVisitBtn = document.querySelector("#create-visit-btn");
createVisitBtn.addEventListener("click", (e) => {
  const visitForm = form.render();
  document.body.prepend(visitForm);
});

const btn = document.querySelector(".authorization-btn");
btn.addEventListener("click", (e) => {
  new Modal().render();
});
