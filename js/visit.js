import DoctorAPIService from "./doctor_api_service.js";

export default class VisitForm {
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
    <input id="fio" placeholder="П.І.Б." type="text" class="form-control mb-2">
    <input id="visit-purpose" placeholder="Ціль візиту" type="text" class="form-control mb-2">
    <input id="decription" placeholder="Опис" type="text" class="form-control mb-2">
    <select id="priority-select" class="form-select mb-2">
       <option selected disabled>Терміновість:</option>
       <option>Звичайна</option>
       <option>Пріоритетна</option>
       <option>Невідкладна</option>
    </select>
    <button id="visit-submit-btn" type="submit" class="btn btn-primary">Створити запис</button>
    <button id="visit-cancel-btn" type="reset" class="btn btn-danger mt-2">Скасувати</button>`;

    newVisitForm.querySelector("#visit-doctor-select").addEventListener("change", (e) => {
        if (e.target.selectedIndex === 1) {
          newVisitForm.remove();
          const newCardiologistForm = new VisitCardiologistForm();
          document.body.prepend(newCardiologistForm.render());
        } else if (e.target.selectedIndex === 2) {
          newVisitForm.remove();
          const newDentistForm = new VisitDentistForm();
          document.body.prepend(newDentistForm.render());
        } else if (e.target.selectedIndex === 3) {
          newVisitForm.remove();
          const newTherapistForm = new VisitTherapistForm();
          document.body.prepend(newTherapistForm.render());
        }
      });

    newVisitForm.querySelector("#visit-submit-btn").addEventListener("click", (e) => {
        e.preventDefault();
        // ! запрос и рендер карточки
      });

    newVisitForm.querySelector("#visit-cancel-btn").addEventListener("click", (e) => {
        e.preventDefault();
        newVisitForm.remove();
      });

    function handleClickOutsideTheForm(e) {
      if (
        newVisitForm.contains(e.target) ||
        e.target.id === "create-visit-btn"
      ) {
        return;
      } else {
        newVisitForm.remove();
        document.body.removeEventListener("click", handleClickOutsideTheForm);
      }
    }
    document.body.addEventListener("click", handleClickOutsideTheForm);

    return newVisitForm;
  }
}

class VisitCardiologistForm extends VisitForm {
  render() {
    const newCardiologistVisitForm = super.render();
    const additionalInfo = 
   `<input id="pressure" placeholder="Звичайний тиск" type="text" class="form-control mb-2">
   <input id="mass-index" placeholder="індекс маси тіла" type="text" class="form-control mb-2">
   <input id="heart-diseases" placeholder="Перенесені захворювання серцево-судинної системи" type="text" class="form-control mb-2">
   <input id="age" placeholder="вік" type="text" class="form-control mb-2">`;
    newCardiologistVisitForm.querySelector("#priority-select").insertAdjacentHTML("afterend", additionalInfo);
    newCardiologistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 1;
    return newCardiologistVisitForm;
  }
}
class VisitDentistForm extends VisitForm {
  render() {
    const newDentistVisitForm = super.render();
    const additionalInfo = `<input id="last-visit" placeholder="дата останнього візиту" type="text" class="form-control mb-2">`;
    newDentistVisitForm.querySelector("#priority-select").insertAdjacentHTML("afterend", additionalInfo);
    newDentistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 2;
    return newDentistVisitForm;
  }
}
class VisitTherapistForm extends VisitForm {
  render() {
    const newTherapistVisitForm = super.render();
    const additionalInfo = `<input id="age" placeholder="вік" type="text" class="form-control mb-2">`;
    newTherapistVisitForm.querySelector("#priority-select").insertAdjacentHTML("afterend", additionalInfo);
    newTherapistVisitForm.querySelector("#visit-doctor-select").selectedIndex = 3;
    return newTherapistVisitForm;
  }
}
