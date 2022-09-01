import { htmlToElement, elementInViewport, isElementOutOfViewport } from './utils/helper.js';

export default class Timeline {
  container: null | HTMLElement = null;
  events: [] | HTMLElement[] = [];
  visibleEvents: [] | HTMLElement[] = [];

  constructor() {
    this.init();
  }

  init() {
    this.container = document.querySelector('.mt-ts');

    if (this.container) {
      this.events = this.container.querySelectorAll('.mt-ts__event') as any as HTMLElement[];
      window.addEventListener('scroll', () => this.checkVisibility());
    }

    this.checkVisibility();
  };

  calculateTimelinePosition() {
    if (this.container) {

      this.visibleEvents = this.container.querySelectorAll('.mt-ts__event--visible') as any as HTMLElement[];

      if (this.visibleEvents.length > 0) {
        return this.visibleEvents[this.visibleEvents.length - 1].offsetTop;
      }

    }

    return 0;
  };

  setTimelinePosition(yPosition: number) {
    console.log(yPosition)
    const timeLine = document.querySelector('.mt-ts') as HTMLElement;

    if (timeLine)
      timeLine.style.setProperty('--timeline-current-position-height', (yPosition).toString() + "px");
  }

  checkVisibility() {
    const allEvents = document.querySelectorAll('.mt-ts__event');
    let eventVisibilityHasChanged = false;
    allEvents.forEach((event) => {
      if (elementInViewport(event as HTMLElement)) {
        if (!event.classList.contains('mt-ts__event--visible')) {
          event.classList.add('mt-ts__event--visible');
          eventVisibilityHasChanged = true;
        }
      } else {
        if (event.classList.contains('mt-ts__event--visible')) {
          event.classList.remove('mt-ts__event--visible');
          eventVisibilityHasChanged = true;
        }
      }

    })

    //if (eventVisibilityHasChanged) {

    this.setTimelinePosition(this.calculateTimelinePosition());
    //}

  };

}