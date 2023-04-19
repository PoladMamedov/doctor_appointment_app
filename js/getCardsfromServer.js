import VisitCardTherapist, { VisitCardDantist, VisitCardCardio } from "./cardRender.js";
import DoctorAPIService from "./doctor_api_service.js";
const request = new DoctorAPIService();

const checkDoctor = (doctor, element) => {
  if (doctor === "Кардиолог") {
    const newCard = new VisitCardCardio();
    newCard.render(element);
  } else if (doctor === "Стоматолог") {
    const newCard = new VisitCardDantist();
    newCard.render(element);
  } else {
    const newCard = new VisitCardTherapist();
    newCard.render(element);
  }
};

const getCardsFromServer = async () => {
  const cards = await request.getAllCards(localStorage.getItem("Authorization"));

  cards.forEach((element) => {
    const { doctor } = element;
    checkDoctor(doctor, element);
  });

  if ([...document.querySelectorAll(".visit-card")].length) {
    document.querySelector(".no-item").style.display = "none";
  }
};

export default getCardsFromServer;
