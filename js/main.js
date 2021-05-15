const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startGameBtn = document.querySelector('.start-game');
let inProgress = false;
let score = document.querySelector('.score');
let timeBlock = document.querySelector('.time');
let countSeconds = 0;
let kicks = 0;
let normalLevel = document.querySelector('.normal-level');
let easyLevel = document.querySelector('.easy-level');
let hardLevel = document.querySelector('.hard-level');
let wrapper = document.querySelector('.wrapper');


hardLevel.addEventListener('click', startHardLevel);
normalLevel.addEventListener('click', startNormalLevel);
easyLevel.addEventListener('click', startEasyLevel);
startGameBtn.addEventListener('click', startGame);

function startEasyLevel() {
	wrapper.classList.toggle('open-easy-level');
}

function startNormalLevel() {
	wrapper.classList.toggle('open-normal-level');
}

function startHardLevel() {
	wrapper.classList.toggle('open-hard-level');
}

moles.forEach((mole) => {
	mole.addEventListener('click', kick)
});

function randomTime(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
	const id = Math.floor(Math.random() * holes.length);
	return holes[id];
}

function showMole() {
	const time = randomTime(500, 1000);
	const hole = randomHole(holes);
	hole.classList.add('up');
	setTimeout(() => {
		hole.classList.remove('up');
		if (inProgress) showMole();
	}, time)
}

function startGame() {
	inProgress = true;
	kicks = 0;
	showMole();
	score.textContent = 0;
	countSeconds = 60;
	startTracking();
	setTimeout(() => {
		inProgress = false;
	}, 60000)
}

function kick(e) {
	if (!e.isTrusted) return;
	this.parentNode.classList.add('dead-mole');
	this.parentNode.classList.remove('up');
	kicks++;
	score.textContent = kicks;
}


function startTracking() {
	updateTimer();
}

function updateTimer() {
	if (countSeconds === 0) {
		return;
	}
	setTimeout(() => {
		countSeconds--;
		timeBlock.textContent = '00:' + (countSeconds > 9 ? countSeconds : '0' + countSeconds);
		updateTimer();
	}, 1000)
}

function timeOutFunc() {
	let timer = setInterval(function() {
		startGameBtn.style.display = "inline-block";
	}, 61000);
}

startGameBtn.addEventListener('click', hideBtn);

function hideBtn() {
	wrapper.classList.toggle('hide-btn');
}

$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;

		var link = this.el.find('.link');
		link.on('click', {
			el: this.el,
			multiple: this.multiple
		}, this.dropdown)
	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
		$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		}

	}
	var accordion = new Accordion($('#accordion'), false);
});