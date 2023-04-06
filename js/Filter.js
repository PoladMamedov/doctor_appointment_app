
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



