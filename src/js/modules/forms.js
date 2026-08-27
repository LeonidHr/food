import { openModal, closeModal } from "./modal";
import { postForms } from "../services/services";

function forms(formSelector, modalSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const messages = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...'
  }

  forms.forEach(form => {
    bindPostForms(form);
  });

  function bindPostForms(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;  

      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postForms('http://localhost:3000/requests', json)
      .then(data => {
        showThanksMessage(messages.success);
        console.log(data);
      }).catch(() => {
        showThanksMessage(messages.failure);
      }).finally(() => {
        statusMessage.remove();
        form.reset();
      })
    });
  }

  function showThanksMessage(message) {
    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    openModal(modalSelector, modalTimerId);
  
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');

    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
  
    document.querySelector('.modal').append(thanksModal);
  
    setTimeout(() => {
      thanksModal.remove();
      closeModal(modalSelector);
      prevModal.classList.remove('hide');
    }, 4000);
  }
}

export default forms;