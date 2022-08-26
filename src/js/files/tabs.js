export function tabs(tabsSelector, tabsContainerSelector, tabsContentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContainer = document.querySelector(tabsContainerSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector);

  function removeTabsActive() {
    tabsContent.forEach(item => {
      item.classList.remove('_active');
    });

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function addTabsActive(i = 0) {
    tabsContent[i].classList.add('_active');
    tabs[i].classList.add(activeClass);
  }

  removeTabsActive();
  addTabsActive();

  tabsContainer.addEventListener("click", e => {
    const targetElement = e.target;

    if (targetElement && targetElement.classList.contains(tabsSelector.slice(1))) {
      removeTabsActive();
      addTabsActive(targetElement.dataset.tab);
    }

  });
}