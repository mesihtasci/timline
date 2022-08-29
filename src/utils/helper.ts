export const htmlToElement = (htmlText: string): HTMLElement => {
  const element = document.createElement('template');
  htmlText = htmlText.trim();
  element.innerHTML = htmlText;
  return element.content.firstChild as HTMLElement;
};

export const elementInViewport = (element: HTMLElement) =>  {
  const bounding = element.getBoundingClientRect();

  if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
      return true;
  } else {
      return false;
  }
}