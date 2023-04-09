
export default function cardBackground(doctor, card) {
   if (doctor === 'Кардіолог') {
      card.classList.add('bg-info', 'bg-opacity-25')
   }
   if (doctor === 'Стоматолог') {
      card.classList.add('bg-primary', 'bg-opacity-25')

   } if (doctor === 'Терапевт') {
      card.classList.add('bg-info-subtle')
   }
}