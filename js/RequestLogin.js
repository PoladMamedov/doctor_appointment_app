

const autorization = async (email, password) => {
    const getToken = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: `${email}`, password: `${password}` }),
    }).then((res) => checkStatus(res));
    if (getToken) {
      console.log("Авторизація пройшла успішно")
      localStorage.setItem("Authorization", `Bearer ${getToken}`);
      document.querySelector("#form").remove();
      document.querySelector(".authorization-btn").textContent = "Створити візит";


      // виклик данних з сервера, get запрос на отримання списка карток користувача
      // та активація функції фільтрів
    } else {
// внизу форми авторизації виводимо повідомдення з помилкою
      document.querySelector("#form").insertAdjacentHTML(
        "beforeend",
        `<p class="login__wrong" style="color:red">Incorrect username or password</p>`);
    }
  };
  

  function checkStatus(status) {
    if (status.ok) {
      return status.text();
    } else return
  };

  export default autorization;
  
