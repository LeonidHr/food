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

});


