import { getResource } from "../services/services";

function cards() {
   class MenuCard {
    constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
      this.img = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;

      this.parent = document.querySelector(parentSelector);
      this.transfer = 45;

      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const div = document.createElement('div');

      if (this.classes.length) {
        this.classes.forEach(className => div.classList.add(className));
      } else {
        this.classes = 'menu__item';
        div.classList.add(this.classes);
      }

      div.innerHTML = `
        <div class="menu__item" bis_skin_checked="1">
          <img src="${this.img}" alt="${this.altimg}">
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr" bis_skin_checked="1">
            ${this.descr}
          </div>
          <div class="menu__item-divider" bis_skin_checked="1"></div>
          <div class="menu__item-price" bis_skin_checked="1">
              <div class="menu__item-cost" bis_skin_checked="1">Цена:</div>
              <div class="menu__item-total" bis_skin_checked="1"><span>${this.price}</span> грн/день</div>
          </div>
        </div>
      `;

      this.parent.append(div);
    }
  }

  getResource('./db.json')
    .then(data => {
      data.menu.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
      });
    });
}

export default cards;