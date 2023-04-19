const ul = document.querySelector(".visit-wrap");
const noItem = document.querySelector(".no-item");

export default function checkCards() {
  if (ul.children.length === 0) {
    noItem.style.display = "block";
  } else {
    noItem.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkCards();
});
