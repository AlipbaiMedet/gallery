var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");

//=================
//TOUCH|PC
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
if (isMobile.any()) {
	document.body.classList.add(`_touch`);
} else {
	document.body.classList.add(`_pc`);
}

//=================
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

//=================
//WEBP
function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});

//=================
if (document.querySelector(`.wrapper`)) {
	document.querySelector(`.wrapper`).classList.add(`_loaded`);
}
let unlock = true;

//=================
//MENU
let iconMenu = document.querySelector(`.icon-menu`);
if (iconMenu) {
	let delay = 500;
	let menuBody = document.querySelector(`.menu__body`);
	iconMenu.addEventListener(`click`, function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle(`_active`);
			menuBody.classList.toggle(`_active`);
		};
	});
};
function menu_close() {
	let iconMenu = document.querySelector(`.icon-menu`);
	let menuBody = document.querySelector(`.menu__body`);
	iconMenu.classList.remove(`_active`);
	menuBody.classList.remove(`_active`);
}

//=================
//BODY-LOCK
function body_lock(delay) {
	let body = document.querySelector(`body`);
	if (body.classList.contains(`_lock`)) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector(`body`);
	if (unlock) {
		let lock_padding = document.querySelectorAll(`._lp`);
		setTimeout(() => {
			if (lock_padding.length > 0) {
				for (let index = 0; index < lock_padding.length; index++) {
					const el = lock_padding[index];
					el.style.paddingRight = `0px`;
				}
			}
			body.style.paddingRight = `0px`;
			body.classList.remove(`_lock`);
		}, delay);

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, delay);
	};
}
function body_lock_add(delay) {
	let body = document.querySelector(`body`);
	if (unlock) {
		let lock_padding = document.querySelectorAll(`._lp`);
		if (lock_padding.length > 0) {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = window.innerWidth - document.querySelector(`.wrapper`).offsetWidth + `px`;
			}
		}
		body.style.paddingRight = window.innerWidth - document.querySelector(`.wrapper`).offsetWidth + `px`;
		body.classList.add(`_lock`);

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, delay);
	};
}

//=================
//TABS
let tabs = document.querySelectorAll(`._tabs`);
if (tabs.length > 0) {
	for (let index = 0; index < tabs.length; index++) {
		const tab = tabs[index];
		let tabs_items = tab.querySelectorAll(`._tabs-item`);
		let tabs_blocks = tab.querySelectorAll(`._tabs-block`);
		if (tabs_items.length > 0 && tabs_blocks.length > 0) {
			for (let index = 0; index < tabs_items.length; index++) {
				const tabs_item = tabs_items[index];
				const tabs_block = tabs_blocks[index];
				tabs_item.addEventListener(`click`, function (e) {
					for (let index = 0; index < tabs_items.length; index++) {
						const tabs_item = tabs_items[index];
						const tabs_block = tabs_blocks[index];
						tabs_item.classList.remove(`_active`);
						tabs_block.classList.remove(`_active`);
					}
					tabs_item.classList.add(`_active`);
					tabs_block.classList.add(`_active`);
					e.preventDefault();
				});
			}
		}
	}
}

//=================
//SPOLLERS
let spollers = document.querySelectorAll(`._spoller`);
let spollersGo = true;
if (spollers.length > 0) {
	function spollerClick(e) {
		const spoller = e.target;
		if (spollersGo) {
			spollersGo = false;
			if (spoller.closest(`._spollers`).classList.contains(`_one`)) {
				let curentSpollers = spoller.closest('._spollers').querySelectorAll('._spoller');
				for (let index = 0; index < curentSpollers.length; index++) {
					const curentSpoller = curentSpollers[index];
					if (curentSpoller != spoller) {
						curentSpoller.classList.remove(`_active`);
						_slideUp(curentSpoller.nextElementSibling)
					}
				}
			}
			spoller.classList.toggle(`_active`);
			_slideToggle(spoller.nextElementSibling);

			setTimeout(() => {
				spollersGo = true;
			}, 500);
		}
	}
	function spollersInit() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			let spollerMax = spoller.getAttribute(`data-max`);
			if (spollerMax && window.innerWidth > spollerMax) {
				if (spoller.classList.contains(`_init`)) {
					spoller.classList.remove(`_active`);
					spoller.classList.remove(`_init`);
					spoller.nextElementSibling.style.cssText = ``;
					spoller.removeEventListener(`click`, spollerClick);
				}
			} else if (!spoller.classList.contains(`_init`)) {
				spoller.classList.add(`_init`);
				spoller.addEventListener(`click`, spollerClick);
			}
		}
	}
	function spollersShowActive() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			if (spoller.classList.contains(`_active`)) {
				_slideToggle(spoller.nextElementSibling);
			}
		}
	}
	window.addEventListener(`resize`, spollersInit)

	setTimeout(() => {
		spollersShowActive();
		spollersInit();
	}, 0);
}

//=================
//POPUP
let popupLinks = document.querySelectorAll(`._popup-link`);
let popups = document.querySelectorAll(`.popup`);
if (popupLinks.length > 0 && popups.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener(`click`, function (e) {
			if (unlock) {
				let item = popupLink.getAttribute(`href`).replace(`#`, ``);
				let video = popupLink.getAttribute(`data-video`);
				popupOpen(item, video);
			}
			e.preventDefault();
		});
	}
	for (let index = 0; index < popups.length; index++) {
		const popup = popups[index];
		popup.addEventListener(`click`, function (e) {
			if (!e.target.closest(`.popup__body`)) {
				popupClose(e.target.closest(`.popup`));
			}
		});
	}
}
function popupOpen(item, video = ``) {
	let activePopup = document.querySelectorAll(`.popup._active`);
	if (activePopup.length > 0) {
		popupClose(``, false);
	}
	let curentPopup = document.querySelector(`.popup_` + item);
	if (curentPopup && unlock) {
		if (video != '' && video != null) {
			let popupVideo = document.querySelector(`.popup_video`);
			popupVideo.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector(`.menu__body._active`)) {
			body_lock_add(500);
		}
		curentPopup.classList.add(`_active`);
		history.pushState('', '', '#' + item);
	}
}
function popupClose(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector(`.popup__video`);
				if (video) {
					video.innerHTML = ``;
				}
				popup.classList.remove(`_active`);
			}
		} else {
			let video = document.querySelector(`.popup__video`);
			if (video) {
				video.innerHTML = ``;
			}
			item.classList.remove(`_active`);
		}
		if (!document.querySelector(`.menu__body._active`) && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popupCloseIcons = document.querySelectorAll(`.popup__close,._popup-close`);
if (popupCloseIcons.length > 0) {
	for (let index = 0; index < popupCloseIcons.length; index++) {
		const popupCloseIcon = popupCloseIcons[index];
		popupCloseIcon.addEventListener(`click`, function (e) {
			popupClose(popupCloseIcon.closest(`.popup`));
		});
	}
}
document.addEventListener(`keydown`, function (e) {
	if (e.code === `Escape`) {
		popupClose();
	}
});

//=================
//GALLERY
let gallery = document.querySelectorAll(`._gallery`);
if (gallery.length > 0) {
	galleryInit();
}
function galleryInit() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		if (window.innerWidth < 992) {
			lightGallery(el, {
				controls: false,
				download: false,
				selector: `a._gallery-link`,
				counter: false,
				//loop: false,
				speed: 300,
				//mode: `lg-fade`,
			});
		} else {
			lightGallery(el, {
				download: false,
				selector: `a._gallery-link`,
				counter: false,
				//loop: false,
				speed: 300,
				//mode: `lg-fade`,
				//controls: false,
			});
		}
	}
}
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//=================
//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}