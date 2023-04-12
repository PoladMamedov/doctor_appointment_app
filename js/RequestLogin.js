import getCardsFromServer from "./getCardsfromServer.js"; 
import logOut from "./logout.js";
import DoctorAPIService from "./doctor_api_service.js";

const autorization = async (email, password) => {
  const request = new DoctorAPIService();
  const token = await request.getToken(email, password);

  if (token) {
    console.log("Авторизація пройшла успішно")
    localStorage.setItem("Authorization", token);
    document.querySelector("#form").remove();
    document.querySelector(".authorization-btn").style.display = "none";;
    document.querySelector("#create-visit-btn").style.display = "block";

    document.querySelector("#logout").style.display = "block";
    document.querySelector("#logout").addEventListener("click",(e) => {
      logOut(e)
    })
    getCardsFromServer()
  } else {
    // внизу форми авторизації виводимо повідомдення з помилкою
    document.querySelector("#form").insertAdjacentHTML(
      "beforeend",
      `<p class="login__wrong" style="color:red">Incorrect username or password</p>`);
  }
};

export default autorization;




