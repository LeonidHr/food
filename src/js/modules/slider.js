

function slider({
  prevSlideSelector,
  nextSlideSelector,
  totalSlidesSelector,
  currentSlideSelector,
  slideSelector,
  sliderSelector,
  sliderWrapSelector,
  sliderInnerSelector
}) {
  const prevSlide = document.querySelector(prevSlideSelector),
        nextSlide = document.querySelector(nextSlideSelector),
        totalSlides = document.querySelector(totalSlidesSelector),
        currentSlide = document.querySelector(currentSlideSelector),
        slidesArr = document.querySelectorAll(slideSelector),
        slider = document.querySelector(sliderSelector),
        sliderWrap = document.querySelector(sliderWrapSelector),
        sliderInner = document.querySelector(sliderInnerSelector),
        sliderWidth = sliderWrap.offsetWidth,
        dotsArr = createSliderNav();
  let slideIndex = 1,
      offset = 0,
      startX = 0,
      endX = 0;

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

  function showNextSlide() {
   if (offset >= sliderWidth * (slidesArr.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += sliderWidth;
      slideIndex++;
    }

    changeSlide();
  }

  function showPrevSlide() { 
    if (offset === 0 ) {
      offset = sliderWidth * (slidesArr.length - 1);
      slideIndex = slidesArr.length;
    } else {
      offset -= sliderWidth;
      slideIndex--;
    }

    changeSlide();
  }

  nextSlide.addEventListener("click", showNextSlide);
  prevSlide.addEventListener("click", showPrevSlide);

  sliderWrap.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  sliderWrap.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;
  
    const difference = startX - endX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
      showNextSlide();
    } else {  
      showPrevSlide();
    }
  });
}

export default slider;