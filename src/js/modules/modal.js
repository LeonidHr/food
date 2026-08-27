

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearTimeout(modalTimerId);
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(modalSelector, modalTriggersSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector),
        modalTriggers = document.querySelectorAll(modalTriggersSelector);

  function showModalByScroll() {
    const docEl = document.documentElement;

    if (window.pageYOffset + docEl.clientHeight >= docEl.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.code === 'Escape') {
      closeModal(modalSelector);
    }
  });

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {openModal, closeModal};