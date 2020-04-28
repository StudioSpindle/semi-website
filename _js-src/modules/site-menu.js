const nav = document.getElementById('js-site-nav');
const trigger = document.getElementById('header-main-menu-trigger');
/** same as $screen-width-medium in ./_scss/mixins/_mixin-breakpoints */
const toMediumQuerySize = '814px';

/**
 * @desc Debounce method for window resize (source: https://davidwalsh.name/javascript-debounce-function)
 * @param func
 * @returns {Function}
 */
function debounce(func) {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 250, event);
  };
}

function createVerticalNav() {
  /** show hamburger menu icon */
  trigger.classList.remove('no-js-hidden');
  /** make nav vertically oriented (since JS is enabled) */
  nav.classList.add('nav-vertical');
}

function createHorizontal() {
  /** hide hamburger menu icon */
  trigger.classList.remove('no-js-hidden');
  /** make nav vertically oriented (since JS is enabled) */
  nav.classList.remove('nav-vertical');
}

export default function () {
  /** initial navigation setting for small to medium screensizes */
  if (window.matchMedia(`(max-width: ${toMediumQuerySize})`).matches) {
    createVerticalNav();
  }

  /** when browser window is resized */
  window.addEventListener(
    'resize',
    debounce(function () {
      /** reset to vertical if window size is lower than medium screensize */
      if (window.matchMedia(`(max-width: ${toMediumQuerySize})`).matches) {
        createVerticalNav();
      }
      /** reset to horizontal if window size exceeds medium screensize */
      if (window.matchMedia(`(min-width: ${toMediumQuerySize})`).matches) {
        createHorizontal();
      }
    }),
  );

  /** the show hide for the navigation */
  trigger.addEventListener('click', function () {
    const [menuIcon] = this.getElementsByTagName('img');
    menuIcon.classList.toggle('svg-icon-hamburger--active');
    nav.classList.toggle('nav-vertical--active');
  });
}