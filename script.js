const cols = 3;
const sliderWrapper = document.getElementById('sliderWrapper');
let parts = [];
let images = ['./image.png', './image2.png'];
let current = 0;

// Add images to the HTML-markup
for (let col = 0; col < cols; col++) {
	let part = document.createElement('div');
	part.className = 'part';

	let section = document.createElement('div');
	section.className = 'section';

	let img = document.createElement('img');
	img.src = images[current];

	section.appendChild(img);
	part.appendChild(section);
	sliderWrapper.appendChild(part);

	part.style.setProperty('--x', (-100 / cols) * col + 'vw');

	parts.push(part);
}

let playing = false;

// Slide handler
const slide = (dir) => {
	if (!playing) {
		playing = true;
		
		if (current + dir < 0) {
			current = images.length - 1;
		} else if (current + dir >= images.length) {
			current = 0;
		} else {
			current += dir;
		}

		const up = (part, next) => {
			part.appendChild(next);
			anime({
				targets: part,
				duration: 2500,
				easing: 'easeInOutQuart',
				translateY: [0, -window.innerHeight],
				complete: () => {
					part.removeChild(part.childNodes[0]);
					playing = false;
					part.style.transform = 'translateY(0)';
				},
			});
		};

		const down = (part, next) => {
			part.insertBefore(next, part.firstChild);
			anime({
				targets: part,
				duration: 2500,
				easing: 'easeInOutQuart',
				translateY: [-window.innerHeight, 0],
				complete: () => {
					part.removeChild(part.childNodes[1]);
					playing = false;
				},
			});
		};

		for (let p in parts) {
			let part = parts[p];
			let next = document.createElement('div');
			next.className = 'section';

			let img = document.createElement('img');
			img.src = images[current];

			next.appendChild(img);

			if ((p - Math.max(0, dir)) % 2 === 0) {
				down(part, next);
			} else {
				up(part, next);
			}
		}
	}
};

document.addEventListener('wheel', function(event) {
	if (event.deltaY < 0) {
		// Rolagem para cima
		slide(-1);
	} else {
		// Rolagem para baixo
		slide(1);
	}
});