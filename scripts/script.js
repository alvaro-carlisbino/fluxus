let lastScrollTime = 0;

document.addEventListener("wheel", function (event) {
  const currentTime = Date.now();
  const deltaY = event.deltaY;
  const deltaTime = currentTime - lastScrollTime;
  const speed = Math.abs(deltaY) / deltaTime;

  const minDuration = 0.2;
  const maxDuration = 1.0;
  const transitionDuration = Math.min(
    maxDuration,
    Math.max(minDuration, maxDuration - speed * 0.8)
  );

  document.querySelectorAll(".carousel-item").forEach((item) => {
    item.style.transitionDuration = `${transitionDuration}s`;
  });

  const carousel = document.querySelector("#carouselExampleCaptions");
  let carouselInstance =
    bootstrap.Carousel.getInstance(carousel) ||
    new bootstrap.Carousel(carousel);

  deltaY < 0 ? carouselInstance.prev() : carouselInstance.next();

  lastScrollTime = currentTime;
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

    scrollerContent.slice(0, initialContentLength).forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });

    scroller.style.setProperty(
      "--_animation-direction",
      scroller.getAttribute("data-direction") === "right"
        ? "reverse"
        : "forwards"
    );
    scroller.style.setProperty(
      "--_animation-duration",
      scroller.getAttribute("data-speed") === "slow" ? "60s" : "20s"
    );
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
    img.src = `assets/${id}_cor.png`;

    text.style = `
      transition: all 0.3s;
      color: #fa0444;
      left: ${id === "lol" ? "20%" : id === "hok" ? "25%" : "15%"};
    `;
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
    img.src = `assets/${id}.png`;

    text.style = `
      transition: all 0.3s;
      color: #fff;
      left: ${id === "lol" ? "35%" : id === "hok" ? "40%" : "25%"};
    `;
    svg.style.display = "none";
  });
}

function createSVG(id) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "50");
  svg.setAttribute("height", "50");
  svg.setAttribute("viewBox", "0 0 39 39");
  svg.style.position = "absolute";
  svg.style.top = "20px";
  svg.style.right = "5px";
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
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const cards = [
    { id: "#mlks-1", endTranslateX: 0, rotate: 45 },
    { id: "#mlks-2", endTranslateX: -100, rotate: -30 },
    { id: "#mlks-3", endTranslateX: -50, rotate: 45 },
  ];

  ScrollTrigger.create({
    trigger: ".fenosmlks",
    start: "top top",
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
      gsap.to(".fenosmlks", {
        x: `${-350 * self.progress}vw`,
        duration: 0.5,
        ease: "power3.out",
      });
    },
  });

  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: card.id,
      scrub: 1,
      onUpdate: (self) => {
        gsap.to(card.id, {
          x: `${card.endTranslateX * self.progress}px`,
          rotate: `${card.rotate * self.progress * 2}`,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });
  });
});

const target = document.querySelectorAll("[data-anim]");
const animationClass = "animate";

function animeScroll() {
  const windowTop = window.scrollY
  target.forEach((elem) => {
    if((windowTop) > elem.offsetTop-400){
      elem.classList.add(animationClass)
    }else if ((windowTop) < elem.offsetTop+400){
      elem.classList.remove(animationClass)
    }
  }) 
}

window.addEventListener("scroll", animeScroll)

$(function () {
  $(".draggable").draggable({
    scroll: true,
    scrollSensitivity: 100,
    scrollSpeed: 50,
  });
});


const slider = document.querySelector('#noticias-div');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
  console.log(walk);
});