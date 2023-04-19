import Modal from "./Modal.js";
import VisitForm from "./visit.js";
import getCardsFromServer from "./getCardsfromServer.js";
import logOut from "./logout.js";
import modalBackground from "./modalBg.js";
import VisitFilters from "./filter.js";
const searchInput = document.getElementById("searchInput");
const selectStatus = document.querySelector(".select-options");
const selectUrgency = document.querySelector(".select-urgency");

const form = new VisitForm();
const createVisitBtn = document.querySelector("#create-visit-btn");
createVisitBtn.addEventListener("click", (e) => {
    const visitForm = form.render();
    modalBackground.add();
    document.body.prepend(visitForm);
});

const logInBtn = document.querySelector(".authorization-btn");
logInBtn.addEventListener("click", (e) => {
    new Modal().render();
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

const filters = new VisitFilters();
searchInput.addEventListener("input", () => {
  filters.filters.searchText = searchInput.value.toLowerCase().replace(/\s/g, "");
  filters.filters.description = searchInput.value.toLowerCase().replace(/\s/g, "");
  filters.applyFilters();
});

selectStatus.addEventListener("change", () => {
  filters.filters.status = selectStatus.value;
  filters.applyFilters();
});

selectUrgency.addEventListener("change", () => {
  filters.filters.urgency = selectUrgency.value;
  filters.applyFilters();
});
