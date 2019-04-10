import elementExists from '../../../../utilities/elementExists';
import expansionPanelComponent from '../expansion-panel/expansion-panel';
import listOptionsComponent from '../list-options/list-options';
import PubSub from 'pubsub-js';
import pricingUseCaseData from '../../../../../_data/pricingUseCases';
import pricingConfig from '../../pricingConfig';
import tableComponent from '../table/table';
import isNumber from '../../../../typeChecking/isNumber';

const merge = require('lodash.merge');

/**
 * @desc calculates the total cost of the use-cases
 * @param table {HTMLElement} The element containing all the pricing rows
 * @returns {number} the calculated total number
 */
const calcTotalCostUseCases = function(table) {
  /** @type {HTMLElement!} */
  const tableRows = table.getElementsByClassName('table-pricing__row');
  /** @type {Number!} */
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
 * @desc Toggle the existing panels based on use-case key
 * @param panels {Object<string, any>} The panels that exist on the page
 * @param currentUseCaseKey {string} The current use case key to compare
 */
const toggleUseCasePanels = function(panels, currentUseCaseKey) {
  if (typeof currentUseCaseKey === 'undefined') {
    console.info(`The use case key hasn't been defined.`);
  }
  Array.from(panels).forEach(panel => {
    /** @type {HTMLElement!} */
    const currentPanel = panel.dataset.useCase === currentUseCaseKey;
    /** @type {HTMLElement!} */
    const notCurrentPanel = panel.dataset.useCase !== currentUseCaseKey;
    if (currentPanel) {
      panel.classList.add(pricingConfig.showClass);
      panel.classList.remove(pricingConfig.hideClass);
    } else if (notCurrentPanel) {
      panel.classList.add(pricingConfig.hideClass);
      panel.classList.remove(pricingConfig.showClass);
    }
  });
};

/**
 * @desc Checks panels to find the visible one, and then finds the first table in that panel table
 *       Check is based on the hidden class being absent on the table, meaning it's visible
 * @param panels {HTMLCollection!} The collection of panels on the page
 * @returns {?Element} Returns the visible table element (or null if none is visible)
 */
const getVisibleTable = function(panels) {
  /** @type {Array!} */
  let visiblePanels = [];
  for (const panel of panels) {
    if (!panel.classList.contains(pricingConfig.hideClass)) {
      visiblePanels.push(panel);
    }
  }
  return visiblePanels[0].getElementsByTagName('TABLE')[0];
};

/**
 * @param useCases {Object<string, any>}
 * @param showNextChoiceHandler {Function} callback function which is used to show next choice
 */
export default function(useCases, showNextChoiceHandler = undefined) {
  /** @type {HTMLElement!} */
  const container = document.getElementById(pricingConfig.pricingInfoContainerId);

  /** only run script when the container exists */
  if (!elementExists(container)) {
    console.info(`There is no pricing info container with the id ${container}`);
    return false;
  }

  /** @type {Array!} */
  let existingPanelKeys = [];
  /** @type {HTMLCollectionOf!} */
  const expansionPanels = document.getElementsByClassName('panel-collapse');


  const exampleOptions = [
    { title: "test" },
    { title: "Another test" }
  ];

  listOptionsComponent(exampleOptions, undefined, {multi: true}).renderInto(container);

  /** @type {Array!} */
  let options = [];
  Object.keys(useCases).forEach(key => {
    const useCase = useCases[key];
    options.push({
      title: useCase.title,
      useCaseKey: key,
    });
  });
  /**
   * Create the list with radio buttons
   */
  listOptionsComponent(options, { pubSubScope: 'useCases' }).renderInto(container);

  /** when a radio button in the list is clicked, show the table in an expansion panel */
  PubSub.subscribe('buttonClicked.useCases', (msg, pubSubData) => {
    /** @type {String} */
    const currentUseCase = pubSubData.clickedButton.dataset.useCase;
    /** @type {Object<string, any>} */
    const singleUseCase = useCases[currentUseCase];

    /** Toggle the panels if they exist */
    toggleUseCasePanels(expansionPanels, currentUseCase);

    /** @type {Boolean!} */
    const panelAlreadyExists = existingPanelKeys.includes(currentUseCase);

    if (!panelAlreadyExists) {
      /** When the expansion panel with table does not exist, create it */
      existingPanelKeys.push(currentUseCase);

      const useCaseLabels = pricingUseCaseData.cpcLabels;
      const consumptions = singleUseCase.consumptions;

      const expansionPanelContainer = document.getElementById('panel-collapse-container');
      const data = {
        currentUseCase: currentUseCase,
        panelLabel: singleUseCase.panelLabel,
      };

      const useCaseConsumptions = merge(useCaseLabels, consumptions);
      const table = tableComponent(useCaseConsumptions).create();
      expansionPanelComponent(data, table).renderInto(expansionPanelContainer);
    }

    /** publish visible panel for calculation */
    const panelShownData = {
      "visibleTable": getVisibleTable(expansionPanels)
    };

    /** @type number */
    const subTotalUseCase = calcTotalCostUseCases(panelShownData.visibleTable);

    PubSub.publish('useCases.panelShown.default', {subTotal: subTotalUseCase});

    /** show the next fieldset */
    if (typeof showNextChoiceHandler === typeof Function) showNextChoiceHandler();
  });
}
