// const searchInput = document.getElementById('searchInput');
// const list = document.querySelector('.visit-wrap');
// const selectStatus = document.querySelector('.select-options');
// const selectUrgency = document.querySelector('.select-urgency');
// const visitCards = document.querySelectorAll('.visit-wrap .visit-card');
// const moreBtn = document.querySelectorAll('.more-btn ');
// const statusWrap = document.querySelectorAll('.status-wrap ');
// const defaultStatus = 'Статус визита';
// const defaultUrgency = 'Срочность визита';

// const filters = {
//    searchText: '',
//    status: defaultStatus,
//    urgency: defaultUrgency
// };

// searchInput.addEventListener('input', function () {
//    filters.searchText = searchInput.value.toLowerCase().replace(/\s/g, '');
//    applyFilters();
// });

// selectStatus.addEventListener('change', function () {
//    filters.status = selectStatus.value;
//    applyFilters();
// });

// selectUrgency.addEventListener('change', function () {
//    filters.urgency = selectUrgency.value;
//    applyFilters();
// });

// function applyFilters() {
//    visitCards.forEach(function (card) {
//       const cardStatus = card.querySelector('.visit-status').textContent.trim();
//       const cardUrgency = card.querySelector('.visit-urgency').textContent.trim();
//       const cardName = card.querySelector('p').textContent.toLowerCase().replace(/\s/g, '');

//       const isNameMatch = cardName.includes(filters.searchText);

//       const isStatusMatch = filters.status === defaultStatus || filters.status === '' || filters.status === cardStatus;


//       const isUrgencyMatch = filters.urgency === defaultUrgency || filters.urgency === '' || filters.urgency === cardUrgency;

//       if (isNameMatch && isStatusMatch && isUrgencyMatch) {
//          card.style.display = 'block';
//       } else {
//          card.style.display = 'none';
//       }
//    });
// }

//  Classes Filter
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
      this.visitCards.forEach((card) => {
         const cardStatus = card.querySelector('.visit-status').textContent.trim();
         const cardUrgency = card.querySelector('.visit-urgency').textContent.trim();
         const cardName = card.querySelector('p').textContent.toLowerCase().replace(/\s/g, '');
         const isNameMatch = cardName.includes(this.filters.searchText);

         const isStatusMatch =
            this.filters.status === '' ||
            this.filters.status === cardStatus;

         const isUrgencyMatch =
            this.filters.urgency === '' ||
            this.filters.urgency === cardUrgency;

         if (isNameMatch && isStatusMatch && isUrgencyMatch) {
            card.style.display = 'block';
         } else {
            card.style.display = 'none';
         }
      });
   }
}

const searchInput = document.getElementById('searchInput');
const list = document.querySelector('.visit-wrap');
const selectStatus = document.querySelector('.select-options');
const selectUrgency = document.querySelector('.select-urgency');
const visitCards = document.querySelectorAll('.visit-wrap .visit-card');

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
