export function modal() {
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
}

export function showModal() {
  const modalWindow = document.querySelector('.modal');
  const modalTimerId = setTimeout(showModal, 5000000);

  modalWindow.classList.add('_show');
  modalWindow.classList.remove('_hidden');
  document.body.style.overflow = 'hidden';
  clearTimeout(modalTimerId);
}

export function hiddenModal() {
  const modalWindow = document.querySelector('.modal');

  modalWindow.classList.remove('_show');
  modalWindow.classList.add('_hidden');
  document.body.style.overflow = '';
}