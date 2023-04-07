
import DoctorAPIService from './doctor_api_service.js';
const request = new DoctorAPIService()
let visitCards = document.querySelectorAll('.visit-wrap .visit-card');
const list = document.querySelector('.visit-wrap');
const searchInput = document.getElementById('searchInput');
const selectStatus = document.querySelector('.select-options');
const selectUrgency = document.querySelector('.select-urgency');


function toggleHideParameters(e) {
   const wrap = e.target.closest('.visit-card').querySelector('.parameters-wrap');
   const parametersWrap = e.target.closest('.visit-card').querySelector('.hide-parameters');
   const hideAge = e.target.closest('.visit-card').querySelector('.hide-age');
   hideAge.classList.toggle('hide')
   parametersWrap.classList.toggle('hide');
   wrap.classList.toggle('hide');
}

visitCards.forEach((card) => {
   card.addEventListener('click', (e) => {
      if (e.target.classList.contains('more-btn')) {
         toggleHideParameters(e);
      }
   });
});

export default class VisitCard {
   render({ doctor, name, priority, id, age, description, purpose }) {
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
      newCard.classList.add('visit-card', 'border', 'rounded', 'border-primary-subtle', 'w-100', 'gap-1');
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
          <p class="m-2 fs-6">Описание: ${description} </p>
          <p class="m-2 fs-6">Причина обращения: ${purpose}</p>
       </div>
       <div class="btn-wrap ms-5 me-5 mb-3 d-flex justify-content-center gap-3">
          <button class="btn btn-secondary more-btn fs-6">Показать больше</button>
          <button class="btn btn-outline-primary">Редактировать</button>
       </div>
      `;

      list.appendChild(newCard);
      this.removeCard(newCard, newCard.id);


      newCard.addEventListener('click', (e) => {
         if (e.target.classList.contains('more-btn')) {
            toggleHideParameters(e);
         }
      });

      visitCards = document.querySelectorAll('.visit-wrap .visit-card');
      filters.applyFilters(visitCards);
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
      });
   }
}

class VisitFilters {
   constructor(list, visitCards) {
      this.list = list;
      this.visitCards = visitCards;
      this.filters = {
         searchText: '',
         status: '',
         urgency: '',
      };
   }

   applyFilters() {
      this.visitCards = visitCards;
      visitCards.forEach((card) => {
         const cardStatus = card.querySelector('.visit-status').textContent.trim();
         const cardUrgency = card.querySelector('.visit-urgency').textContent.trim();
         const cardName = card.querySelector('p').textContent.toLowerCase().replace(/\s/g, '');
         const isNameMatch = cardName.includes(this.filters.searchText);

         const isStatusMatch =
            this.filters.status === '' ||
            this.filters.status === 'Статус визита' ||
            this.filters.status === cardStatus;

         const isUrgencyMatch =
            this.filters.urgency === '' ||
            this.filters.urgency === 'Срочность визита' ||
            this.filters.urgency === cardUrgency;

         if (isNameMatch && isStatusMatch && isUrgencyMatch) {
            card.style.display = 'block';
         } else {
            card.style.display = 'none';
         }
      });
   }
}

const filters = new VisitFilters(list, visitCards);
searchInput.addEventListener('input', () => {
   filters.filters.searchText = searchInput.value.toLowerCase().replace(/\s/g, '');
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
