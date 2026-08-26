

function modal() {
  const modal = document.querySelector('.modal'),
        modalTriggers = document.querySelectorAll('[data-modal]'),
        modalTimerId = setTimeout(() => openModal(), 30000);

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModalByScroll() {
    const docEl = document.documentElement;

    if (window.pageYOffset + docEl.clientHeight >= docEl.scrollHeight - 1) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => openModal());
  });

  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  });

  window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;