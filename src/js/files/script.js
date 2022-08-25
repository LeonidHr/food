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
      modal.showModal();           
    }
    if (
      targetElement.closest('[data-close]') || 
      !targetElement.closest('.modal__dialog') && 
      !targetElement.closest('[data-modal]')
      ) {
      modal.hiddenModal();
    }
  });

  //* delegation keydown=======================================================
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && document.querySelector('.modal').classList.contains('_show')) {
      modal.hiddenModal();
    }
  });

  //* tabs=====================================================================
  tabs.tabs();
  //* counter========================================================================
  counter.counter();
  //* modal ===================================================================
  modal.modal();
  //* add on document menu card ========================================
  cards.cards();
  //* forms =====================================================================
  forms.forms();
  //* calc================================================================================
  calc.calc();
  //*slider=====================================================================
  slider.slider();
});

