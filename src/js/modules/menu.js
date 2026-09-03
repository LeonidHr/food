

function menu(burgerSelector, menuListSelector, btnHeader) {
  if (window.matchMedia("(max-width: 768px)").matches) {
    const burger = document.querySelector(burgerSelector);
    const menu = document.querySelector(menuListSelector);
    const btn = document.querySelector(btnHeader);

    menu.append(btn);

    console.log(213131);

    burger.addEventListener('click', () => {
      document.body.classList.toggle('_active-menu');
    });
  }
}

export default menu;