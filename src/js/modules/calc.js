


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

      if (element.id === localStorage.getItem('sex') ||
          element.dataset.ratio === localStorage.getItem('ratio')) {
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
      result.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * ratio);
    } else {
      result.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * ratio);
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
        })

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
      
      switch(input.id) {
        case('height'):
          height = +input.value;
          break;
        case('weight'):
          weight = +input.value;
          break;
        case('age'):
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

module.exports = calc;