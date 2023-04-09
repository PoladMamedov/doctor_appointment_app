import checkCards from "./checkCards.js";
export default function logOut(e) {
  e.preventDefault();
  localStorage.removeItem("Authorization");
  document.querySelector("#create-visit-btn").style.display = "none";
  document.querySelector("#logout").style.display = "none";
  const cards = [...document.querySelectorAll(".visit-card")];
  cards.forEach((card) => card.remove());
  document.querySelector(".authorization-btn").style.display = "block";
  checkCards();
}
