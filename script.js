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

document.getElementById("roxo").addEventListener("mouseenter", (_) => {
  document.getElementById("roxo").style.fill = "#5d02e0";
  document.getElementById("roxo").style.color = "#5d02e0";
});

document.getElementById("roxo").addEventListener("mouseleave", (_) => {
  document.getElementById("roxo").style.fill = "rgba(255, 255, 255, 0.8)";
  document.getElementById("roxo").style.color = "rgba(255, 255, 255, 0.8)";
});

const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);
    const initialContentLength = scrollerContent.length;

    // Cloning the items to create a continuous loop
    scrollerContent.slice(0, initialContentLength).forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });

    // Animation direction based on data-direction attribute
    const direction = scroller.getAttribute("data-direction");
    if (direction === "right") {
      scroller.style.setProperty("--_animation-direction", "reverse");
    } else {
      scroller.style.setProperty("--_animation-direction", "forwards");
    }

    // Animation speed based on data-speed attribute
    const speed = scroller.getAttribute("data-speed");
    if (speed === "slow") {
      scroller.style.setProperty("--_animation-duration", "60s");
    } else {
      scroller.style.setProperty("--_animation-duration", "20s");
    }
  });
}
