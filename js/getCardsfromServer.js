import { VisitCardCardio } from "./cardRender.js";
import { VisitCardDantist } from "./cardRender.js";
import VisitCard from "./cardRender.js";

const checkDoctor = (doctor, element) => {

  if (doctor === "Кардиолог") {
    const newCard = new VisitCardCardio();
    newCard.render(element);
  } else if (doctor === "Стоматолог") {
    const newCard = new VisitCardDantist();
    newCard.render(element);
  } else {
    const newCard = new VisitCard();
    newCard.render(element);
  }
};


const getCardsFromServer = async () => {
  const getCards = await fetch("https://ajax.test-danit.com/api/v2/cards/", {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
    },
  }).then((res) => res.text()
  );

  JSON.parse(getCards).forEach((element) => {
    const { doctor } = element;
    checkDoctor(doctor, element);
  });

  if([...document.querySelectorAll(".visit-card")].length){
    document.querySelector(".no-item").style.display = "none";
  }

}
export default getCardsFromServer;
