import { htmlToElement, elementInViewport, isElementOutOfViewport } from './utils/helper.js';

export default class Timeline {
  container: null | HTMLElement = null;
  contentWrapper: null | HTMLElement = null;
  events: [] | HTMLElement[] = [];
  visibleEvents: [] | HTMLElement[] = [];

  constructor() {
    this.init();
  }

  init() {
    this.container = document.querySelector('.mt-ts__container');

    if (this.container) {
      this.contentWrapper = this.container!.querySelector('.mt-ts__content-wrapper')

      this.events = this.container.querySelectorAll('.mt-ts__event') as any as HTMLElement[];
      window.addEventListener('scroll', (event) => {
        this.checkVisibility();


        if (this.contentWrapper) {
          const scrollHeightPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
          const translateY = (scrollHeightPercentage / 100) * document.documentElement.clientHeight

          this.contentWrapper.style.transform = `translateY(-${translateY}px)`
        }



      });
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