function showModal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.add('_show');
  modalWindow.classList.remove('_hidden');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearTimeout(modalTimerId);
  }
}

function hiddenModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);

  modalWindow.classList.remove('_show');
  modalWindow.classList.add('_hidden');
  document.body.style.overflow = '';
}

export function modal(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal('.modal', modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { showModal, hiddenModal };