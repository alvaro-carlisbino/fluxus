let lastScrollTime = 0;
let lastScrollY = 0;

document.addEventListener("wheel", function (event) {
  const currentTime = new Date().getTime();
  const deltaY = event.deltaY;
  const deltaTime = currentTime - lastScrollTime;

  let speed = Math.abs(deltaY) / deltaTime;

  const minDuration = 0.2;
  const maxDuration = 1.0;

  let transitionDuration = Math.max(minDuration, maxDuration - speed * 0.8);
  transitionDuration = Math.min(maxDuration, transitionDuration);

  let carouselItems = document.querySelectorAll(".carousel-item");
  carouselItems.forEach((item) => {
    item.style.transitionDuration = `${transitionDuration}s`;
  });

  var carousel = document.querySelector("#carouselExampleCaptions");
  var carouselInstance = bootstrap.Carousel.getInstance(carousel);
  if (!carouselInstance) {
    carouselInstance = new bootstrap.Carousel(carousel);
  }

  if (deltaY < 0) {
    carouselInstance.prev();
  } else {
    carouselInstance.next();
  }

  lastScrollTime = currentTime;
  lastScrollY = window.scrollY;
});
