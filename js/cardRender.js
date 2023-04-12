import DoctorAPIService from './doctor_api_service.js';
import toggleHideParameters from './HideParameters.js';
import checkCards from './checkCards.js';
import ageName from './ageName.js';
import VisitFilters from './filter.js';
import { VisitTherapistForm, VisitCardiologistForm, VisitDentistForm } from './visit.js';
const request = new DoctorAPIService();
const list = document.querySelector('.visit-wrap');
const searchInput = document.getElementById('searchInput');
const selectStatus = document.querySelector('.select-options');
const selectUrgency = document.querySelector('.select-urgency');

export default class VisitCard {
   render(data, addToList = true) {
      let { doctor, name, priority, id, age, description, purpose } = data;

      age = ageName(age)

      const newCard = document.createElement('li');
      const randomVisit = ['Open', 'Done'];
      const randomIndex = Math.floor(Math.random() * randomVisit.length);
      const randomValue = randomVisit[randomIndex];
      newCard.classList.add('visit-card', 'border', 'rounded', 'border-primary-subtle', 'w-100', 'gap-1', 'bg-info-subtle');
      newCard.id = id;
      const divClose = document.createElement('div');
      divClose.classList.add('closeModal');
      newCard.prepend(divClose);
      newCard.innerHTML = `
       <div class="closeModal"></div>
       <p class="patient-name text-center fs-4 mt-2">${name}
       <span class="m-0 p-0 fs-5 hide-age hide">${age}</span>
       </p>
       <p class="patient-doctor text-center fs-5 mt-0">${doctor}</p>
       <div class="parameters-wrap m-0 p-0  hide">
          <p class="visit-status visit-text  fs-6">${randomValue}</p>
          <p class="visit-urgency visit-text fs-6">${priority}</p>
       </div>
       <div class="hide-parameters hide"> 
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


      newCard.addEventListener('click', (e) => {
         if (e.target.classList.contains('more-btn')) {
            toggleHideParameters(e);
         } else if (e.target.classList.contains('edit-btn')) {
            if (!document.querySelector("#create-visit-form")) {
               // !рендер модалки редактирования терапевт
               const newTherapistForm = new VisitTherapistForm();
               document.body.prepend(newTherapistForm.render(newCard, true));
            }
         }
      });


      filters.applyFilters();
      return newCard;
   }

   removeCard(card, cardId) {
      const closeModal = card.querySelector('.closeModal');
      closeModal.addEventListener('click', async () => {
         const delRequest = await request.deleteCard(localStorage.Authorization, cardId);
         if (delRequest.ok) {
            card.remove();
         } else {
            throw new Error('Ошибка запроса на сервер');
         }
         checkCards();
      });
   }
}

export class VisitCardDantist extends VisitCard {
   render(data, addToList = true) {
      let { doctor, name, priority, id, description, purpose, lastDate } = data;

      if (priority === 'Звичайна') {
         priority = 'Low';
      }
      if (priority === 'Пріоритетна') {
         priority = 'Normal';
      }
      if (priority === 'Невідкладна') {
         priority = 'High';
      }
      const newCard = document.createElement('li');
      const randomVisit = ['Open', 'Done'];
      const randomIndex = Math.floor(Math.random() * randomVisit.length);
      const randomValue = randomVisit[randomIndex];
      newCard.classList.add('visit-card', 'border', 'rounded', 'border-primary-subtle', 'w-100', 'gap-1', 'bg-primary', 'bg-opacity-25');
      newCard.id = id;
      const divClose = document.createElement('div');
      divClose.classList.add('closeModal');
      newCard.prepend(divClose);
      newCard.innerHTML = `
       <div class="closeModal"></div>
       <p class="patient-name text-center fs-4 mt-2">${name}
       <span class="m-0 p-0 fs-5 hide-age hide"></span></p>
       <p class="patient-doctor text-center fs-5 mt-0">${doctor}</p>
       <div class="parameters-wrap m-0 p-0  hide">
          <p class="visit-status visit-text fs-6">${randomValue}</p>
          <p class="visit-urgency visit-text fs-6">${priority}</p>
       </div>
       <div class="hide-parameters hide"> 
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


      newCard.addEventListener('click', (e) => {
         if (e.target.classList.contains('more-btn')) {
            toggleHideParameters(e);
         } else if (e.target.classList.contains('edit-btn')) {
            // !рендер модалки редактирования стоматолог
            const newDentistForm = new VisitDentistForm();
            document.body.prepend(newDentistForm.render(newCard, true));
         }
      });


      filters.applyFilters();
      return newCard;
   }

}


export class VisitCardCardio extends VisitCard {
   render(data, addToList = true) {
      let { doctor, name, priority, id, age, description, purpose, massIndex, pressure, heartDiseases
      } = data;
      age = ageName(age)
      const newCard = document.createElement('li');
      const randomVisit = ['Open', 'Done'];
      const randomIndex = Math.floor(Math.random() * randomVisit.length);
      const randomValue = randomVisit[randomIndex];
      newCard.classList.add('visit-card', 'border', 'rounded', 'border-primary-subtle', 'w-100', 'gap-1', 'bg-info', 'bg-opacity-25');

      newCard.id = id;
      const divClose = document.createElement('div');
      divClose.classList.add('closeModal');
      newCard.prepend(divClose);
      newCard.innerHTML = `
       <div class="closeModal"></div>
       <p class="patient-name text-center fs-4 mt-2">${name}
       <span class="m-0 p-0 fs-5 hide-age hide">${age}</span>
       </p>
       <p class="patient-doctor text-center fs-5 mt-0">${doctor}</p>
       <div class="parameters-wrap m-0 p-0  hide">
          <p class="visit-status visit-text fs-6">${randomValue}</p>
          <p class="visit-urgency visit-text fs-6">${priority}</p>
       </div>
       <div class="hide-parameters hide"> 
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


      newCard.addEventListener('click', (e) => {
         if (e.target.classList.contains('more-btn')) {
            toggleHideParameters(e);
         } else if (e.target.classList.contains('edit-btn')) {
            // !рендер модалки редактирования кардиолог
            const newCardiologistForm = new VisitCardiologistForm();
            document.body.prepend(newCardiologistForm.render(newCard, true));
         }
      });

      filters.applyFilters();
      return newCard;
   }
}


const filters = new VisitFilters();
searchInput.addEventListener('input', () => {
   filters.filters.searchText = searchInput.value.toLowerCase().replace(/\s/g, '');
   filters.filters.description = searchInput.value.toLowerCase().replace(/\s/g, '');
   filters.applyFilters();
});

selectStatus.addEventListener('change', () => {
   filters.filters.status = selectStatus.value;
   filters.applyFilters();
});

selectUrgency.addEventListener('change', () => {
   filters.filters.urgency = selectUrgency.value;
   filters.applyFilters();
});
