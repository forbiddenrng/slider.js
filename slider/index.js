class Slider {
  constructor() {
    this.image = null;
    this.prevButton = null;
    this.nextButton = null;
    this.actuallSlide = 0;
    this.imagesArray = null;
    this.styles = null;
    this.UISelectors = {
      image: "[data-image]",
      prevButton: "[data-prev]",
      nextButton: "[data-next]",
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

  changeSlide(slide, isNext) {
    slide === this.imagesArray.length - 1 ? this.disableButton(this.nextButton) : this.ableButton(this.nextButton);
    slide <= 0 ? this.disableButton(this.prevButton) : this.ableButton(this.prevButton);
    this.image.setAttribute("src", this.imagesArray[slide])
    isNext ? this.actuallSlide++ : this.actuallSlide--;
  }
  getData() {
    fetch("./slider/config.json")
      .then(response => response.json())
      .then(data => {
        this.styles = data
        this.setSliderStyles(false)
      })
      .catch(e => {
        console.log(e)
        this.setSliderStyles(true)
      })
  }
  setSliderStyles(isDefault) {
    //BUTTONS
    //colors
    this.prevButton.style.backgroundColor = `${isDefault ? "#0966ff" : this.styles.styles.buttons.background}`;
    this.nextButton.style.backgroundColor = `${isDefault ? "#0966ff" : this.styles.styles.buttons.background}`;
    //prev button size
    this.prevButton.style.width = `${isDefault ? `60px` : `${this.styles.styles.buttons.width}px`}`;
    this.prevButton.style.height = `${isDefault ? `60xp` : `${this.styles.styles.buttons.height}px`}`;
    //next button size
    this.nextButton.style.width = `${isDefault ? `60px` : `${this.styles.styles.buttons.width}px`}`;
    this.nextButton.style.height = `${isDefault ? `60xp` : `${this.styles.styles.buttons.height}px`}`;
    //ARROWS
    switch (this.styles.styles.buttons.arrows.type) {
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
  }

  initializeSlider(array) {
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
      <section class="slider__section">
        <img class="slider__image" data-image>
        <button class="prev__button" data-prev><i class="fas"></i></button>
        <button class="next__button" data-next><i class="fas"></i></button>
      </section>
    `)
    this.initializeSlider(array)
  }
}