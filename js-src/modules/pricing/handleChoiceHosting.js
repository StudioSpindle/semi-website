import selectClickedElementByType from './selectClickedElementByType';
import { addEventListenerOnce, elementExists } from '../../helpers/helpers';
import getChoiceFieldset from './getChoiceFieldset';
import formPricingRadioButtons from './formPricingRadioButtons';
import { setHostingAdjustment } from './pricingReceipt';
import createOptionButtons from './createOptionButtons';

import pricingUseCaseData from '../../../_data/pricingUseCases';
import pricingConfig from './pricingConfig';

const hideClass = 'form-stepper__step--hide';
const showClass = 'form-stepper__step--show';

/**
 *
 * @param elements {}
 * @returns {string}
 */
function getUseCaseKey(elements) {
  if (typeof elements !== 'undefined') {
    for (let element of elements) {
      if (element.classList.contains('ui-button--active')) return element.dataset.useCase;
    }
  }
}

/**
 * @desc create the options based on a data object. Attaches event listeners to the options as well.
 * @param template {HTMLElement} The template use to create the options
 * @param container {HTMLElement} The container to which the options should be appended to
 * @param options {Object} The data object which contains the options
 * @param loadOnce {Boolean} This should only resolve if it's the first time the options are created
 * @param callback {callback} The callback to run
 */
function loadOptions(template, container, options, loadOnce = false, callback = undefined) {
  /** Skip creating the options if the data provided isn't an object containing an array with options */
  if (Object.prototype.toString.call(options) !== '[object Array]') {
    console.info(
      `Skipped load options. The data should be a type of '[object Array]', meaning an object containing the options.`,
    );
    return;
  }

  /** Append all the cost buttons to the cost container */
  createOptionButtons(options, template).forEach(item => {
    if (elementExists(template)) {
      container.appendChild(item);
    } else {
      console.info(`The template '${template}' to create the option by is not found.`);
    }
  });

  /** options are loaded, add click handling */
  container.addEventListener('click', e => {
    e.preventDefault();
    formPricingRadioButtons(e, container, function() {
      const button = selectClickedElementByType(e, 'BUTTON');
      /** get the total price from the receipt */
      const totalUseCasePrice = document.getElementById(pricingConfig.receipt.montlyTotalId);
      if (elementExists(button)) {
        /** target parent element, since data set needs to be set on parent li rather than button */
        const multiplier = button.parentElement.dataset.multiplier;
        const multiplierExists = multiplier !== '';
        if (multiplierExists) {
          console.log(`set hosting adjustment is ${totalUseCasePrice.textContent} and ${multiplier}`);
          setHostingAdjustment(totalUseCasePrice.textContent, multiplier);
        } else {
          console.info(`The multiplier isn't set on the data attribute of the hosting button.`);
        }
      }
    });
  });

  /** only set event listener when it's the first time this is called */
  if (loadOnce) {
    addEventListenerOnce(container, 'click', function() {
      callback(container);
    });
  }
}

/**
 * @desc first hide old optional element, then show new element
 * @param elementToHide {HTMLElement} element which should be hidden
 * @param elementToShow {HTMLElement} element which should be shown
 */
function toggleOptionalStep(elementToHide, elementToShow) {
  hideElement(elementToHide);
  showElement(elementToShow);
}

/**
 * @desc show the element
 * @param elementToHide {HTMLElement}
 */
function hideElement(elementToHide) {
  elementToHide.classList.remove(showClass);
  elementToHide.classList.add(hideClass);
}

/**
 * @desc hide the element
 * @param elementToShow {HTMLElement}
 */
function showElement(elementToShow) {
  elementToShow.classList.remove(hideClass);
  elementToShow.classList.add(showClass);
}

/**
 *
 * @param useCaseFieldset {Object} The fieldset of the use cases, used to determine the selected
 *                                 use-case for price calculations
 * @param target {Object} The target fieldset
 * @param fieldSets {Object} The sub-fieldsets
 * @returns {Promise<any>}
 */
export default function(useCaseFieldset, target, fieldSets) {
  return new Promise((resolve, reject) => {
    /** used to execute the event listener for showing content only one time */
    let isFirstTimeFlag = true;
    target.addEventListener('click', e => {
      e.preventDefault();

      formPricingRadioButtons(e, target, function() {
        const button = selectClickedElementByType(e, 'BUTTON');
        if (elementExists(button)) {
          const buttonData = button.dataset.targetShowOptions;
          if (buttonData) {
            /** Settings for option 'Yes' */
            const hostingBySemiOptionsId = 'hosting-by-semi';
            const showHostingBySemi = buttonData === hostingBySemiOptionsId;
            const hostingBySemiOptionsElement = document.getElementById(hostingBySemiOptionsId);
            /** Settings for option 'No' */
            const hostingByCustomerOptionsId = 'hosting-by-customer';
            const showHostingByCustomer = buttonData === hostingByCustomerOptionsId;
            const hostingByCustomerOptionsElement = document.getElementById(
              hostingByCustomerOptionsId,
            );

            const optionsHostingBySemi = hostingBySemiOptionsElement.getElementsByClassName('pricing-hosting-button--show');
            const optionsHostingBySemiExist = optionsHostingBySemi.length > 0;
            const optionsHostingByCustomer = hostingByCustomerOptionsElement.getElementsByClassName('pricing-hosting-button--show');
            const optionsHostingByCustomerExist = optionsHostingByCustomer.length > 0

            const reOpenedThisChoice = optionsHostingBySemiExist && optionsHostingByCustomerExist;

            /**
             * Option 'Yes'
             */
            if (!elementExists(hostingBySemiOptionsElement)) {
              console.info(
                `No optional element has been found with the id ${hostingBySemiOptionsId}`,
              );
              return;
            }

            if (showHostingBySemi) {
              const optionStep1 = 'hosting-semi-preference-platform';
              const optionStep2 = 'hosting-semi-optimisation';
              const optionsSubStep1FieldsetElement = getChoiceFieldset(fieldSets, optionStep1);
              const optionsSubStep2FieldsetElement = getChoiceFieldset(fieldSets, optionStep2);
              const optionsStep1DontExist =
                optionsSubStep1FieldsetElement.getElementsByClassName(
                  'pricing-hosting-button--show',
                ).length === 0;
              const optionsStep2DontExist =
                optionsSubStep2FieldsetElement.getElementsByClassName(
                  'pricing-hosting-button--show',
                ).length === 0;

              /** re-set the hosting adjustment */
              setHostingAdjustment('0');

              /** toggle the step itself */
              toggleOptionalStep(hostingByCustomerOptionsElement, hostingBySemiOptionsElement);

              /** then show the substeps of this fieldset */
              showElement(optionsSubStep1FieldsetElement);
              showElement(optionsSubStep2FieldsetElement);

              /** Load the fieldset options for choosing hosting platform by SeMI */
              if (optionsStep1DontExist) {
                // TODO: maybe don't use document.getElement by id, but the current fieldset as Node's parent
                const container = document.getElementById(pricingConfig.pricingPlatformContainerId);
                const template = document.getElementById(pricingConfig.pricingPlatformTemplateId);
                const data = pricingUseCaseData.hostingProvidersBySemi;
                /** load options for weaviate hosting platforms */
                loadOptions(template, container, data);
              }

              /** Load the fieldset options for optimization preferences */
              if (optionsStep2DontExist) {
                // TODO: maybe don't use document.getElement by id, but the current fieldset as Node's parent
                const container = document.getElementById(
                  pricingConfig.pricingOptimizationContainerId,
                );
                const template = document.getElementById(
                  pricingConfig.pricingOptimizationTemplateId,
                );
                const useCaseButtons = useCaseFieldset.getElementsByTagName('BUTTON');
                const key = getUseCaseKey(useCaseButtons);
                const data = pricingUseCaseData.useCases[0][key]['optimization'];
                /** load options for optimization preference */
                loadOptions(template, container, data);
              }
            }

            /**
             * Option 'No'
             */
            if (!elementExists(hostingByCustomerOptionsElement)) {
              console.info(
                `No optional element has been found with the id ${hostingByCustomerOptionsId}`,
              );
              return;
            }

            if (showHostingByCustomer) {
              const optionsSubStepFieldsetElement = getChoiceFieldset(
                fieldSets,
                'hosting-customer-platform',
              );
              const optionsStepDontExist =
                optionsSubStepFieldsetElement.getElementsByClassName('pricing-hosting-button--show')
                  .length === 0;

              /** re-set the hosting adjustment */
              setHostingAdjustment('0');

              /** toggle the step itself */
              toggleOptionalStep(hostingBySemiOptionsElement, hostingByCustomerOptionsElement);

              /** then show the substeps of this fieldset */
              showElement(optionsSubStepFieldsetElement);

              /** Load the fieldset options for choosing hosting platform by customer */
              if (optionsStepDontExist) {
                // TODO: maybe don't use document.getElement by id, but the current fieldset as Node's parent
                const container = document.getElementById(
                  pricingConfig.pricingCustomerPlatformContainerId,
                );
                const template = document.getElementById(
                  pricingConfig.pricingCustomerPlatformTemplateId,
                );
                // const useCaseButtons = useCaseFieldset.getElementsByTagName('BUTTON');
                // const key = getUseCaseKey(useCaseButtons);
                const data = pricingUseCaseData.hostingProvidersByCustomer;
                /** load options for optimization preference */
                loadOptions(template, container, data);
              }
            }

            /** when it's te second time this choice is opened */
            if (reOpenedThisChoice) {
              /** remove active class of options */
              for (let option of optionsHostingBySemi) {
                const [optionButton] = option.getElementsByTagName('BUTTON');
                const activeClass = 'ui-button--active';
                if (elementExists(optionButton) && optionButton.classList.contains(activeClass)) {
                  optionButton.classList.remove(activeClass);
                }
              }
              for (let option of optionsHostingByCustomer) {
                const [optionButton] = option.getElementsByTagName('BUTTON');
                const activeClass = 'ui-button--active';
                if (elementExists(optionButton) && optionButton.classList.contains(activeClass)) {
                  optionButton.classList.remove(activeClass);
                }
              }
            }
          }

          // TODO: use this to get use case information
          // const key = getUseCaseKey(useCaseButtons);
          // const data = pricingUseCaseData.useCases[0][key];

          // const optionStep1 = 'hosting-optimisation';
          // const optionStep2 = 'hosting-preference-platform';
          // // TODO: refactor this and make more DRY
          // /** Hosting is provided by Weaviate (option = Yes) */
          // if (buttonData === optionStep1) {
          //   /** hide/show correct optional fieldset */
          //   const optionalFieldsetToShow = getChoiceFieldset(fieldSets, optionStep1);
          //   const optionalFieldsetToHide = getChoiceFieldset(fieldSets, optionStep2);
          //   optionalFieldsetToHide.classList.remove(showClass);
          //   optionalFieldsetToHide.classList.add(hideClass);
          //   optionalFieldsetToShow.classList.remove(hideClass);
          //   optionalFieldsetToShow.classList.add(showClass);
          //   /** add buttons to optional fieldset, only if they don't exist yet */
          //   const numberOfChildButtons = optionalFieldsetToShow.getElementsByClassName('pricing-hosting-button--show').length;
          //   if (numberOfChildButtons === 0) {
          //     const useCaseButtons = useCaseFieldset.getElementsByTagName('BUTTON');
          //     // TODO: maybe don't use document.getElement by id, but the current fieldset as Node's parent
          //     const container = document.getElementById(pricingConfig.pricingOptimizationContainerId);
          //     const template = document.getElementById(pricingConfig.pricingOptimizationTemplateId);
          //     const key = getUseCaseKey(useCaseButtons);
          //     const data = pricingUseCaseData.useCases[0][key];
          //
          //     loadOptions(target, template, container, data,  'optimization', isFirstTimeFlag, function() {
          //       resolve();
          //       isFirstTimeFlag = false;
          //     });
          //   }
          // }
          // if (buttonData === optionStep2) {
          //   /** hide/show correct optional fieldset (option = No) */
          //   const optionalFieldsetToShow = getChoiceFieldset(fieldSets, optionStep2);
          //   const optionalFieldsetToHide = getChoiceFieldset(fieldSets, optionStep1);
          //   optionalFieldsetToHide.classList.remove(showClass);
          //   optionalFieldsetToHide.classList.add(hideClass);
          //   optionalFieldsetToShow.classList.remove(hideClass);
          //   optionalFieldsetToShow.classList.add(showClass);
          //   /** add buttons to optional fieldset, only if they don't exist yet */
          //   const numberOfChildButtons = optionalFieldsetToShow.getElementsByClassName('pricing-hosting-button--show').length;
          //   if (numberOfChildButtons === 0) {
          //     // TODO: maybe don't use document.getElement by id, but the current fieldset as Node's parent
          //     const container = document.getElementById(pricingConfig.pricingPlatformContainerId);
          //     const template = document.getElementById(pricingConfig.pricingPlatformTemplateId);
          //     const data = pricingUseCaseData;
          //     loadOptions(target, template, container, data, 'hostingProviders', isFirstTimeFlag, function() {
          //       resolve();
          //       isFirstTimeFlag = false;
          //     });
          //   }
          // }
        }
      });
    });
  });
}
