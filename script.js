let currentSlide = 1;
const totalSlides = 2;
let slideTimeout;

window.addEventListener("wheel", (event) => {
  if (slideTimeout) {
    clearTimeout(slideTimeout);
  }

  slideTimeout = setTimeout(() => {
    if (event.deltaY > 0) {
      currentSlide = (currentSlide % totalSlides) + 1;
    } else {
      currentSlide = ((currentSlide - 2 + totalSlides) % totalSlides) + 1;
    }
    document.getElementById("slider" + currentSlide).checked = true;
  }, 200); // Timeout de 200ms para debouncing
});
