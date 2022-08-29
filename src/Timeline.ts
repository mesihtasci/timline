import { htmlToElement, elementInViewport } from './utils/helper.js';

export default class Timeline {

  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('scroll', this.checkVisibility);
    this.checkVisibility();
  }

  checkVisibility() {
    const allEvents = document.querySelectorAll('.mt-ts__event');
    allEvents.forEach((event) => {
      if (elementInViewport(event as HTMLElement)) {
        console.log("viewport")
        event.classList.add('mt-ts__event--visible');
      } else {
        event.classList.remove('mt-ts__event--visible');
      }

    })
  }
}