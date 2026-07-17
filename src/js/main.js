"use strict";

window.addEventListener("DOMContentLoaded", () => {

  //* Tabs ====================================================

  const tabsParent = document.querySelector('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item');

  function hideTabsContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabsContent();
  showTabsContent();


  tabsParent.addEventListener("click", e => {
    const target = e.target;

    if (target && target.closest('.tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });

  //* Timer ====================================================

  const deadline = '2026-07-20';

  function getTimeRemaining(deadline) {
    let days, hours, minutes, seconds;
    const total = Date.parse(deadline) - Date.now();

    if (total <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((total / (1000 * 60)) % 60),
      seconds = Math.floor((total / 1000) % 60);
    }

    return {total, days, hours, minutes, seconds};
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

  setTimer('.timer', deadline);

  //* Modal ====================================================

  const modal = document.querySelector('.modal'),
        modalTriggers = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modalTimerId = setTimeout(() => toggleModal('show'), 10000);


  function toggleModal(type) {
    modal.classList.toggle('show');

    if (type === 'show') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    clearTimeout(modalTimerId);
  }

  function showModalByScroll() {
    const docEl = document.documentElement;

    if (window.pageYOffset + docEl.clientHeight >= docEl.scrollHeight - 1) {
      toggleModal('show');
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => toggleModal('show'));
  });

  modalCloseBtn.addEventListener("click", () => toggleModal('close'));

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      toggleModal('close');
    }
  });

  document.addEventListener("keydown", e => {
    if (e.code === 'Escape') {
      toggleModal('close');
    }
  });

  window.addEventListener("scroll", showModalByScroll);

  //* Cards ====================================================

  class MenuCard {
    constructor(src, title, descr, price, parentSelector) {
      this.src = src;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 45;

      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      this.parent.insertAdjacentHTML("beforeend", `
        <div class="menu__item" bis_skin_checked="1">
          <img src="${this.src}" alt="${this.title}">
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
      `);
    }
  }

  new MenuCard(
    '../img/tabs/vegy.jpg', 
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu__field .container'
  ).render();
  new MenuCard(
    '../img/tabs/elite.jpg', 
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    15,
    '.menu__field .container'
  ).render();
  new MenuCard(
    '../img/tabs/post.jpg', 
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    11,
    '.menu__field .container'
  ).render();



});