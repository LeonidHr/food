"use strict";

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import menu from './modules/menu';

window.addEventListener("DOMContentLoaded", () => {
  
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

  calc();
  cards();
  forms('form', '.modal', modalTimerId);
  modal('.modal', '[data-modal]', modalTimerId);
  slider({
    prevSlideSelector: '.offer__slider-prev',
    nextSlideSelector: '.offer__slider-next',
    totalSlidesSelector: '#total',
    currentSlideSelector: '#current',
    slideSelector: '.offer__slide',
    sliderSelector: '.offer__slider',
    sliderWrapSelector: '.offer__slider-wrapper',
    sliderInnerSelector: '.offer__slider-inner'
  });
  tabs('.tabheader__items', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
  timer('.timer', '2026-11-03');
  menu('.burger', '.header__links', '.header__btn');
});
