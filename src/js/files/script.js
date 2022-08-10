
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

  new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и
    фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким
    качеством!`,
    7,
    '.menu .container',
  ).render();

  new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и
    качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    16,
    '.menu .container',
    'menu__item',
  ).render();

  new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов
    животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет
    тофу и импортных вегетарианских стейков.`,
    13,
    '.menu .container',
    'menu__item'
  ).render();


  //* forms =====================================================================

  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    postData(form);
  });

  const messages = {
    loading: 'img/spinner.svg',
    succses: 'Данные отправлены',
    failedServer: 'Произошла ошибка на сервере',
    failed: 'Произошла ошибка, попробуйте позже',
  };

  function postData(form) {
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

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      fetch('http://food/dist/files/server.php', {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(object),
      })
      .then(data => data.text())
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
});




// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify({name: 'Alex'}),
//     headers: {
//       'Content-type': 'application/json',
//     },
//   })
//     .then(response => response.json())
//     .then(json => console.log(json));
