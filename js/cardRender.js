import DoctorAPIService from "./doctor_api_service.js";
import toggleHideParameters from "./HideParameters.js";
import checkCards from "./checkCards.js";
import ageName from "./ageName.js";
import VisitFilters from "./filter.js";
import checkDate from "./checkVisitDate.js";
import { VisitTherapistForm, VisitCardiologistForm, VisitDentistForm } from "./visit.js";
const request = new DoctorAPIService();
const list = document.querySelector(".visit-wrap");

export default class VisitCardTherapist {
  render(data, addToList = true) {
    let { doctor, name, priority, id, age, description, date, purpose } = data;
    age = ageName(age);
    const newCard = document.createElement("li");
    newCard.classList.add(
      "visit-card",
      "border",
      "rounded",
      "border-primary-subtle",
      "w-100",
      "gap-1",
      "bg-info-subtle"
    );
    newCard.id = id;
    const divClose = document.createElement("div");
    divClose.classList.add("closeModal");
    newCard.prepend(divClose);
    newCard.innerHTML = `
       <div class="closeModal"></div>
       <p class="patient-name text-center fs-4 mt-2">${name}
       <span class="m-0 p-0 fs-5 hide-age hide">${age}</span>
       </p>
       <p class="patient-doctor text-center fs-5 mt-0">${doctor}</p>
       <div class="parameters-wrap m-0 p-0  hide">
          <p class="visit-status visit-text  fs-6">${checkDate(date)}</p>
          <p class="visit-urgency visit-text fs-6">${priority}</p>
       </div>
       <div class="hide-parameters hide"> 
          <p class="m-2 fs-6">Дата визита: ${date}</p>   
          <p class="m-2 fs-6 cardDescription">Описание: ${description} </p>
          <p class="m-2 fs-6">Причина обращения: ${purpose}</p>
       </div>
       <div class="btn-wrap ms-5 me-5 mb-3 d-flex justify-content-center gap-3">
          <button class="btn btn-secondary more-btn fs-6">Показать больше</button>
          <button class="btn btn-outline-primary edit-btn">Редактировать</button>
       </div>
      `;
    if (addToList) {
      list.appendChild(newCard);
    }
    this.removeCard(newCard, newCard.id);
    this.addCardListener(newCard);
    filters.applyFilters();
    return newCard;
  }

  removeCard(card, cardId) {
    const closeModal = card.querySelector(".closeModal");
    closeModal.addEventListener("click", async () => {
      const delRequest = await request.deleteCard(localStorage.Authorization, cardId);
      if (delRequest.ok) {
        card.remove();
      } else {
        throw new Error("Ошибка запроса на сервер");
      }
      checkCards();
    });
  }

  addCardListener(card) {
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("more-btn")) {
        toggleHideParameters(e);
      } else if (e.target.classList.contains("edit-btn") && !document.querySelector("#create-visit-form")) {
        const newTherapistForm = new VisitTherapistForm();
        card.prepend(newTherapistForm.render(card, true));
      }
    });
  }
}

export class VisitCardDantist extends VisitCardTherapist {
  render(data, addToList = true) {
    let { doctor, name, priority, id, description, date, purpose, lastDate } = data;
    const newCard = document.createElement("li");
    newCard.classList.add(
      "visit-card",
      "border",
      "rounded",
      "border-primary-subtle",
      "w-100",
      "gap-1",
      "bg-primary",
      "bg-opacity-25"
    );
    newCard.id = id;
    const divClose = document.createElement("div");
    divClose.classList.add("closeModal");
    newCard.prepend(divClose);
    newCard.innerHTML = `
       <div class="closeModal"></div>
       <p class="patient-name text-center fs-4 mt-2">${name}
       <span class="m-0 p-0 fs-5 hide-age hide"></span></p>
       <p class="patient-doctor text-center fs-5 mt-0">${doctor}</p>
       <div class="parameters-wrap m-0 p-0  hide">
          <p class="visit-status visit-text fs-6">${checkDate(date)}</p>
          <p class="visit-urgency visit-text fs-6">${priority}</p>
       </div>
       <div class="hide-parameters hide"> 
          <p class="m-2 fs-6">Дата визита: ${date}</p>   
          <p class="m-2 fs-6 cardDescription">Описание: ${description} </p>
          <p class="m-2 fs-6">Причина обращения: ${purpose}</p>
          <p class="m-2 fs-6">Дата последнего визита: ${lastDate} </p>
       </div>
       <div class="btn-wrap ms-5 me-5 mb-3 d-flex justify-content-center gap-3">
          <button class="btn btn-secondary more-btn fs-6">Показать больше</button>
          <button class="btn btn-outline-primary edit-btn">Редактировать</button>
       </div>
      `;
    if (addToList) {
      list.appendChild(newCard);
    }
    this.removeCard(newCard, newCard.id);
    this.addCardListener(newCard);

    filters.applyFilters();
    return newCard;
  }
  addCardListener(card) {
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("more-btn")) {
        toggleHideParameters(e);
      } else if (e.target.classList.contains("edit-btn") && !document.querySelector("#create-visit-form")) {
        const newDantistForm = new VisitDentistForm();
        card.prepend(newDantistForm.render(card, true));
      }
    });
  }
}
export class VisitCardCardio extends VisitCardTherapist {
  render(data, addToList = true) {
    let { doctor, name, priority, id, age, description, date, purpose, massIndex, pressure, heartDiseases } = data;
    age = ageName(age);
    const newCard = document.createElement("li");
    newCard.classList.add(
      "visit-card",
      "border",
      "rounded",
      "border-primary-subtle",
      "w-100",
      "gap-1",
      "bg-info",
      "bg-opacity-25"
    );
    newCard.id = id;
    const divClose = document.createElement("div");
    divClose.classList.add("closeModal");
    newCard.prepend(divClose);
    newCard.innerHTML = `
       <div class="closeModal"></div>
       <p class="patient-name text-center fs-4 mt-2">${name}
       <span class="m-0 p-0 fs-5 hide-age hide">${age}</span>
       </p>
       <p class="patient-doctor text-center fs-5 mt-0">${doctor}</p>
       <div class="parameters-wrap m-0 p-0  hide">
          <p class="visit-status visit-text fs-6">${checkDate(date)}</p>
          <p class="visit-urgency visit-text fs-6">${priority}</p>
       </div>
       <div class="hide-parameters hide"> 
          <p class="m-2 fs-6">Дата визита: ${date}</p>   
          <p class="m-2 fs-6 cardDescription">Описание: ${description} </p>
          <p class="m-2 fs-6">Причина обращения: ${purpose}</p>
          <p class="m-2 fs-6">Индекс массы тела: ${massIndex} </p>
          <p class="m-2 fs-6">Среднее давление: ${pressure} </p>
          <p class="m-2 fs-6">Перенесенные болезни: ${heartDiseases} </p>
       </div>
       <div class="btn-wrap ms-5 me-5 mb-3 d-flex justify-content-center gap-3">
          <button class="btn btn-secondary more-btn fs-6">Показать больше</button>
          <button class="btn btn-outline-primary edit-btn">Редактировать</button>
       </div>
      `;
    if (addToList) {
      list.appendChild(newCard);
    }
    this.removeCard(newCard, newCard.id);
    this.addCardListener(newCard);

    filters.applyFilters();
    return newCard;
  }
  addCardListener(card) {
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("more-btn")) {
        toggleHideParameters(e);
      } else if (e.target.classList.contains("edit-btn") && !document.querySelector("#create-visit-form")) {
        const newCardioForm = new VisitCardiologistForm();
        card.prepend(newCardioForm.render(card, true));
      }
    });
  }
}

const filters = new VisitFilters();
