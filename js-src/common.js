
const $script = require('scriptjs');

// modules
import cookie from './modules/cookie';
import mailChimp from './modules/mailChimp';
import video from './modules/video';
import search from './modules/search';
import toggle from './modules/toggle';
import tagmanager from './modules/tagmanager';
import tableOfContents from './modules/tableOfContents';
import collapse from './modules/collapse';

// utilities
import inputTypeRangeExists from './utilities/inputTypeRangeExists';

/**
 * Cookie handler (based on cookie bar ID)
 */
cookie('cookie-notification');

/**
 * Send form submission data to mailchimp
 */
// TODO: only load this init on contact/index and workshop/index
mailChimp();

/**
 * Play the video on the homepage
 */
// TODO: limit the loading of video script to only the homepage
video('js-video-homepage');

/**
 * Search
 */
search();

/**
 * Make elements on the page collapse
 */
toggle('data-toggle');

/**
 * Initialize the tagmanager
 */
tagmanager('GTM-K6DMN8N');

/**
 * Initialize  the table of contents
 */
tableOfContents('toc');

/**
 * asynchronous load of multirange script when a input type of type range exists on the page
 */
const inputFields = document.getElementsByTagName('INPUT');
if(inputFields.length >= 0) {
  if(inputTypeRangeExists(inputFields, 'range')) {
    $script('/js/lib/multirange/multirange.js');
  }
}

/**
 * add collapse functionality
 */
collapse();

/**
 * asynchronous load pingdom in the page
 */
$script('//rum-static.pingdom.net/pa-5b22f622a42dbb00070002a5.js');
