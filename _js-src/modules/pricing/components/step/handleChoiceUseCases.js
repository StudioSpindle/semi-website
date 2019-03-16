import { elementExists, addEventListenerOnce, isNumber } from '../../../../helpers/helpers';
import formPricingRadioButtons from '../../common/formPricingRadioButtons';
import selectClickedElementByType from '../../common/selectClickedElementByType';
import pricingConfig from '../../pricingConfig';
import generateUseCaseTable from '../table/generateUseCaseTable';
import { reCalculateTotal, setVariableMonthlyCost } from '../receipt/pricingReceipt';

/**
 * @desc calculates the total cost of the use-cases
 * @param containerElement {HTMLElement} The element containing all the pricing rows
 * @returns {number} the calculated total number
 */
const calcTotalCostUseCases =  function(containerElement) {
  const tableRows = containerElement.getElementsByClassName('table-pricing__row');
  let useCaseTotal = 0;
  for (let row of tableRows) {
    if (typeof row.dataset.subTotal !== 'undefined' && isNumber(row.dataset.subTotal)) {
      const useCaseSubTotal = row.dataset.subTotal;
      useCaseTotal += parseInt(useCaseSubTotal);
    }
  }
  return useCaseTotal;
};

/**
 *
 * @param panels {object} the panels that exist on the page
 * @param currentUseCaseKey {string} use case key to test if the element already exists
 * @returns {boolean} returns true if the element doesn't exist
 */
const panelDoesNotExist = function(panels, currentUseCaseKey) {
  const panelsMap = new Map();
  Array.from(panels).forEach((panel, i) => {
    const panelUseCaseKey = panel.dataset.useCase;
    panelsMap.set(i, panelUseCaseKey === currentUseCaseKey);
  });
  for (let [k, v] of panelsMap) {
    if (v === true) {
      return false;
    }
  }
  return true;
};

/**
 * @desc toggle the existing panels based on use-case key
 * @param panels {object} the panels that exist on the page
 * @param currentUseCaseKey {string} The current use case key to compare
 */
const toggleUseCasePanels = function(panels, currentUseCaseKey, callback) {
  const showPanelClass = 'template-pricing-use-case--show';
  const hidePanelClass = 'template-pricing-use-case--hidden';

  if (typeof currentUseCaseKey === 'undefined') {
    console.info(`The use case key hasn't been defined.`);
  }
  Array.from(panels).forEach(panel => {
    const notAUseCasePanel = typeof panel.dataset.useCase === 'undefined';
    const currentPanel = panel.dataset.useCase === currentUseCaseKey;
    const notCurrentPanel = panel.dataset.useCase !== currentUseCaseKey;
    if (notAUseCasePanel) {
      return;
    }
    if (currentPanel) {
      panel.classList.add(showPanelClass);
      panel.classList.remove(hidePanelClass);
      callback(panel);
    }
    if (notCurrentPanel) {
      panel.classList.add(hidePanelClass);
      panel.classList.remove(showPanelClass);
    }
  });
};

/**
 * @desc This shows the use case pricing information block
 * @param useCaseKey {string} A key to identify the correct values in the pricingUseCases.json (JSON) file
 * @param pricingInfoContainerId {string} The container for all the pricing info blocks
 * @param useCaseKey {string} Use case key is used to retrieve data from ./_data/pricingUseCases.json
 */
const showUseCasePricing = function(useCaseKey, pricingInfoContainerId) {
  const pricingUseCaseContainer = document.getElementById(pricingInfoContainerId);
  if (elementExists(pricingUseCaseContainer)) {
    let doCalculationOn;
    const panels = pricingUseCaseContainer.getElementsByClassName(pricingConfig.panelsClassName);

    /** hide the other panels if it's not the use-case that's clicked */
    toggleUseCasePanels(panels, useCaseKey, function(panelContainer) {
      [doCalculationOn] = panelContainer.getElementsByClassName('table-row-container');
    });

    if (panelDoesNotExist(panels, useCaseKey)) {
      /** the panel doesn't exist, create it */
      generateUseCaseTable(
        useCaseKey,
        pricingConfig.pricingInfoTableContainerClassName,
        pricingConfig.pricingRowTemplateClassName,
        pricingConfig.pricingInfoTemplateId,
        function(tableRowContainer) {
          doCalculationOn = tableRowContainer;
        },
      );
    }

    if (doCalculationOn) {
      // TODO: maybe add pricingReceipt.setVariableMonthlyCost() as scoped function
      const total = calcTotalCostUseCases(doCalculationOn);
      setVariableMonthlyCost(total);
      /** recalculate the total */
      reCalculateTotal();
    }
  } else {
    console.info(`There is no pricing info container with the id ${pricingUseCaseContainer}`);
  }
};

/**
 *
 * @param target {HTMLElement} the target this choice applies to
 * @param showNextChoiceHandler
 */
export default function(target, showNextChoiceHandler = undefined) {
  target.addEventListener('click', e => {
    e.preventDefault();

    /** Logic for the radio buttons*/
    formPricingRadioButtons(e, target, function() {
      const button = selectClickedElementByType(e, 'BUTTON');
      if (elementExists(button)) {
        const useCaseKey = button.dataset.useCase;
        const useCaseKeyExists = useCaseKey !== '';
        if (useCaseKeyExists) {
          showUseCasePricing(
            useCaseKey,
            pricingConfig.pricingInfoContainerId
          );
        }
      }
    });
  });
  /** do a callback once! */
  addEventListenerOnce(target, "click", function() {
    const button = selectClickedElementByType(event, 'BUTTON');
    /** only do callback when the element clicked on is a button */
    if (elementExists(button)) {
      showNextChoiceHandler();
    }
  });
}
