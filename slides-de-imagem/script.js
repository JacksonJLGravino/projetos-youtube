const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const pagination = document.querySelector(".pagination");

let index = 0;
const total = slides.length;

for (let i = 0; i < total; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) {
    dot.classList.add("active");
  }
  dot.addEventListener("click", () => goToSlide(i));
  pagination.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

const updateSlider = () => {
  slider.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
};

next.addEventListener("click", () => {
  index = (index + 1) % total;
  updateSlider();
});

prev.addEventListener("click", () => {
  index = (index - 1 + total) % total;
  updateSlider();
});

const goToSlide = (i) => {
  index = i;
  updateSlider();
};

setInterval(() => {
  index = (index + 1) % total;
  updateSlider();
}, 3500);
