class Slider {
  constructor() {
    this.image = null;
    this.prevButton = null;
    this.nextButton = null;
    this.actuallSlide = 0;
    this.imagesArray = null;
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
    slide === 0 ? this.disableButton(this.prevButton) : this.ableButton(this.prevButton);
    this.image.setAttribute("src", this.imagesArray[slide])
    isNext ? this.actuallSlide++ : this.actuallSlide--;
  }
  initializeSlider(array) {
    this.image = document.querySelector(this.UISelectors.image)
    this.prevButton = document.querySelector(this.UISelectors.prevButton)
    this.nextButton = document.querySelector(this.UISelectors.nextButton)
    this.image.setAttribute("src", array[this.actuallSlide])
    this.imagesArray = Array.from(array)
    this.prevButton.addEventListener("click", () => this.changeSlide(this.actuallSlide - 1, false))
    this.nextButton.addEventListener("click", () => this.changeSlide(this.actuallSlide + 1, true))
  }


  load(id, array) {
    const rootElement = document.getElementById(id);
    rootElement.insertAdjacentHTML("beforeend", `
      <section class="slider__section">
        <img class="slider__image" data-image>
        <button class="prev__button" data-prev><i class="fas fa-arrow-left"></i></button>
        <button class="next__button" data-next><i class="fas fa-arrow-right"></i></button>
      </section>
    `)
    this.initializeSlider(array)
  }
}