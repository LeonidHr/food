

function tabs(tabsParentSelector, tabsContentSelector, tabsSelector, activeClass) {
  const tabsParent = document.querySelector(tabsParentSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabs = document.querySelectorAll(tabsSelector);

  function hideTabsContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabsContent(i = 0) {
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add(activeClass);
  }

  hideTabsContent();
  showTabsContent();


  tabsParent.addEventListener("click", e => {
    const target = e.target;

    if (target && target.closest(tabsSelector)) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabsContent();
          showTabsContent(i);
        }
      });
    }
  });
}

export default tabs;