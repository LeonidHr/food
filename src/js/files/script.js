import axios from "axios";

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

    if (targetElement.closest('.offer__slider-prev')) {
      getPrevSlide();
    }
    if (targetElement.closest('.offer__slider-next')) {
      getNextSlide();
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

  const deadline = '2022-08-05';

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
    modalWindow.classList.add('_hidden');
    document.body.style.overflow = '';
  }

  function showModal() {
    modalWindow.classList.add('_show');
    modalWindow.classList.remove('_hidden');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  }

  const modalTimerId = setTimeout(showModal, 5000000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  //* add on document menu card ========================================

  class MenuCard {
    constructor(src, alt, title, text, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 37;
      this.changeToUAN();
    }

    changeToUAN() {
      this.price = this.transfer * this.price;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.text}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  // const getResource = async (url) => {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  //   }

  //   return await res.json();
  // };

  // getResource('http://localhost:3000/menu')
    // .then(data => {
    //   data.forEach(({img, altimg, title, descr, price}) => {
    //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //   });
    // });

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  //* forms =====================================================================

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    bindPostData(form);
  });

  const messages = {
    loading: 'img/spinner.svg',
    succses: 'Данные отправлены',
    failedServer: 'Произошла ошибка на сервере',
    failed: 'Произошла ошибка, попробуйте позже',
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      }, 
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        margin: 0 auto;
        display: block;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          addModalMessaage(messages.succses);
          statusMessage.remove();
        }).catch(() => {
          addModalMessaage(messages.failed); 
        }).finally(() => {
          form.reset();
        });

    });
  }

  function addModalMessaage(message) {
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('_hiddenDisplay');
    showModal();

    const modalStatus = document.createElement('div');
    modalStatus.classList.add('modal__dialog');
    modalStatus.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

    modalWindow.append(modalStatus);

    setTimeout(() => {
      modalStatus.remove();
      modalDialog.classList.remove('_hiddenDisplay');
      modalDialog.classList.add('_show');
      hiddenModal();
    }, 2000);
  }

  //* slider ===============================================================================
  const currentNum = document.querySelector('#current'),
        totalNum = document.querySelector('#total'),
        dotsContainer = document.querySelector('.carousel-indicators'),
        slides = document.querySelectorAll('.offer__slide'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        slidesWidth = window.getComputedStyle(slidesWrapper).width;

  let offset = 0;

  currentNum.innerHTML = addZero(currentNum.innerHTML);
  totalNum.innerHTML = addZero(slides.length);

  slidesField.style.width = 100 * slides.length + '%';
  slides.forEach(slide => {
    slide.style.width = slidesWidth;
  });

  const dots = [];

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.setAttribute('data-dot', i + 1);
    dotsContainer.append(dot);
    dots.push(dot);
  }

  function addDotActive() {
    dots.forEach(dot => {
      dot.classList.remove('_active');
    });
    dots[parseInt(currentNum.innerHTML) - 1].classList.add('_active');
  }
  addDotActive();

  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      const slidesTo = e.target.dataset.dot;

      currentNum.innerHTML = addZero(slidesTo);

      addDotActive();

      offset = parseInt(slidesWidth) * (slidesTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
    });
  });

  function getPrevSlide() {
    --currentNum.innerHTML;
    
    if (currentNum.innerHTML == 0) {
      currentNum.innerHTML = slides.length;
    }
    currentNum.innerHTML = addZero(currentNum.innerHTML);

    if (offset == 0) {
      offset = parseInt(slidesWidth) * (slides.length - 1);
    } else {
      offset -= parseInt(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    addDotActive();
  }

  function getNextSlide() {
    ++currentNum.innerHTML;
    if (+currentNum.innerHTML > (+totalNum.innerHTML)) {
      currentNum.innerHTML = 1;
    }
    currentNum.innerHTML = addZero(currentNum.innerHTML);
  
    if (offset == parseInt(slidesWidth) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseInt(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    addDotActive();
  }

});

