import { list } from './constants.js';
import { filters } from './Filter.js';
import DoctorAPIService from './doctor_api_service.js';
const request = new DoctorAPIService()
let visitCards = document.querySelectorAll('.visit-wrap .visit-card');

export default class VisitCard {
   render({ doctor, name, priority, id }) {
      const newCard = document.createElement('li');
      const randomVisit = ['Open', 'Done'];
      const randomIndex = Math.floor(Math.random() * randomVisit.length);
      const randomValue = randomVisit[randomIndex];
      newCard.classList.add('visit-card', 'border', 'rounded', 'border-primary-subtle');
      newCard.id = id;
      const divClose = document.createElement('div');
      divClose.classList.add('closeModal');
      newCard.prepend(divClose);
      newCard.innerHTML = `
       <div class="closeModal"></div>
       <p class="patient-name text-center fs-5 mt-3"> ${name} </p>
       <p class="patient-doctor text-center fs-5"> ${doctor} </p>
       <div class="status-wrap hide">
         <p class="visit-status visit-text">${randomValue}</p>
         <p class="visit-urgency visit-text"> ${priority} </p>
       </div>
       <div class="btn-wrap ms-5 me-5 mb-3">
         <button class="btn btn-secondary more-btn fs-6">Показать больше</button>
         <button class="btn btn-outline-primary">Редактировать</button>
       </div>
     `;

      list.appendChild(newCard);
      this.removeCard(newCard, newCard.id);
      newCard.addEventListener('click', (e) => {
         if (e.target.classList.contains('more-btn')) {
            const wrap = e.target.closest('.visit-card').querySelector('.status-wrap');
            wrap.classList.toggle('hide')

         }
      })
      visitCards = document.querySelectorAll('.visit-wrap .visit-card');
      filters.applyFilters(visitCards);
      return newCard;
   }
   removeCard(card, cardId) {
      const closeModal = card.querySelector('.closeModal');
      closeModal.addEventListener('click', async () => {
         const delRequest = await request.deleteCard(localStorage.Authorization, cardId)
         if (delRequest.ok) {
            card.remove();
         } else {
            throw new Error('Ошибка запроса на сервер')
         }
      });
   }
}