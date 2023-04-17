const modalBackground = {
  add(loginForm) {
    const bg = document.createElement("div");
    bg.classList.add("modal-bg", "z-2");
    document.body.append(bg);
    setTimeout(() => {
      bg.classList.add("modal-bg-active");
    }, 10);
    bg.addEventListener(
      "click",
      (e) => {
        if (loginForm) {
          loginForm.remove();
        } else {
          document.querySelector("#create-visit-form").remove();
        }
        e.target.remove();
      },
      { once: true }
    );
  },
  remove() {
    document.querySelector(".modal-bg").remove();
  },
  handleClickOutsideTheForm(e, form) {
    console.log(e.target);
    console.log(this);
    if (e.target.classList.contains("modal-bg")) {
      form.remove();
      modalBackground.remove();
      document.removeEventListener("click", this.handleClickOutsideTheForm);
    } else {
      return;
    }
  },
};

export default modalBackground;
