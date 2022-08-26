export function slider({dotsWrapper, slidesSelector, wrapper, field, totalNumber, currNum, prev, next}) {

  const currentNum = document.querySelector(currNum),
    totalNum = document.querySelector(totalNumber),
    dotsContainer = document.querySelector(dotsWrapper),
    slides = document.querySelectorAll(slidesSelector),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    slidesWidth = window.getComputedStyle(slidesWrapper).width;

  let offset = 0;

  function addZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  currentNum.innerHTML = addZero(currentNum.innerHTML);
  totalNum.innerHTML = addZero(slides.length);

  slidesField.style.width = 100 * slides.length + "%";
  slides.forEach((slide) => {
    slide.style.width = slidesWidth;
  });

  const dots = [];

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");
    dot.setAttribute("data-dot", i + 1);
    dotsContainer.append(dot);
    dots.push(dot);
  }

  function addDotActive() {
    dots.forEach((dot) => {
      dot.classList.remove("_active");
    });
    dots[parseInt(currentNum.innerHTML) - 1].classList.add("_active");
  }
  addDotActive();

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slidesTo = e.target.dataset.dot;

      currentNum.innerHTML = addZero(slidesTo);

      addDotActive();

      offset = parseInt(slidesWidth) * (slidesTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
    });
  });

  function getPrevSlide() {
    --currentNum.innerHTML;

    if (currentNum.innerHTML == 0) {
      currentNum.innerHTML = slides.length;
    }
    currentNum.innerHTML = addZero(currentNum.innerHTML);

    if (offset == 0) {
      offset = parseInt(slidesWidth) * (slides.length - 1);
    } else {
      offset -= parseInt(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    addDotActive();
  }
  function getNextSlide() {
    ++currentNum.innerHTML;
    if (+currentNum.innerHTML > +totalNum.innerHTML) {
      currentNum.innerHTML = 1;
    }
    currentNum.innerHTML = addZero(currentNum.innerHTML);

    if (offset == parseInt(slidesWidth) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += parseInt(slidesWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    addDotActive();
  }

  document.querySelector(prev).addEventListener("click", getPrevSlide);
  document.querySelector(next).addEventListener("click", getNextSlide);
}
