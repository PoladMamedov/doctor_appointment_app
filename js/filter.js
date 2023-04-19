
export default class VisitFilters {
   constructor() {
      this.filters = {
         searchText: '',
         description: '',
         status: '',
         urgency: '',
      };
   }

   applyFilters() {
      let visitCards = document.querySelectorAll('.visit-wrap .visit-card')
      visitCards.forEach((card) => {
         const cardStatus = card.querySelector('.visit-status').textContent.trim();
         const cardUrgency = card.querySelector('.visit-urgency').textContent.trim();
         const cardName = card.querySelector('p').textContent.toLowerCase().replace(/\s/g, '');
         const cardDescription = card.querySelector('.cardDescription').textContent.substring(9).toLowerCase().replace(/\s/g, '');
         const isNameMatch = cardName.includes(this.filters.searchText);
         const isDescriptionMatch = cardDescription.includes(this.filters.description);
         const isStatusMatch =
            this.filters.status === '' ||
            this.filters.status === 'Статус визита' ||
            this.filters.status === cardStatus;
         const isUrgencyMatch =
            this.filters.urgency === '' ||
            this.filters.urgency === 'Срочность визита' ||
            this.filters.urgency === cardUrgency;

         if ((isNameMatch || isDescriptionMatch) && isStatusMatch && isUrgencyMatch) {
            card.style.display = 'block';
         } else {
            card.style.display = 'none';
         }
      });
   }
}
