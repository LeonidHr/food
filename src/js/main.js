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
        modalTimerId = setTimeout(() => openModal(), 30000);

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModalByScroll() {
    const docEl = document.documentElement;

    if (window.pageYOffset + docEl.clientHeight >= docEl.scrollHeight - 1) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => openModal());
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  });

  window.addEventListener("scroll", showModalByScroll);

  //* Cards ====================================================

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

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
      });
    });

  //* Forms ====================================================

  const forms = document.querySelectorAll('form');

  const messages = {
    loading: '../img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }

  forms.forEach(form => {
    bindPostForms(form);
  });

  const postForms = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await res.json();
  }

  async function getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  }

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

      postForms('http://localhost:3000/requests', json)
      .then(data => {
        showThanksMessage(messages.success);
        console.log(data);
      }).catch(() => {
        showThanksMessage(messages.failure);
      }).finally(() => {
        statusMessage.remove();
        form.reset();
      })
    });
  }

  function showThanksMessage(message) {
    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    openModal();
  
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
      closeModal();
      prevModal.classList.remove('hide');
    }, 4000);
  }

  //* Slider ====================================================

  const prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        totalSlides = document.querySelector('#total'),
        currentSlide = document.querySelector('#current'),
        slidesArr = document.querySelectorAll('.offer__slide'),
        sliderWrap = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        sliderWidth = sliderWrap.offsetWidth;
    let slideIndex = 1,
        offset = 0;

    function formatNums(num) {
      if (num < 10) return `0${num}`;
      else return num;
    }

    totalSlides.textContent = formatNums(slidesArr.length);
    currentSlide.textContent = formatNums(slideIndex);

    sliderInner.style.width = 100 * slidesArr.length + '%';
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';
    sliderWrap.style.overflow = 'hidden';

    slidesArr.forEach(slide => slide.style.width = sliderWidth);

    nextSlide.addEventListener("click", () => {
      if (offset >= sliderWidth * (slidesArr.length - 1)) {
        offset = 0;
        slideIndex = 1;
      } else {
        offset += sliderWidth;
        slideIndex++;
      }

      currentSlide.textContent = formatNums(slideIndex);
      sliderInner.style.transform = `translateX(${-offset}px)`;
    });

    prevSlide.addEventListener("click", () => {
      if (offset === 0 ) {
        offset = sliderWidth * (slidesArr.length - 1);
        slideIndex = slidesArr.length;
      } else {
        offset -= sliderWidth;
        slideIndex--;
      }

      currentSlide.textContent = formatNums(slideIndex);
      sliderInner.style.transform = `translateX(${-offset}px)`;
    });
});