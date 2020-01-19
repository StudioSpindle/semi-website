/**
 * Google tagmanager
 */
export default function(key) {
  // OLD TAG MANAGER
  // eslint-disable-next-line
  // (function(w, d, s, l, i) {
  //   // eslint-disable-next-line
  //   w[l] = w[l] || [];
  //   w[l].push({
  //     'gtm.start': new Date().getTime(),
  //     event: 'gtm.js',
  //   });
  //   const [f] = d.getElementsByTagName(s);
  //   const j = d.createElement(s);
  //   const dl = l !== 'dataLayer' ? `&l=${l}` : '';
  //   j.async = true;
  //   j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
  //   f.parentNode.insertBefore(j, f);
  // })(window, document, 'script', 'dataLayer', key);

  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', key);
}
