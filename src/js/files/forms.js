import { showModal, hiddenModal} from "./modal.js";
import { postData } from "./services/services.js";

export function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(form => {
    bindPostData(form);
  });

  const messages = {
    loading: 'img/spinner.svg',
    succses: 'Данные отправлены',
    failedServer: 'Произошла ошибка на сервере',
    failed: 'Произошла ошибка, попробуйте позже',
  };

  function bindPostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        margin: 0 auto;
        display: block;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          addModalMessaage(messages.succses);
          statusMessage.remove();
        }).catch(() => {
          addModalMessaage(messages.failed); 
        }).finally(() => {
          form.reset();
        });

    });
  }

  function addModalMessaage(message) {
    const modalWindow = document.querySelector('.modal');
    const modalDialog = document.querySelector('.modal__dialog');
    modalDialog.classList.add('_hiddenDisplay');
    showModal('.modal', modalTimerId);

    const modalStatus = document.createElement('div');
    modalStatus.classList.add('modal__dialog');
    modalStatus.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;

    modalWindow.append(modalStatus);

    setTimeout(() => {
      modalStatus.remove();
      modalDialog.classList.remove('_hiddenDisplay');
      modalDialog.classList.add('_show');
      hiddenModal('.modal');
    }, 2000);
  }
}