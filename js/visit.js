import DoctorAPIService from "./doctor_api_service.js";
const request = new DoctorAPIService();

export default class VisitForm {
  doctorSelect(form){
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

    document.body.addEventListener("click", (e)=>{
      this.handleClickOutsideTheForm(e, newVisitForm)
    });

    return newVisitForm;
  }
}

class VisitCardiologistForm extends VisitForm {
  createCardiolojistObj(form){
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

      // ! вот тут нужно вызвать функцию создающую карточку, передать в нее дату

      // ! после добавления карточки закрываем форму
      newCardiologistVisitForm.remove()
    });
    return newCardiologistVisitForm;
  }
}

class VisitDentistForm extends VisitForm {
  createDentistObj(form){
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

      // ! после добавления карточки закрываем форму
      newDentistVisitForm.remove()
    });
    return newDentistVisitForm;
  }
}

class VisitTherapistForm extends VisitForm {
  createTherapistObj(form){
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
      
      // ! вот тут нужно вызвать функцию создающую карточку, передать в нее дату

      // ! после добавления карточки закрываем форму
      newTherapistVisitForm.remove()
    });
    return newTherapistVisitForm;
  }
}
