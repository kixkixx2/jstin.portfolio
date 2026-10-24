export const DESKTOP_LAYOUT_QUERY = '(min-width: 1024px)';

export function isDesktopLayout(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(DESKTOP_LAYOUT_QUERY).matches;
}

export function sectionOffsetInContainer(
  container: HTMLElement,
  sectionEl: HTMLElement,
  axis: 'x' | 'y'
): number {
  const crect = container.getBoundingClientRect();
  const srect = sectionEl.getBoundingClientRect();
  if (axis === 'x') {
    return srect.left - crect.left + container.scrollLeft;
  }
  return srect.top - crect.top + container.scrollTop;
}

export function scrollToSectionInContainer(
  container: HTMLElement,
  sectionEl: HTMLElement,
  behavior: ScrollBehavior = 'smooth'
): void {
  if (isDesktopLayout()) {
    container.scrollTo({
      left: sectionOffsetInContainer(container, sectionEl, 'x'),
      behavior,
    });
  } else {
    container.scrollTo({
      top: sectionOffsetInContainer(container, sectionEl, 'y'),
      behavior,
    });
  }
}
