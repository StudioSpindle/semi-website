/**
 * toggle the visibility and aria-expanded attribute
 * @param el
 */
const toggleVisibility = el => {
  if (el.style.display === 'block') {
    // eslint-disable-next-line
    el.style.display = 'none';
    el.setAttribute('aria-expanded', 'false');
  } else {
    // eslint-disable-next-line
    el.style.display = 'block';
    el.setAttribute('aria-expanded', 'true');
  }
};

/**
 * A module representing the toggler
 */
export default function(attribute) {
  const trigger = document.querySelectorAll(`[${attribute}]`);
  if (typeof trigger !== 'undefined' && trigger.length !== 0) {
    // only supports one trigger element at the moment
    if (trigger.length > 1) {
      // eslint-disable-next-line
      console.log('Can only contain one trigger and target element on the page.');
      return;
    }

    const targetName = trigger[0].dataset.toggle;
    const collapsableElement = document.getElementById(targetName);

    trigger[0].addEventListener('click', () => {
      toggleVisibility(collapsableElement);
    });
  }
}
