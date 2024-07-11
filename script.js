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

function applyHoverEffects(id) {
  const element = document.getElementById(id);
  const img = document.getElementById(`${id}img`);
  const text = document.getElementById(`${id}text`);
  const svg = createSVG(id);

  element.addEventListener("mouseenter", () => {
    img.style = `
      transition: all 0.3s;
      width: 358px;
      height: 738px;
      object-fit: cover;
      color: #fa0444;
      margin-left: -25px;
      border: 2px solid #8a2be2;
    `;
    text.style = `
      transition: all 0.3s;
      color: #fa0444;
      left:15%;

    `;
    if (id === "lol") {
      text.style.left = "20%";
    } else if(id == "hok"){
      text.style.left = "25%";
      
    }
    svg.style.display = "block";
  });

  element.addEventListener("mouseleave", () => {
    img.style = `
      width: 250px;
      height: 738px;
      object-fit: cover;
      transition: all 0.3s;
      margin-left: 0px;
      border: none;
    `;
    text.style = `
      transition: all 0.3s;
      color: #fff;
      left:25%;

    `;
    if (id === "lol") {
      text.style.left = "35%";
    } else if(id == "hok"){
      text.style.left = "40%";
      
    }
    svg.style.display = "none";
  });
}

function createSVG(id) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("width", "50");
  svg.setAttribute("height", "50");
  svg.setAttribute("viewBox", "0 0 39 39");
  svg.style.position = "absolute";
  svg.style.top = "20px";
  svg.style.right = "10px";
  svg.style.display = "none";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M3 0V6H28.77L0 34.77L4.23 39L33 10.23V36H39V0H3Z");
  path.setAttribute("fill", "#5D02E0");

  svg.appendChild(path);
  document.getElementById(id).appendChild(svg);

  return svg;
}

const ids = ["r6", "cs", "ff", "lol", "hok"];
ids.forEach(applyHoverEffects);
