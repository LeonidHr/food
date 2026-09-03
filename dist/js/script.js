/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js"
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector('.calculating__result span');
  let sex, weight, height, age, ratio;
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  }
  if (localStorage.getItem('ratio')) {
    ratio = +localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.remove(activeClass);
      if (element.id === localStorage.getItem('sex') || element.dataset.ratio === localStorage.getItem('ratio')) {
        element.classList.add(activeClass);
      }
    });
  }
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  function calcTotal() {
    if (!sex || !weight || !height || !age || !ratio) {
      result.textContent = '____';
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((10 * weight + 6.25 * height - 5 * age - 161) * ratio);
    } else {
      result.textContent = Math.round((10 * weight + 6.25 * height - 5 * age + 5) * ratio);
    }
  }
  calcTotal();
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.addEventListener("click", e => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.dataset.ratio;
          localStorage.setItem('ratio', ratio);
        } else {
          sex = e.target.id;
          localStorage.setItem('sex', sex);
        }
        elements.forEach(item => {
          item.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", e => {
      if (/\D/g.test(input.value)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      switch (input.id) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ },

/***/ "./src/js/modules/cards.js"
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

function cards() {
  class MenuCard {
    constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 45;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const div = document.createElement('div');
      if (this.classes.length) {
        this.classes.forEach(className => div.classList.add(className));
      } else {
        this.classes = 'menu__item';
        div.classList.add(this.classes);
      }
      div.innerHTML = `
        <div class="menu__item" bis_skin_checked="1">
          <img src="${this.img}" alt="${this.altimg}">
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr" bis_skin_checked="1">
            ${this.descr}
          </div>
          <div class="menu__item-divider" bis_skin_checked="1"></div>
          <div class="menu__item-price" bis_skin_checked="1">
              <div class="menu__item-cost" bis_skin_checked="1">Цена:</div>
              <div class="menu__item-total" bis_skin_checked="1"><span>${this.price}</span> грн/день</div>
          </div>
        </div>
      `;
      this.parent.append(div);
    }
  }
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ },

/***/ "./src/js/modules/forms.js"
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms(formSelector, modalSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const messages = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(form => {
    bindPostForms(form);
  });
  function bindPostForms(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postForms)('http://localhost:3000/requests', json).then(data => {
        showThanksMessage(messages.success);
        console.log(data);
      }).catch(() => {
        showThanksMessage(messages.failure);
      }).finally(() => {
        statusMessage.remove();
        form.reset();
      });
    });
  }
  function showThanksMessage(message) {
    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalSelector, modalTimerId);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(modalSelector);
      prevModal.classList.remove('hide');
    }, 4000);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ },

/***/ "./src/js/modules/menu.js"
/*!********************************!*\
  !*** ./src/js/modules/menu.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menu(burgerSelector, menuListSelector, btnHeader) {
  if (window.matchMedia("(max-width: 768px)").matches) {
    const burger = document.querySelector(burgerSelector);
    const menu = document.querySelector(menuListSelector);
    const btn = document.querySelector(btnHeader);
    menu.append(btn);
    console.log(213131);
    burger.addEventListener('click', () => {
      document.body.classList.toggle('_active-menu');
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ },

/***/ "./src/js/modules/modal.js"
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearTimeout(modalTimerId);
}
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
function modal(modalSelector, modalTriggersSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
    modalTriggers = document.querySelectorAll(modalTriggersSelector);
  function showModalByScroll() {
    const docEl = document.documentElement;
    if (window.pageYOffset + docEl.clientHeight >= docEl.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code === 'Escape') {
      closeModal(modalSelector);
    }
  });
  window.addEventListener("scroll", showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ },

/***/ "./src/js/modules/slider.js"
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
  prevSlideSelector,
  nextSlideSelector,
  totalSlidesSelector,
  currentSlideSelector,
  slideSelector,
  sliderSelector,
  sliderWrapSelector,
  sliderInnerSelector
}) {
  const prevSlide = document.querySelector(prevSlideSelector),
    nextSlide = document.querySelector(nextSlideSelector),
    totalSlides = document.querySelector(totalSlidesSelector),
    currentSlide = document.querySelector(currentSlideSelector),
    slidesArr = document.querySelectorAll(slideSelector),
    slider = document.querySelector(sliderSelector),
    sliderWrap = document.querySelector(sliderWrapSelector),
    sliderInner = document.querySelector(sliderInnerSelector),
    sliderWidth = sliderWrap.offsetWidth,
    dotsArr = createSliderNav();
  let slideIndex = 1,
    offset = 0;
  changeActiveDot(slideIndex);
  totalSlides.textContent = formatNums(slidesArr.length);
  currentSlide.textContent = formatNums(slideIndex);
  sliderInner.style.width = 100 * slidesArr.length + '%';
  sliderInner.style.display = 'flex';
  sliderInner.style.transition = '0.5s all';
  sliderWrap.style.overflow = 'hidden';
  slidesArr.forEach(slide => slide.style.width = sliderWidth);
  function formatNums(num) {
    if (num < 10) return `0${num}`;else return num;
  }
  function changeSlide() {
    changeActiveDot(slideIndex);
    currentSlide.textContent = formatNums(slideIndex);
    sliderInner.style.transform = `translateX(${-offset}px)`;
  }
  function createSliderNav() {
    const dotsArr = [];
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-indicators');
    slider.append(dotsContainer);
    slidesArr.forEach((slide, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.dataset.dot = i;
      dotsContainer.append(dot);
      dotsArr.push(dot);
    });
    dotsContainer.addEventListener('click', e => {
      if (e.target.closest('.dot')) {
        const currDotNum = +e.target.dataset.dot;
        offset = sliderWidth * currDotNum;
        slideIndex = currDotNum + 1;
        changeSlide();
      }
    });
    return dotsArr;
  }
  function changeActiveDot(curr) {
    dotsArr.forEach(dot => {
      dot.classList.remove('active');
    });
    dotsArr[curr - 1].classList.add('active');
  }
  nextSlide.addEventListener("click", () => {
    if (offset >= sliderWidth * (slidesArr.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += sliderWidth;
      slideIndex++;
    }
    changeSlide();
  });
  prevSlide.addEventListener("click", () => {
    if (offset === 0) {
      offset = sliderWidth * (slidesArr.length - 1);
      slideIndex = slidesArr.length;
    } else {
      offset -= sliderWidth;
      slideIndex--;
    }
    changeSlide();
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ },

/***/ "./src/js/modules/tabs.js"
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsParentSelector, tabsContentSelector, tabsSelector, activeClass) {
  const tabsParent = document.querySelector(tabsParentSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabs = document.querySelectorAll(tabsSelector);
  function hideTabsContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }
  function showTabsContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add(activeClass);
  }
  hideTabsContent();
  showTabsContent();
  tabsParent.addEventListener("click", e => {
    const target = e.target;
    if (target && target.closest(tabsSelector)) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ },

/***/ "./src/js/modules/timer.js"
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {
  function getTimeRemaining(deadline) {
    let days, hours, minutes, seconds;
    const total = Date.parse(deadline) - Date.now();
    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24)), hours = Math.floor(total / (1000 * 60 * 60) % 24), minutes = Math.floor(total / (1000 * 60) % 60), seconds = Math.floor(total / 1000 % 60);
    }
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  function setTimer(selector, deadline) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    function updateTimer() {
      const total = getTimeRemaining(deadline);
      if (total.total <= 0) clearInterval(timerInterval);
      days.innerHTML = getZero(total.days);
      hours.innerHTML = getZero(total.hours);
      minutes.innerHTML = getZero(total.minutes);
      seconds.innerHTML = getZero(total.seconds);
    }
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  setTimer(timerSelector, deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ },

/***/ "./src/js/services/services.js"
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postForms: () => (/* binding */ postForms)
/* harmony export */ });
const postForms = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await res.json();
};
async function getResource(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return res.json();
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/menu */ "./src/js/modules/menu.js");










window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', '.modal', modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('.modal', '[data-modal]', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    prevSlideSelector: '.offer__slider-prev',
    nextSlideSelector: '.offer__slider-next',
    totalSlidesSelector: '#total',
    currentSlideSelector: '#current',
    slideSelector: '.offer__slide',
    sliderSelector: '.offer__slider',
    sliderWrapSelector: '.offer__slider-wrapper',
    sliderInnerSelector: '.offer__slider-inner'
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2026-11-03');
  (0,_modules_menu__WEBPACK_IMPORTED_MODULE_7__["default"])('.burger', '.header__links', '.header__btn');
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map