window.addEventListener("DOMContentLoaded", () => {

  const tabsParent = document.querySelector('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item');

  function hideTabsContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabsContent();
  showTabsContent();


  tabsParent.addEventListener("click", e => {
    const target = e.target;

    if (target && target.closest('.tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });
});