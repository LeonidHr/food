

function slider() {
  const prevSlide = document.querySelector('.offer__slider-prev'),
        nextSlide = document.querySelector('.offer__slider-next'),
        totalSlides = document.querySelector('#total'),
        currentSlide = document.querySelector('#current'),
        slidesArr = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        sliderWrap = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        sliderWidth = sliderWrap.offsetWidth,
        dotsArr = createSliderNav();
  let slideIndex = 1,
      offset = 0;

  changeActiveDot(slideIndex);

  totalSlides.textContent = formatNums(slidesArr.length);
  currentSlide.textContent = formatNums(slideIndex);

  sliderInner.style.width = 100 * slidesArr.length + '%';
  sliderInner.style.display = 'flex';
  sliderInner.style.transition = '0.5s all';
  sliderWrap.style.overflow = 'hidden';

  slidesArr.forEach(slide => slide.style.width = sliderWidth);

  function formatNums(num) {
    if (num < 10) return `0${num}`;
    else return num;
  }

  function changeSlide() {
    changeActiveDot(slideIndex);
    currentSlide.textContent = formatNums(slideIndex);
    sliderInner.style.transform = `translateX(${-offset}px)`;
  }

  function createSliderNav() {
    const dotsArr = [];
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('carousel-indicators');
    slider.append(dotsContainer);

    slidesArr.forEach((slide, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.dataset.dot = i;
      dotsContainer.append(dot);
      dotsArr.push(dot);
    });

    dotsContainer.addEventListener('click', e => {
      if (e.target.closest('.dot')) {
        const currDotNum = +e.target.dataset.dot;
        offset = sliderWidth * currDotNum;       
        slideIndex = currDotNum + 1;

        changeSlide();
      }
    });

    return dotsArr;
  }

  function changeActiveDot(curr) {
    dotsArr.forEach(dot => {
      dot.classList.remove('active');
    }); 

    dotsArr[curr - 1].classList.add('active');
  }

  nextSlide.addEventListener("click", () => {
    if (offset >= sliderWidth * (slidesArr.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += sliderWidth;
      slideIndex++;
    }

    changeSlide();
  });

  prevSlide.addEventListener("click", () => {
    if (offset === 0 ) {
      offset = sliderWidth * (slidesArr.length - 1);
      slideIndex = slidesArr.length;
    } else {
      offset -= sliderWidth;
      slideIndex--;
    }

    changeSlide();
  });
}

module.exports = slider;