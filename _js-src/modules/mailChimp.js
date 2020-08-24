import $ from 'jquery';

/**
 * hide the button based on form elements (Nodelist)
 * @param formElements
 */
const hideButton = formElements => {
  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].getAttribute('type') === 'submit') {
      const element = formElements[i];
      element.style.display = 'none';
    }
  }
};

/**
 * Send the data
 * @param postData
 * @param callback
 */
const sendData = (postData, callback) => {
  $.ajax({
    type: 'POST',
    url: 'https://us-central1-semi-186012.cloudfunctions.net/mailchimp',
    data: postData,
    dataType: 'json',
    cache: false,
    success(response) {
      // eslint-disable-next-line
      console.log(response);
    },
  }).done(() => {
    callback();
  });
};

/**
 *
 * @returns {string}
 */
const returnTo = () => {
  const { protocol } = location;
  const slashes = protocol.concat('//');
  return slashes.concat(`${window.location.hostname}:${window.location.port}`);
};

/**
 * Get the value based on name
 * @param name
 * @returns {*}
 */
const getVal = name => {
  const elVal = document.getElementsByName(name);
  if (elVal.length === 0) {
    return null;
  }
  return elVal[0].value;
};

/**
 * handleForm
 * @param e
 * @param formElements
 * @param formTitle
 */
const handleForm = (e, formElements, formTitle) => {
  e.preventDefault();
  hideButton(formElements);

  const formFields = {
    EMAIL: getVal('EMAIL'),
    NAME: getVal('NAME'),
    PRODUCT: getVal('PRODUCT'),
    MESSAGE: getVal('MESSAGE'),
    TYPE: formTitle,
    RETURN: returnTo,
  };

  sendData(formFields, () => {
    // sad but true, timeout to guarantee a success
    setTimeout(() => {
      window.location.href = `/thank-you/?response-type=${formTitle}&solution=${getVal('PRODUCT')}`;
    }, 1250);
  });
};

/**
 *
 * @constructor
 */
export default function() {
  const form = document.getElementById('js-mailchimp');
  if (typeof form !== 'undefined' && form !== null) {
    const formTitle = form.dataset.title;
    const formElements = form.elements;
    form.addEventListener(
      'submit',
      e => {
        handleForm(e, formElements, formTitle);
      },
      false,
    );
  }
}
