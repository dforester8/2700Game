//credit to Chris Courses on youtube for main structure of code
var canvas = document.
querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEl = document.querySelector('#scoreEl');
const startGameButton = document.querySelector('#startGameButton');
const modalEl = document.querySelector('#modalEl');
const endScoreEl = document.querySelector('#endScoreEl');

class Jacket {
	constructor(x,y,direction) {
		this.x = x;
		this.y = y;
		this.direction = direction;
	}
		draw() {
		var ctx = document.getElementById('canvas').getContext('2d');
		var img = new Image();
		img.onload = function() {
			ctx.drawImage(img, x - 35, y - 70, 70, 70);
		}
		img.src = 'jacket.png';
	}
}

class Stinger {
	constructor(x, y, radius, color, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
	}
	draw() {
		context.beginPath()
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fillStyle = this.color;
		context.fill();
	}

	update() {
		this.draw()
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}

class Enemy {
	constructor(x,y,velocity) {
		this.x = x;
		this.y = y;
		this.velocity = velocity;
	}

	draw() {

	}

	
	update() {
		this.draw();
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}

class Wolfpack extends Enemy {
	constructor(x,y,velocity) {
		super(x,y,velocity)
	}
	draw() {
		var img = document.getElementById('wolfpack')
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.drawImage(img, this.x, this.y);
		
	}
	update() {
		this.draw();
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}

class Seminole extends Enemy {
	constructor(x,y,velocity) {
		super(x,y,velocity)
	}
	draw() {
		var img = document.getElementById('seminole')
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.drawImage(img, this.x, this.y);
		
	
	}
	update() {
		this.draw();
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}

class Bulldog extends Enemy {
	constructor(x,y,velocity) {
		super(x,y,velocity);
	}

	draw() {
		var img = document.getElementById('bulldog')
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.drawImage(img, this.x, this.y);
		
	}
	
}

const x = canvas.width / 2
const y = canvas.height / 2

let jacket = new Jacket(x, y, 'space');
let stingers = [];
let enemies = [];

function init() {
	jacket = new Jacket(x, y, 'space');
 	stingers = [];
 	enemies = [];
 	score = 0;
 	scoreEl.innerHTML = score;
 	endScoreEl.innerHTML = score;
}

function randomEnemy() {
	let x
		let y
		if (Math.random() < 0.5) {
		 x = (Math.random() < 0.5) ? 0 - 30 : canvas.width + 30
		 y = Math.random() * canvas.height
	} else {
		x = Math.random() * canvas.width
		y = (Math.random() < 0.5) ? 0 - 30 : canvas.height + 30
	}
		const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
		const velocity = {
		x: Math.cos(angle),
		y: Math.sin(angle)
	}
	var val = Math.random();
	if(val < .4) {
		return new Bulldog(x,y,velocity);
	}
	else if (val < .7) {
		return new Wolfpack(x,y,velocity);
	} else  {
	return new Seminole(x,y,velocity);
}
}
	
function createEnemies() {
	setInterval(() => {
		
		enemies.push(randomEnemy());
	}, 1500)
}


let animationId
let score = 0;
function animate() {
	animationId = requestAnimationFrame(animate)
	context.fillStyle = 'rgba(0,0,0,.1)'
	context.fillRect(0,0,canvas.width,canvas.height);
	jacket.draw();
	stingers.forEach((stinger, index) => {
			stinger.update()

			if (stinger.x + 5 < 0 || stinger.x - 5 > canvas.width || stinger.y + 5 < 0 || stinger.y - 5 > canvas.height) {
				setTimeout(() => {
					stingers.splice(index, 1)
				}, 0)
			}
		})
	enemies.forEach((enemy, index) => {
		enemy.update();

		const dist = Math.hypot((jacket.x - 35) - enemy.x, (jacket.y - 70) - enemy.y)

		if (dist - 35 - 20  < 1) {
			cancelAnimationFrame(animationId)
			modalEl.style.display = 'flex';
			endScoreEl.innerHTML = score;

		}

		stingers.forEach((stinger, stingerindex) => {
			const dist = Math.hypot(stinger.x - enemy.x, stinger.y - enemy.y)
			
			if (dist - 50 - 5  < 1) {

				score += 50;
				scoreEl.innerHTML = score

				setTimeout(() => {
				enemies.splice(index, 1)
				stingers.splice(stingerindex, 1)
				}, 0)
			}
		})
	})
}

addEventListener('click', (event) => {
	const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
	const velocity = {
		x: Math.cos(angle) * 2,
		y: Math.sin(angle) * 2
	}
	stingers.push(new Stinger(jacket.x, jacket.y, 5, 'yellow', velocity))
})

window.onload = function() {
	bulldog = document.getElementById('bulldog');
	var ctx = document.getElementById('canvas').getContext('2d');




startGameButton.addEventListener('click', () => {
	init();
	animate();
	createEnemies();
	modalEl.style.display = 'none';
});
}
