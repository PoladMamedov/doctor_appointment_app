import DoctorAPIService from "./doctor_api_service.js";
const request = new DoctorAPIService();

const searchInput = document.getElementById('searchInput');
const list = document.querySelector('.visit-wrap');
const selectStatus = document.querySelector('.select-options');
const selectUrgency = document.querySelector('.select-urgency');
let visitCards = document.querySelectorAll('.visit-wrap .visit-card');
const noItem = document.querySelector('.no-item')



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
class VisitCard {
  render({ doctor, name, priority }) {
    const newCard = document.createElement('li');
    const randomVisit = ['Open', 'Done'];
    const randomIndex = Math.floor(Math.random() * randomVisit.length);
    const randomValue = randomVisit[randomIndex];
    newCard.classList.add('visit-card', 'border', 'rounded', 'border-primary-subtle');
    newCard.innerHTML = `
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
    newCard.addEventListener('click', (e) => {
      if (e.target.classList.contains('more-btn')) {
        const wrap = e.target.closest('.visit-card').querySelector('.status-wrap');
        wrap.classList.toggle('hide')

      }
    })
    visitCards = document.querySelectorAll('.visit-wrap .visit-card');
    filters.applyFilters(visitCards);
    return list;
  }
}


export default class VisitForm {
  doctorSelect(form) {
    form.querySelector("#visit-doctor-select").addEventListener("change", (e) => {
      if (e.target.selectedIndex === 1) {
        form.remove();
        const newCardiologistForm = new VisitCardiologistForm();
        document.body.prepend(newCardiologistForm.render());
      } else if (e.target.selectedIndex === 2) {
        form.remove();
        const newDentistForm = new VisitDentistForm();
        document.body.prepend(newDentistForm.render());
      } else if (e.target.selectedIndex === 3) {
        form.remove();
        const newTherapistForm = new VisitTherapistForm();
        document.body.prepend(newTherapistForm.render());
      }
    });
  }
  handleClickOutsideTheForm(e, form) {
    if (
      form.contains(e.target) ||
      e.target.id === "create-visit-btn"
    ) {
      return;
    } else {
      form.remove();
      document.body.removeEventListener("click", this.handleClickOutsideTheForm);
    }
  }
  render() {
    const newVisitForm = document.createElement("form");
    newVisitForm.classList.add(
      "w-75",
      "d-flex",
      "flex-column",
      "border",
      "border-primary",
      "rounded",
      "p-4",
      "position-absolute",
      "top-50",
      "start-50",
      "translate-middle",
      "bg-light",
      "z-3"
    );
    newVisitForm.innerHTML =
      `<label class="form-label">Заповніть форму:</label>
    <select id="visit-doctor-select" class="form-select mb-2">
       <option selected disabled>Оберіть лікаря:</option>
       <option>Кардіолог</option>
       <option>Стоматолог</option>
       <option>Терапевт</option>
    </select>
    <input required id="fio" placeholder="П.І.Б." type="text" class="form-control mb-2">
    <input required id="visit-purpose" placeholder="Ціль візиту" type="text" class="form-control mb-2">
    <input required id="decription" placeholder="Опис" type="text" class="form-control mb-2">
    <select id="priority-select" class="form-select mb-2">
       <option selected disabled>Терміновість:</option>
       <option>Звичайна</option>
       <option>Пріоритетна</option>
       <option>Невідкладна</option>
    </select>
    <button id="visit-submit-btn" type="submit" class="btn btn-primary">Створити запис</button>
    <button id="visit-cancel-btn" type="button" class="btn btn-danger mt-2">Скасувати</button>`;

    this.doctorSelect(newVisitForm);

    newVisitForm.querySelector("#visit-submit-btn").addEventListener("click", (e) => {
      e.preventDefault();
    });

    newVisitForm.querySelector("#visit-cancel-btn").addEventListener("click", (e) => {
      newVisitForm.remove();
    });

    document.body.addEventListener("click", (e) => {
      this.handleClickOutsideTheForm(e, newVisitForm)
    });

    return newVisitForm;
  }
}

class VisitCardiologistForm extends VisitForm {
  createCardiolojistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      priority: form.querySelector("#priority-select").value,
      pressure: form.querySelector("#pressure").value,
      massIndex: form.querySelector("#mass-index").value,
      heartDiseases: form.querySelector("#heart-diseases").value,
      age: form.querySelector("#age").value,
    }
  }
  render() {
    const newCardiologistVisitForm = super.render();
    const additionalInfo =
      `<input required id="pressure" placeholder="Звичайний тиск" type="text" class="form-control mb-2">
   <input required id="mass-index" placeholder="індекс маси тіла" type="text" class="form-control mb-2">
   <input required id="heart-diseases" placeholder="Перенесені захворювання серцево-судинної системи" type="text" class="form-control mb-2">
   <input required id="age" placeholder="вік" type="text" class="form-control mb-2">`;
    newCardiologistVisitForm.querySelector("#priority-select").insertAdjacentHTML("afterend", additionalInfo);
    newCardiologistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 1;
    newCardiologistVisitForm.querySelector("#visit-submit-btn").addEventListener("click", async (e) => {
      // ! добавление на сервер, дата это вернувшийся обьект с айди
      const data = await request.postCard(localStorage.Authorization, this.createCardiolojistObj(newCardiologistVisitForm))
      const card = new VisitCard()
      card.render(data)
      noItem.remove()
      // ! вот тут нужно вызвать функцию создающую карточку, передать в нее дату

      // ! после добавления карточки закрываем форму
      newCardiologistVisitForm.remove()
    });
    return newCardiologistVisitForm;
  }
}

class VisitDentistForm extends VisitForm {
  createDentistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      priority: form.querySelector("#priority-select").value,
      lastDate: form.querySelector("#last-visit").value,
    }
  }
  render() {
    const newDentistVisitForm = super.render();
    const additionalInfo = `<input required id="last-visit" placeholder="дата останнього візиту" type="text" class="form-control mb-2">`;
    newDentistVisitForm.querySelector("#priority-select").insertAdjacentHTML("afterend", additionalInfo);
    newDentistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 2;
    newDentistVisitForm.querySelector("#visit-submit-btn").addEventListener("click", async (e) => {
      // ! добавление на сервер, дата это вернувшийся обьект с айди
      const data = await request.postCard(localStorage.Authorization, this.createDentistObj(newDentistVisitForm))

      // ! вот тут нужно вызвать функцию создающую карточку, передать в нее дату
      const card = new VisitCard()
      card.render(data)
      noItem.remove()

      // ! после добавления карточки закрываем форму
      newDentistVisitForm.remove()
    });
    return newDentistVisitForm;
  }
}

class VisitTherapistForm extends VisitForm {
  createTherapistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      priority: form.querySelector("#priority-select").value,
      age: form.querySelector("#age").value,
    }
  }
  render() {
    const newTherapistVisitForm = super.render();
    const additionalInfo = `<input required id="age" placeholder="вік" type="text" class="form-control mb-2">`;
    newTherapistVisitForm.querySelector("#priority-select").insertAdjacentHTML("afterend", additionalInfo);
    newTherapistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 3;
    newTherapistVisitForm.querySelector("#visit-submit-btn").addEventListener("click", async (e) => {
      // ! добавление на сервер, дата это вернувшийся обьект с айди
      const data = await request.postCard(localStorage.Authorization, this.createTherapistObj(newTherapistVisitForm))
      const card = new VisitCard()
      card.render(data)
      noItem.remove()

      // ! вот тут нужно вызвать функцию создающую карточку, передать в нее дату

      // ! после добавления карточки закрываем форму
      newTherapistVisitForm.remove()
    });
    return newTherapistVisitForm;
  }
}


