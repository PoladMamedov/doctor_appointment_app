import DoctorAPIService from "./doctor_api_service.js";
import VisitCard from "./cardRender.js";
import { checkCards } from "./cardRender.js";
const request = new DoctorAPIService();

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
    if (form.contains(e.target) || e.target.id === "create-visit-btn") {
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
        <option selected>Звичайна</option>
        <option>Пріоритетна</option>
        <option>Невідкладна</option>
      </select>
      <label for="floatingSelect">Терміновість:</label>
    </div>

    <button id="visit-submit-btn" type="submit" class="btn btn-primary">Створити запис</button>
    <button id="visit-cancel-btn" type="button" class="btn btn-danger mt-2">Скасувати</button>`;

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
class VisitCardiologistForm extends VisitForm {
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
  render() {
    const newCardiologistVisitForm = super.render();
    const additionalInfo = `<input required id="pressure" placeholder="Звичайний тиск" type="text" class="form-control mb-2">
   <input required id="mass-index" placeholder="Індекс маси тіла" type="text" class="form-control mb-2">
   <input required id="heart-diseases" placeholder="Перенесені захворювання серцево-судинної системи" type="text" class="form-control mb-2">
   <input required id="age" placeholder="Вік" type="text" class="form-control mb-2">`;
    newCardiologistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newCardiologistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 1;
    newCardiologistVisitForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = await request.postCard(localStorage.Authorization,this.createCardiologistObj(newCardiologistVisitForm));
      const card = new VisitCard();
      card.render(data);
      checkCards();
      // noItem.style.display = 'none';
      newCardiologistVisitForm.remove();
    });
    return newCardiologistVisitForm;
  }
}

// ! клас для стоматолога, дочерний клас основного класа. заменяет главную форму на форму нужного врача, а также обрабатывает запрос на добавление на сервер, и создание карточки
class VisitDentistForm extends VisitForm {
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
  render() {
    const newDentistVisitForm = super.render();
    const additionalInfo = `<input required id="last-visit" placeholder="Дата останнього візиту" type="text" class="form-control mb-2">`;
    newDentistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newDentistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 2;
    newDentistVisitForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = await request.postCard(localStorage.Authorization,this.createDentistObj(newDentistVisitForm));
      const card = new VisitCard();
      card.render(data);
      checkCards();
      // noItem.style.display = 'none';
      newDentistVisitForm.remove();
    });
    return newDentistVisitForm;
  }
}

// ! клас для терапевта, дочерний клас основного класа. заменяет главную форму на форму нужного врача, а также обрабатывает запрос на добавление на сервер, и создание карточки
class VisitTherapistForm extends VisitForm {
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
  render() {
    const newTherapistVisitForm = super.render();
    const additionalInfo = `<input required id="age" placeholder="Вік" type="text" class="form-control mb-2">`;
    newTherapistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newTherapistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 3;
    newTherapistVisitForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = await request.postCard(localStorage.Authorization,this.createTherapistObj(newTherapistVisitForm));
      const card = new VisitCard();
      card.render(data);
      checkCards();
      // noItem.style.display = 'none';
      newTherapistVisitForm.remove();
    });
    return newTherapistVisitForm;
  }
}
