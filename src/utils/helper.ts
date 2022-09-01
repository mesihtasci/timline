export const htmlToElement = (htmlText: string): HTMLElement => {
  const element = document.createElement('template');
  htmlText = htmlText.trim();
  element.innerHTML = htmlText;
  return element.content.firstChild as HTMLElement;
};

export const elementInViewport = (element: HTMLElement) => {
  const bounding = element.getBoundingClientRect();

  if (bounding.top >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
    return true;
  } else {
    return false;
  }
}

export const isElementPartiallyVisibly = (element: HTMLElement) => {
  const bounding = element.getBoundingClientRect();
  const elementHeight = element.offsetHeight;

  if (bounding.top >= -elementHeight
    && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elementHeight) {

    return true;
  }

  return false;
}

export const isElementOutOfViewport = (element: HTMLElement) => {
  const bounding = element.getBoundingClientRect();

  if (bounding.bottom + bounding.height < 0) {
    return true;
  }

  return false;
}