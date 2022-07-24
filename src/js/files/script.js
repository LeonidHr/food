
document.addEventListener("DOMContentLoaded", () => {

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

  const deadline = '2022-07-30';

  function getTimeDifference(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60);
    
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

});
