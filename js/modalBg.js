const modalBackground = {
  add() {
    const bg = document.createElement("div");
    bg.classList.add("modal-bg", "z-2");
    document.body.append(bg);
    setTimeout(() => {
      bg.classList.add("modal-bg-active");
    }, 10);
  },
  remove() {
    document.querySelector(".modal-bg").remove();
  },
};
export default modalBackground;
