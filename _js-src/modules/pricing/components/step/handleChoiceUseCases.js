import { addEventListenerOnce, elementExists } from '../../../../helpers/helpers';
import selectClickedElementByType from '../../common/selectClickedElementByType';
import createListItems from '../../common/createListItems';

import PubSub from 'pubsub-js';

import pricingUseCaseData from '../../../../../_data/pricingUseCases';
import pricingConfig from '../../pricingConfig';
import { ListOptions } from '../list-options';

import { setVariableMonthlyCost, reCalculateTotal } from '../../components/receipt/pricingReceipt';

import { TableController, TableModel, TableView } from '../table/table';
import { TableHeadController, TableHeadModel, TableHeadView } from '../table/table-head';
import { TableBodyController, TableBodyModel, TableBodyView } from '../table/table-body';
import { TableRowController, TableRowModel, TableRowView } from '../table/table-row';
import { ExpansionPanelHeadController, ExpansionPanelHeadModel, ExpansionPanelHeadView } from '../expansion-panel/expansion-panel-head';
import { ExpansionPanelBodyController, ExpansionPanelBodyModel, ExpansionPanelBodyView } from '../expansion-panel/expansion-panel-body';

const merge = require('lodash.merge');

// /**
//  * @desc calculates the total cost of the use-cases
//  * @param containerElement {HTMLElement} The element containing all the pricing rows
//  * @returns {number} the calculated total number
//  */
// const calcTotalCostUseCases =  function(containerElement) {
//   const tableRows = containerElement.getElementsByClassName('table-pricing__row');
//   let useCaseTotal = 0;
//   for (let row of tableRows) {
//     if (typeof row.dataset.subTotal !== 'undefined' && isNumber(row.dataset.subTotal)) {
//       const useCaseSubTotal = row.dataset.subTotal;
//       useCaseTotal += parseInt(useCaseSubTotal);
//     }
//   }
//   return useCaseTotal;
// };
//
// /**
//  *
//  * @param panels {object} the panels that exist on the page
//  * @param currentUseCaseKey {string} use case key to test if the element already exists
//  * @returns {boolean} returns true if the element doesn't exist
//  */
// const panelDoesNotExist = function(panels, currentUseCaseKey) {
//   const panelsMap = new Map();
//   Array.from(panels).forEach((panel, i) => {
//     const panelUseCaseKey = panel.dataset.useCase;
//     panelsMap.set(i, panelUseCaseKey === currentUseCaseKey);
//   });
//   for (let [k, v] of panelsMap) {
//     if (v === true) {
//       return false;
//     }
//   }
//   return true;
// };
//


/**
 * @desc toggle the existing panels based on use-case key
 * @param panels {object} the panels that exist on the page
 * @param currentUseCaseKey {string} The current use case key to compare
 */
const toggleUseCasePanels = function(panels, currentUseCaseKey) {
  const showPanelClass = 'template-pricing-use-case--show';
  const hidePanelClass = 'template-pricing-use-case--hidden';
  if (typeof currentUseCaseKey === 'undefined') {
    console.info(`The use case key hasn't been defined.`);
  }
  Array.from(panels).forEach(panel => {
    const currentPanel = panel.dataset.useCase === currentUseCaseKey;
    const notCurrentPanel = panel.dataset.useCase !== currentUseCaseKey;
    if (currentPanel) {
      panel.classList.add(showPanelClass);
      panel.classList.remove(hidePanelClass);
    } else if (notCurrentPanel) {
      panel.classList.add(hidePanelClass);
      panel.classList.remove(showPanelClass);
    }
  });
};


/**
 *
 * @param target {HTMLElement} the target this choice applies to
 * @param showNextChoiceHandler
 */
export default function(target, showNextChoiceHandler = undefined) {
  let existingPanelKeys = [];
  const container = document.getElementById(pricingConfig.pricingInfoContainerId);
  const data = pricingUseCaseData.useCases;
  const options = data.map((o) => {
    const useCaseKey = Object.getOwnPropertyNames(o)[0];
    const title = Object.values(o)[0].title;
    if (!useCaseKey)
      throw new Error('You must provide a use case key in the data.');
    if (!title)
      throw new Error('You must provide a title in the  data.');
    return { title: title, useCaseKey: useCaseKey };
  });

  if (elementExists(container)) {

    const listOptionsElement = new ListOptions(createListItems(options)).render();

    /** insert list with buttons to container */
    container.insertAdjacentElement('beforeend', listOptionsElement);

    /** when a radio button in the list is clicked, show the table in an expansion panel */
    PubSub.subscribe('buttonClicked', (msg, button) => {

      const flattenedUseCaseData = Object.assign({}, ...data);
      const singleUseCase = flattenedUseCaseData[button.dataset.useCase];

      /**
       * Toggle the panels
       */
      const panels = document.getElementsByClassName('panel-collapse');
      toggleUseCasePanels(panels, button.dataset.useCase);

      const panelAlreadyExists = existingPanelKeys.includes(button.dataset.useCase);
      if (!panelAlreadyExists) {
        /**
         * When the expansion panel with table does not exist, create it
         */
        existingPanelKeys.push(button.dataset.useCase);

        const useCaseLabels = pricingUseCaseData.cpcLabels;
        const consumptions = singleUseCase.consumptions;

        const tableModel = new TableModel(),
          tableController = new TableController(tableModel),
          tableView = new TableView(tableController);

        const tableHeadModel = new TableHeadModel(),
          tableHeadController = new TableHeadController(tableHeadModel),
          tableHeadView = new TableHeadView(tableHeadController);

        const tableBodyModel = new TableBodyModel(),
          tableBodyController = new TableBodyController(tableBodyModel),
          tableBodyView = new TableBodyView(tableBodyController);

        const expansionPanelHeadModel = new ExpansionPanelHeadModel(singleUseCase.panelLabel),
          expansionPanelHeadController = new ExpansionPanelHeadController(expansionPanelHeadModel),
          expansionPanelHeadView = new ExpansionPanelHeadView(expansionPanelHeadController);

        const expansionPanelBodyModel = new ExpansionPanelBodyModel(),
          expansionPanelBodyController = new ExpansionPanelBodyController(expansionPanelBodyModel),
          expansionPanelBodyView = new ExpansionPanelBodyView(expansionPanelBodyController);

        const expansionPanelContainer = document.getElementById('panel-collapse-container');
        const expansionPanel = document.createElement('DIV');
        expansionPanel.classList.add('panel-collapse');
        expansionPanel.dataset.useCase = button.dataset.useCase;
        expansionPanelContainer.insertAdjacentElement('beforeend', expansionPanel);
        expansionPanel.insertAdjacentElement('beforeend', expansionPanelHeadView.render());
        expansionPanel.insertAdjacentElement('beforeend', expansionPanelBodyView.render());

        const collapseBodyElement = expansionPanel.querySelector('.panel-collapse__body');
        collapseBodyElement.insertAdjacentElement('beforeend', tableView.render());
        const [table] = collapseBodyElement.getElementsByTagName('TABLE');
        table.insertAdjacentElement('beforeend', tableHeadView.render());
        table.insertAdjacentElement('beforeend', tableBodyView.render());
        const [tableBody] = collapseBodyElement.getElementsByTagName('TBODY');

        const useCaseConsumptions = merge(useCaseLabels, consumptions);

        /** create a row for each consumption in a use case and add it in the body */
        useCaseConsumptions.forEach((option) => {
          const tableRowModel = new TableRowModel(option.title, option.desc, option.cpc, option.average),
            tableRowController = new TableRowController(tableRowModel),
            tableRowView = new TableRowView(tableRowController);

          tableBody.insertAdjacentElement('beforeend', tableRowView.render());
        });
      }


      // TODO: ...

      // button.dataset.useCase
      // setVariableMonthlyCost();

      // let doCalculationOn;
      // const panels = container.getElementsByClassName(pricingConfig.panelsClassName);
      // /** hide the other panels if it's not the use-case that's clicked */
      // toggleUseCasePanels(panels, useCaseKey, function(panelContainer) {
      //   [doCalculationOn] = panelContainer.getElementsByClassName('table-row-container');
      // });
      //
      // if (panelDoesNotExist(panels, useCaseKey)) {
      //   /** the panel doesn't exist, create it */
      //   generateUseCaseTable(
      //     useCaseKey,
      //     pricingConfig.pricingInfoTableContainerClassName,
      //     pricingConfig.pricingRowTemplateClassName,
      //     pricingConfig.pricingInfoTemplateId,
      //     function(tableRowContainer) {
      //       doCalculationOn = tableRowContainer;
      //     },
      //   );
      // }
      //
      // if (doCalculationOn) {
      //   // TODO: maybe add pricingReceipt.setVariableMonthlyCost() as scoped function
      //   const total = calcTotalCostUseCases(doCalculationOn);
      //   setVariableMonthlyCost(total);
      //   /** recalculate the total */
      //   reCalculateTotal();
      // }

      showNextChoiceHandler();
    });

  } else {
    console.info(`There is no pricing info container with the id ${container}`);
  }
}
