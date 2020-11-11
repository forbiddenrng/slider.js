class Slider {
  constructor() {
    this.sliderSection = null;
    this.image = null;
    this.prevButton = null;
    this.nextButton = null;
    this.actuallSlide = 0;
    this.imagesArray = null;
    this.styles = null;
    this.dotsContainer = null;
    this.dotsArray = null;
    this.UISelectors = {
      sliderSection: "[data-sliderSection]",
      image: "[data-image]",
      prevButton: "[data-prev]",
      nextButton: "[data-next]",
      dotsContainer: "[data-container]"
    }
  }
  disableButton(button) {
    button.setAttribute("disabled", true);
    button.style.opacity = 0.5;
  }

  ableButton(button) {
    button.removeAttribute("disabled");
    button.style.opacity = 1;
  }
  changeDot(on, off) {
    // console.log(on, off)
    this.dotsArray[on].classList.add("on")
    this.dotsArray[off].classList.remove("on")
  }
  changeSlide(slide, isNext) {
    slide === this.imagesArray.length - 1 ? this.disableButton(this.nextButton) : this.ableButton(this.nextButton);
    slide <= 0 ? this.disableButton(this.prevButton) : this.ableButton(this.prevButton);
    this.image.setAttribute("src", this.imagesArray[slide])
    if (this.styles.dots.enable) {
      this.changeDot(slide, isNext ? slide - 1 : slide + 1)
    }
    isNext ? this.actuallSlide++ : this.actuallSlide--;
  }
  addDotStyles() {
    const style = document.createElement('style');
    const { dotSize, borderSize, color, borderColor, borderStyle, activeDotColor, activeDotBorderColor } = this.styles.dots
    style.innerHTML += `
    .dot{
      width: ${dotSize}px;
      height: ${dotSize}px;
      background-color: ${color};
      display: inline-block;
      margin: 5px;
      border: ${borderSize}px ${borderStyle} ${borderColor};
      border-radius: 50%;
    }
    .dot.on {
      border-color: ${activeDotBorderColor};
      background-color: ${activeDotColor};
    }
    `;
    document.querySelector('head').appendChild(style);

  }
  getData() {
    fetch("./slider/config.json")
      .then(response => response.json())
      .then(data => {
        this.styles = data
        this.setSliderStyles(false)
        if (this.styles.dots.enable) {
          this.createDots();
        }
      })
      .catch(e => {
        console.log(e)
        this.setSliderStyles(true)
      })
  }
  setSliderStyles(isDefault) {
    //BUTTONS
    //colors
    this.prevButton.style.backgroundColor = `${isDefault ? "#0966ff" : this.styles.buttons.background}`;
    this.nextButton.style.backgroundColor = `${isDefault ? "#0966ff" : this.styles.buttons.background}`;
    //prev button size
    this.prevButton.style.width = `${isDefault ? `60px` : `${this.styles.buttons.width}px`}`;
    this.prevButton.style.height = `${isDefault ? `60xp` : `${this.styles.buttons.height}px`}`;
    //next button size
    this.nextButton.style.width = `${isDefault ? `60px` : `${this.styles.buttons.width}px`}`;
    this.nextButton.style.height = `${isDefault ? `60px` : `${this.styles.buttons.height}px`}`;
    //ARROWS
    if (this.styles.buttons.arrows.enable) {
      switch (this.styles.buttons.arrows.type) {
        case "angle": {
          this.prevButton.childNodes[0].classList.add("fa-chevron-left")
          this.nextButton.childNodes[0].classList.add("fa-chevron-right")
          break;
        }
        case "double-angle": {
          this.prevButton.childNodes[0].classList.add("fa-angle-double-left")
          this.nextButton.childNodes[0].classList.add("fa-angle-double-right")
          break;
        }
        case "caret": {
          this.prevButton.childNodes[0].classList.add("fa-caret-left")
          this.nextButton.childNodes[0].classList.add("fa-caret-right")
          break;
        }
        default: {
          this.prevButton.childNodes[0].classList.add("fa-arrow-left")
          this.nextButton.childNodes[0].classList.add("fa-arrow-right")
          break;
        }
      }
      this.nextButton.style.color = `${isDefault ? `white` : `${this.styles.buttons.arrows.color}`}`;
      this.prevButton.style.color = `${isDefault ? `white` : `${this.styles.buttons.arrows.color}`}`;
      this.nextButton.style.fontSize = `${isDefault ? `26px` : `${this.styles.buttons.arrows.size}px`}`;
      this.prevButton.style.fontSize = `${isDefault ? `26px` : `${this.styles.buttons.arrows.size}px`}`;
    }
  }
  createDotsContainer() {
    this.sliderSection.insertAdjacentHTML("beforeend", `
      <div class="dot__container" data-container>
      </div>
    `)
    this.dotsContainer = document.querySelector(this.UISelectors.dotsContainer)
  }
  createDots() {
    this.createDotsContainer()
    const numberOfDots = this.imagesArray.length;
    for (let i = 0; i < numberOfDots; i++) {
      this.dotsContainer.insertAdjacentHTML("beforeend", `
        <div class="dot"></div>
      `)
    }
    this.dotsArray = [...document.querySelectorAll("div.dot")]
    this.dotsArray[this.actuallSlide].classList.add("on")
    this.addDotStyles();
  }
  initializeSlider(array) {
    this.sliderSection = document.querySelector(this.UISelectors.sliderSection)
    this.image = document.querySelector(this.UISelectors.image)
    this.prevButton = document.querySelector(this.UISelectors.prevButton)
    this.nextButton = document.querySelector(this.UISelectors.nextButton)
    this.image.setAttribute("src", array[this.actuallSlide])
    this.imagesArray = Array.from(array)
    this.prevButton.addEventListener("click", () => this.changeSlide(this.actuallSlide - 1, false))
    this.nextButton.addEventListener("click", () => this.changeSlide(this.actuallSlide + 1, true))
    if (this.actuallSlide === 0) {
      this.disableButton(this.prevButton)
    }
    this.getData()
  }


  load(id, array) {
    const rootElement = document.getElementById(id);
    rootElement.insertAdjacentHTML("beforeend", `
      <section class="slider__section" data-sliderSection>
        <img class="slider__image" data-image>
        <button class="prev__button" data-prev><i class="fas"></i></button>
        <button class="next__button" data-next><i class="fas"></i></button>
      </section>
    `)
    this.initializeSlider(array)
  }
}