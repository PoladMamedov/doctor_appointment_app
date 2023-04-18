import DoctorAPIService from "./doctor_api_service.js";
import checkCards from "./checkCards.js";
import VisitFilters from "./filter.js";
import VisitCardTherapist, { VisitCardDantist, VisitCardCardio } from "./cardRender.js";
import modalBackground from "./modalBg.js";
const request = new DoctorAPIService();
const visitList = document.querySelector(".visit-wrap");

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
    newVisitForm.innerHTML = `<label class="form-label">Заполните форму:</label> 
    <select id="visit-doctor-select" class="form-select mb-2">
       <option selected disabled>Выберите врача:</option>
       <option>Кардиолог</option>
       <option>Стоматолог</option>
       <option>Терапевт</option>
    </select>
    <input required id="fio" placeholder="Ф.И.О." type="text" class="form-control mb-2">
    <input required id="visit-purpose" placeholder="Цель визита" type="text" class="form-control mb-2">
    <input id="decription" placeholder="Описание" type="text" class="form-control mb-2">
    <input required id="visit-date" type="date" class="form-control mb-2">
    <div id="priority-select-wrapper" class="form-floating mb-2">
      <select id="priority-select" class="form-select">
        <option selected>Обычная</option>
        <option>Приоритетная</option>
        <option>Неотложная</option>
      </select>
      <label for="floatingSelect">Срочность:</label>
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
      modalBackground.remove();
    });

    return newVisitForm;
  }
}

export class VisitCardiologistForm extends VisitForm {
  createCardiologistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      date: form.querySelector("#visit-date").value,
      priority: form.querySelector("#priority-select").value,
      pressure: form.querySelector("#pressure").value,
      massIndex: form.querySelector("#mass-index").value,
      heartDiseases: form.querySelector("#heart-diseases").value,
      age: form.querySelector("#age").value,
    };
  }
  async cardiologistFormSubmitHandler(e, form, oldCard, edit) {
    modalBackground.remove();
    const card = new VisitCardCardio();
    if (edit) {
      const data = await request.updateCard(localStorage.Authorization, oldCard.id, this.createCardiologistObj(form));
      visitList.replaceChild(card.render(data, false), oldCard);
      const filters = new VisitFilters();
      filters.applyFilters();
    } else {
      const data = await request.postCard(localStorage.Authorization, this.createCardiologistObj(form));
      card.render(data);
    }
    checkCards();
    form.remove();
  }
  render(oldCard, edit = false) {
    const newCardiologistVisitForm = super.render();
    const additionalInfo = `<input required id="pressure" placeholder="Обычное давление" type="text" class="form-control mb-2">
   <input required id="mass-index" placeholder="Индекс массы тела" type="text" class="form-control mb-2">
   <input required id="heart-diseases" placeholder="Перенесенные заболевания сердечно-сосудистой системы" type="text" class="form-control mb-2">
   <input required id="age" placeholder="Возраст" type="text" class="form-control mb-2">`;
    newCardiologistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newCardiologistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 1;
    if (edit) {
      modalBackground.add();
      const editingCardInfo = request.getCard(localStorage.Authorization, oldCard.id);
      editingCardInfo.then((data) => {
        newCardiologistVisitForm.querySelector("#fio").value = data.name;
        newCardiologistVisitForm.querySelector("#visit-purpose").value = data.purpose;
        newCardiologistVisitForm.querySelector("#decription").value = data.description;
        newCardiologistVisitForm.querySelector("#visit-date").value = data.date;
        newCardiologistVisitForm.querySelector("#age").value = data.age;
        newCardiologistVisitForm.querySelector("#pressure").value = data.pressure;
        newCardiologistVisitForm.querySelector("#mass-index").value = data.massIndex;
        newCardiologistVisitForm.querySelector("#heart-diseases").value = data.heartDiseases;
        newCardiologistVisitForm.querySelector("#visit-submit-btn").innerText = "Сохранить";
        newCardiologistVisitForm.querySelector("#visit-doctor-select").setAttribute("disabled", "true");
      });
    }
    newCardiologistVisitForm.addEventListener("submit", (e) => {
      this.cardiologistFormSubmitHandler(e, newCardiologistVisitForm, oldCard, edit);
    });
    return newCardiologistVisitForm;
  }
}

export class VisitDentistForm extends VisitForm {
  createDentistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      date: form.querySelector("#visit-date").value,
      priority: form.querySelector("#priority-select").value,
      lastDate: form.querySelector("#last-visit").value,
    };
  }
  async dentistFormSubmitHandler(e, form, oldCard, edit) {
    modalBackground.remove();
    const card = new VisitCardDantist();
    if (edit) {
      const data = await request.updateCard(localStorage.Authorization, oldCard.id, this.createDentistObj(form));
      visitList.replaceChild(card.render(data, false), oldCard);
      const filters = new VisitFilters();
      filters.applyFilters();
    } else {
      const data = await request.postCard(localStorage.Authorization, this.createDentistObj(form));
      card.render(data);
    }
    checkCards();
    form.remove();
  }
  render(oldCard, edit = false) {
    const newDentistVisitForm = super.render();
    const additionalInfo = `<input required id="last-visit" placeholder="Дата последнего визита" type="text" class="form-control mb-2">`;
    newDentistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newDentistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 2;
    if (edit) {
      modalBackground.add();
      const editingCardInfo = request.getCard(localStorage.Authorization, oldCard.id);
      editingCardInfo.then((data) => {
        newDentistVisitForm.querySelector("#fio").value = data.name;
        newDentistVisitForm.querySelector("#visit-purpose").value = data.purpose;
        newDentistVisitForm.querySelector("#decription").value = data.description;
        newDentistVisitForm.querySelector("#visit-date").value = data.date;
        newDentistVisitForm.querySelector("#last-visit").value = data.lastDate;
        newDentistVisitForm.querySelector("#visit-submit-btn").innerText = "Сохранить";
        newDentistVisitForm.querySelector("#visit-doctor-select").setAttribute("disabled", "true");
      });
    }
    newDentistVisitForm.addEventListener("submit", (e) => {
      this.dentistFormSubmitHandler(e, newDentistVisitForm, oldCard, edit);
    });
    return newDentistVisitForm;
  }
}

export class VisitTherapistForm extends VisitForm {
  createTherapistObj(form) {
    return {
      doctor: form.querySelector("#visit-doctor-select").value,
      name: form.querySelector("#fio").value,
      purpose: form.querySelector("#visit-purpose").value,
      description: form.querySelector("#decription").value,
      date: form.querySelector("#visit-date").value,
      priority: form.querySelector("#priority-select").value,
      age: form.querySelector("#age").value,
    };
  }
  async therapistFormSubmitHandler(e, form, oldCard, edit) {
    modalBackground.remove();
    const card = new VisitCardTherapist();
    if (edit) {
      const data = await request.updateCard(localStorage.Authorization, oldCard.id, this.createTherapistObj(form));
      visitList.replaceChild(card.render(data, false), oldCard);
      const filters = new VisitFilters();
      filters.applyFilters();
    } else {
      const data = await request.postCard(localStorage.Authorization, this.createTherapistObj(form));
      card.render(data);
    }
    checkCards();
    form.remove();
  }
  render(oldCard, edit = false) {
    const newTherapistVisitForm = super.render();
    const additionalInfo = `<input required id="age" placeholder="Возраст" type="text" class="form-control mb-2">`;
    newTherapistVisitForm.querySelector("#priority-select-wrapper").insertAdjacentHTML("afterend", additionalInfo);
    newTherapistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 3;
    if (edit) {
      modalBackground.add();
      const editingCardInfo = request.getCard(localStorage.Authorization, oldCard.id);
      editingCardInfo.then((data) => {
        newTherapistVisitForm.querySelector("#fio").value = data.name;
        newTherapistVisitForm.querySelector("#visit-purpose").value = data.purpose;
        newTherapistVisitForm.querySelector("#decription").value = data.description;
        newTherapistVisitForm.querySelector("#visit-date").value = data.date;
        newTherapistVisitForm.querySelector("#age").value = data.age;
        newTherapistVisitForm.querySelector("#visit-submit-btn").innerText = "Сохранить";
        newTherapistVisitForm.querySelector("#visit-doctor-select").setAttribute("disabled", "true");
      });
    }
    newTherapistVisitForm.addEventListener("submit", (e) => {
      this.therapistFormSubmitHandler(e, newTherapistVisitForm, oldCard, edit);
    });
    return newTherapistVisitForm;
  }
}
