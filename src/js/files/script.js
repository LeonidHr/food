
document.addEventListener("DOMContentLoaded", () => {

  //* delegation click========================================
  document.addEventListener("click", e => {
    const targetElement = e.target;

    if (targetElement.closest('[data-modal]')) {
      showModal();           
    }
    if (
      targetElement.closest('[data-close]') || 
      !targetElement.closest('.modal__dialog') && 
      !targetElement.closest('[data-modal]')
      ) {
      hiddenModal();
    }
  });

  //* delegation keydown=======================================================
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modalWindow.classList.contains('_show')) {
      hiddenModal();
    }
  });

  //* tabs=====================================================================

  const tabsHeader = document.querySelectorAll('.tabheader__item'),
        tabsHeaderContainer = document.querySelector('.tabheader__items'),
        tabsHeaderContent = document.querySelectorAll('.tabcontent');

  function removeTabsActive() {
    tabsHeaderContent.forEach(item => {
      item.classList.remove('_active');
    });

    tabsHeader.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function addTabsActive(i = 0) {
    tabsHeaderContent[i].classList.add('_active');
    tabsHeader[i].classList.add('tabheader__item_active');
  }

  removeTabsActive();
  addTabsActive();

  tabsHeaderContainer.addEventListener("click", e => {
    const targetElement = e.target;

    if (targetElement && targetElement.classList.contains('tabheader__item')) {
      removeTabsActive();
      addTabsActive(targetElement.dataset.tab);
    }

  });

  //* counter========================================================================

  const deadline = '2022-08-01';

  function getTimeDifference(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0; 
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / (1000 * 60) % 60),
      seconds = Math.floor(t / 1000 % 60);
    }
    
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  }

  function addZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
 
  function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timerId = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeDifference(endtime);

      days.innerHTML = addZero(t.days);
      hours.innerHTML = addZero(t.hours);
      minutes.innerHTML = addZero(t.minutes);
      seconds.innerHTML = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timerId);
      }
    }
  }

  setClock('.timer', deadline);

  //* modal ===================================================================
  const modalWindow = document.querySelector('.modal');

  function hiddenModal() {
    modalWindow.classList.remove('_show');
    document.body.style.overflow = '';
  }

  function showModal() {
    modalWindow.classList.add('_show');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  }

  const modalTimerId = setTimeout(showModal, 10000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
});
