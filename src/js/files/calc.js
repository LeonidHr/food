export function calc() {
  const calcResult = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;


  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'woman';
    localStorage.setItem('sex', 'woman');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }


  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      calcResult.textContent = '_____';
      return;
    }

    if (sex === 'woman') {
      calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }

  }
  calcTotal();

  function initCalcStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }
  initCalcStaticInfo('#gender div', 'calculating__choose-item_active');
  initCalcStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

  function getCalcStaticInfo(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);

    document.querySelector(parentSelector).addEventListener("click", e => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
        localStorage.setItem('ratio', ratio);
      } else {
        sex = e.target.getAttribute('id');
        localStorage.setItem('sex', sex);
      }

      elements.forEach(item => {
        if (e.target == item) {
          elements.forEach(elem => {
            elem.classList.remove(activeClass);
          }); 
          e.target.classList.add(activeClass);
        }
      });
      calcTotal();
    });
  }
  getCalcStaticInfo('#gender', 'calculating__choose-item_active');
  getCalcStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border= '1px solid red';
        input.style.color = 'red';
      } else {
        input.style.border = 'none';
        input.style.color = '#000';
      }

      switch(input.getAttribute('id')) {
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
  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
}