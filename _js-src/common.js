
const $script = require('scriptjs');

// modules
import cookie from './modules/cookie';
// import mailChimp from './modules/mailChimp';
import video from './modules/video';
import siteMenu from './modules/site-menu';
import tagmanager from './modules/tagmanager';
import tawk from './modules/tawk';
import tableOfContents from './modules/tableOfContents';
import prism from './modules/prism';
import documentation from './modules/documentation';
import collectStatsData from './modules/collectStatsData';

import toggle from './components/toggle';
import tabs from './components/tabs';

// utilities
import inputTypeRangeExists from './utilities/inputTypeRangeExists';

/**
 * Cookie handler (based on cookie bar ID)
 */
cookie('cookie-notification');

// prism
prism();

// Collect Github and Docker data
collectStatsData();

/**
 * Documentation tools
 */
documentation();

/**
 * Progressive enhanced mobile hamburger menu
 */
siteMenu();

/**
 * Initialize tawk chat
 */
tawk();

/**
 * Play the video on the homepage
 */
// TODO: limit the loading of video script to only the homepage
video('js-video-homepage');

/**
 * Initialize the tagmanager
 */
tagmanager('GTM-K6DMN8N');

/**
 * Initialize  the table of contents
 */
tableOfContents('toc');

/**
 * Components
 */
window.addEventListener("DOMContentLoaded", () => {
  toggle('data-toggle');
  tabs();
});

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
 * asynchronous load pingdom in the page
 */
$script('//rum-static.pingdom.net/pa-5b22f622a42dbb00070002a5.js');

/**
 * Open all external links in a new window
 */
var links = document.links;
for (var i = 0, linksLength = links.length; i < linksLength; i++) {
  if(!links[i].href.startsWith("javascript:")){
    if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank';
    } 
  }
}

/**
 * Hotjar
 */
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1534324,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');