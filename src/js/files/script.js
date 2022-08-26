import * as tabs from "./tabs.js";
import * as slider from "./slider.js";
import * as counter from "./counter.js";
import * as modal from "./modal.js";
import * as cards from "./cards.js";
import * as forms from "./forms.js";
import * as calc from "./calc.js";

document.addEventListener("DOMContentLoaded", () => {

  //* delegation click========================================
  document.addEventListener("click", e => {
    const targetElement = e.target;

    if (targetElement.closest('[data-modal]')) {
      modal.showModal('.modal');           
    }
    if (
      targetElement.closest('[data-close]') || 
      !targetElement.closest('.modal__dialog') && 
      !targetElement.closest('[data-modal]')
      ) {
      modal.hiddenModal('.modal');
    }
  });

  //* delegation keydown=======================================================
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && document.querySelector('.modal').classList.contains('_show')) {
      modal.hiddenModal();
    }
  });

  const modalTimerId = setTimeout(() => modal.showModal('.modal', modalTimerId), 100000000000);

  //* tabs=====================================================================
  tabs.tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
  //* counter========================================================================
  counter.counter('.timer', '2022-09-04');
  //* modal ===================================================================
  modal.modal('.modal', modalTimerId);
  //* add on document menu card ========================================
  cards.cards();
  //* forms =====================================================================
  forms.forms('form', modalTimerId);
  //* calc================================================================================
  calc.calc();
  //*slider=====================================================================
  slider.slider({
    currNum: "#current",
    dotsWrapper: ".carousel-indicators",
    totalNumber: "#total",
    slidesSelector: ".offer__slide",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
    prev: '.offer__slider-prev',
    next: '.offer__slider-next',
  });
});

