import DoctorAPIService from "./doctor_api_service.js";
import checkCards from "./checkCards.js";
import VisitCard from "./cardRender.js";
import { VisitCardDantist } from "./cardRender.js";
import { VisitCardCardio } from "./cardRender.js";
import { VisitFilters } from "./cardRender.js";
const request = new DoctorAPIService();
const visitList = document.querySelector(".visit-wrap");



//! Главный класс для формы создания карточки, создает все поля которые есть у всех врачей
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
    if (form.contains(e.target) || e.target.id === "create-visit-btn" || e.target.classList.contains("edit-btn")) {
      return;
    } else {
      form.remove();
      document.removeEventListener("click", this.handleClickOutsideTheForm);
    }
  }
  render() {
    const newVisitForm = document.createElement("form");
    newVisitForm.id = "create-visit-form";
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
    newVisitForm.innerHTML = `<label class="form-label">Заповніть форму:</label> 
    <select id="visit-doctor-select" class="form-select mb-2">
       <option selected disabled>Оберіть лікаря:</option>
       <option>Кардіолог</option>
       <option>Стоматолог</option>
       <option>Терапевт</option>
    </select>
    <input required id="fio" placeholder="П.І.Б." type="text" class="form-control mb-2">
    <input required id="visit-purpose" placeholder="Ціль візиту" type="text" class="form-control mb-2">
    <input id="decription" placeholder="Опис" type="text" class="form-control mb-2">

    <div id="priority-select-wrapper" class="form-floating mb-2">
      <select id="priority-select" class="form-select">
        <option selected>Обычная</option>
        <option>Приоритетная</option>
        <option>Неотложная</option>
      </select>
      <label for="floatingSelect">Терміновість:</label>
    </div>

    <button id="visit-submit-btn" type="submit" class="btn btn-primary">Создать запись</button>
    <button id="visit-cancel-btn" type="button" class="btn btn-danger mt-2">
    Отменить</button>`;

    this.doctorSelect(newVisitForm);

    newVisitForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    newVisitForm.querySelector("#visit-cancel-btn").addEventListener("click", (e) => {
      newVisitForm.remove();
    });

    document.addEventListener("click", (e) => {
      this.handleClickOutsideTheForm(e, newVisitForm);
    });

    return newVisitForm;
  }
}

// ! клас для кардиолога, дочерний клас основного класа. заменяет главную форму на форму нужного врача, а также обрабатывает запрос на добавление на сервер, и создание карточки
export class VisitCardiologistForm extends VisitForm {
  createCardiologistObj(form) {
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
    };
  }
  render(oldCard, edit = false) {
    const newCardiologistVisitForm = super.render();
    const additionalInfo = `<input required id="pressure" placeholder="Звичайний тиск" type="text" class="form-control mb-2">
   <input required id="mass-index" placeholder="Індекс маси тіла" type="text" class="form-control mb-2">
   <input required id="heart-diseases" placeholder="Перенесені захворювання серцево-судинної системи" type="text" class="form-control mb-2">
   <input required id="age" placeholder="Вік" type="text" class="form-control mb-2">`;
    newCardiologistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newCardiologistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 1;
    if (edit) {
      const editingCardInfo = request.getCard(localStorage.Authorization, oldCard.id)
      editingCardInfo.then(data => {
        newCardiologistVisitForm.querySelector("#fio").value = data.name;
        newCardiologistVisitForm.querySelector("#visit-purpose").value = data.purpose;
        newCardiologistVisitForm.querySelector("#decription").value = data.description;
        newCardiologistVisitForm.querySelector("#age").value = data.age
        newCardiologistVisitForm.querySelector("#pressure").value = data.pressure
        newCardiologistVisitForm.querySelector("#mass-index").value = data.massIndex
        newCardiologistVisitForm.querySelector("#heart-diseases").value = data.heartDiseases
        newCardiologistVisitForm.querySelector("#visit-doctor-select").setAttribute("disabled", "true");
      })
    }
    newCardiologistVisitForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const card = new VisitCardCardio();
      if (edit) {
        const data = await request.updateCard(localStorage.Authorization, oldCard.id, this.createCardiologistObj(newCardiologistVisitForm));
        visitList.replaceChild(card.render(data, false), oldCard)
        const filters = new VisitFilters()
        filters.applyFilters();

      } else {
        const data = await request.postCard(localStorage.Authorization, this.createCardiologistObj(newCardiologistVisitForm));
        card.render(data);
        console.log(data);
      }
      checkCards();
      newCardiologistVisitForm.remove();
    });
    return newCardiologistVisitForm;
  }
}

// ! клас для стоматолога, дочерний клас основного класа. заменяет главную форму на форму нужного врача, а также обрабатывает запрос на добавление на сервер, и создание карточки
export class VisitDentistForm extends VisitForm {
  createDentistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      priority: form.querySelector("#priority-select").value,
      lastDate: form.querySelector("#last-visit").value,
    };
  }
  render(oldCard, edit = false) {
    const newDentistVisitForm = super.render();
    const additionalInfo = `<input required id="last-visit" placeholder="Дата останнього візиту" type="text" class="form-control mb-2">`;
    newDentistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newDentistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 2;
    if (edit) {
      const editingCardInfo = request.getCard(localStorage.Authorization, oldCard.id)
      editingCardInfo.then(data => {
        newDentistVisitForm.querySelector("#fio").value = data.name;
        newDentistVisitForm.querySelector("#visit-purpose").value = data.purpose;
        newDentistVisitForm.querySelector("#decription").value = data.description;
        newDentistVisitForm.querySelector("#last-visit").value = data.lastDate
        newDentistVisitForm.querySelector("#visit-doctor-select").setAttribute("disabled", "true");
      })
    }
    newDentistVisitForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const card = new VisitCardDantist();
      if (edit) {
        const data = await request.updateCard(localStorage.Authorization, oldCard.id, this.createDentistObj(newDentistVisitForm));
        visitList.replaceChild(card.render(data, false), oldCard)
        const filters = new VisitFilters()

        filters.applyFilters();

      } else {
        const data = await request.postCard(localStorage.Authorization, this.createDentistObj(newDentistVisitForm));
        card.render(data);
      }
      checkCards();
      newDentistVisitForm.remove();
    });
    return newDentistVisitForm;
  }
}

// ! клас для терапевта, дочерний клас основного класа. заменяет главную форму на форму нужного врача, а также обрабатывает запрос на добавление на сервер, и создание карточки
export class VisitTherapistForm extends VisitForm {
  createTherapistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      priority: form.querySelector("#priority-select").value,
      age: form.querySelector("#age").value,
    };
  }
  render(oldCard, edit = false) {
    const newTherapistVisitForm = super.render();
    const additionalInfo = `<input required id="age" placeholder="Вік" type="text" class="form-control mb-2">`;
    newTherapistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newTherapistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 3;
    if (edit) {
      const editingCardInfo = request.getCard(localStorage.Authorization, oldCard.id)
      editingCardInfo.then(data => {
        newTherapistVisitForm.querySelector("#fio").value = data.name;
        newTherapistVisitForm.querySelector("#visit-purpose").value = data.purpose;
        newTherapistVisitForm.querySelector("#decription").value = data.description;
        newTherapistVisitForm.querySelector("#age").value = data.age
        newTherapistVisitForm.querySelector("#visit-doctor-select").setAttribute("disabled", "true");
      })
    }
    newTherapistVisitForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const card = new VisitCard();
      if (edit) {
        const data = await request.updateCard(localStorage.Authorization, oldCard.id, this.createTherapistObj(newTherapistVisitForm));
        let newCard = card.render(data, false);
        visitList.replaceChild(newCard, oldCard)
        const filters = new VisitFilters()

        filters.applyFilters();

      } else {
        const data = await request.postCard(localStorage.Authorization, this.createTherapistObj(newTherapistVisitForm));
        card.render(data);
      }
      checkCards();
      newTherapistVisitForm.remove();
    });
    return newTherapistVisitForm;
  }
}
