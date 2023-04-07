const searchInput = document.getElementById('searchInput');
const list = document.querySelector('.visit-wrap');
const selectStatus = document.querySelector('.select-options');
const selectUrgency = document.querySelector('.select-urgency');
let visitCards = document.querySelectorAll('.visit-wrap .visit-card');
const noItem = document.querySelector('.no-item')
export { searchInput, list, selectStatus, selectUrgency, visitCards, noItem }