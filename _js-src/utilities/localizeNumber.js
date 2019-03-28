/**
 * @desc Returns a nice format of the number
 * @param number {Number} The number to localize
 * @param languageCode {String} Localization language
 *        (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
 * @returns {String}
 */
export default function(number, languageCode = 'nl') {
  return Number(number).toLocaleString(languageCode);
}
