export default function toggleHideParameters(e) {
  const wrap = e.target.closest(".visit-card").querySelector(".parameters-wrap");
  const parametersWrap = e.target.closest(".visit-card").querySelector(".hide-parameters");
  const hideAge = e.target.closest(".visit-card").querySelector(".hide-age");
  hideAge.classList.toggle("hide");
  parametersWrap.classList.toggle("hide");
  wrap.classList.toggle("hide");
  if (!wrap.classList.contains("hide")) {
    e.target.textContent = "Показать меньше";
  } else {
    e.target.textContent = "Показать больше";
  }
}
