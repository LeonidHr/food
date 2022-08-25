export function tabs() {
  const tabsHeader = document.querySelectorAll('.tabheader__item'),
        tabsHeaderContainer = document.querySelector('.tabheader__items'),
        tabsHeaderContent = document.querySelectorAll('.tabcontent');

  function removeTabsActive() {
    tabsHeaderContent.forEach(item => {
      item.classList.remove('_active');
    });

    tabsHeader.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function addTabsActive(i = 0) {
    tabsHeaderContent[i].classList.add('_active');
    tabsHeader[i].classList.add('tabheader__item_active');
  }

  removeTabsActive();
  addTabsActive();

  tabsHeaderContainer.addEventListener("click", e => {
    const targetElement = e.target;

    if (targetElement && targetElement.classList.contains('tabheader__item')) {
      removeTabsActive();
      addTabsActive(targetElement.dataset.tab);
    }

  });
}