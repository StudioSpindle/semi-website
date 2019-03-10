
import createOptionButtons from './createOptionButtons';
import pricingConfig from './pricingConfig';
import pricingUseCaseData from '../../../_data/pricingUseCases';
import formPricingRadioButtons from './formPricingRadioButtons';
import { addEventListenerOnce, elementExists, removeObjectByKeyFromArray } from '../../helpers/helpers';
import selectClickedElementByType from './selectClickedElementByType';
import { setFixedCostPrice } from './pricingReceipt';

/**
 *
 * @param target
 * @param getNodeNetworksPrice
 * @param executeOnce
 */
export default function(target, getNodeNetworksPrice, executeOnce) {

  const container = document.getElementById(pricingConfig.pricingNetworkNodesContainerId);
  const template = document.getElementById(pricingConfig.pricingNetworkNodesTemplateId);
  const options = removeObjectByKeyFromArray(pricingUseCaseData.networkNodes, "config");

  /** Append all the cost buttons to the cluster container */
  createOptionButtons(options, template).forEach(item => {
    container.appendChild(item);
  });

  target.addEventListener('click', e => {
    formPricingRadioButtons(e, target, function() {
      const button = selectClickedElementByType(e, 'BUTTON');
      if (elementExists(button)) {
        /** target parent element, since data set needs to be set on parent li rather than button */
        const nodeNetworksPrice = button.parentElement.dataset.subTotal;
        if(nodeNetworksPrice) {
          getNodeNetworksPrice(nodeNetworksPrice);
        } else {
          console.info(`The multiplier isn't set on the data attribute of the hosting button.`);
        }
      }
    });
  });

  /** resolve the promise and do a callback once! */
  addEventListenerOnce(target, "click", function() {
    const button = selectClickedElementByType(event, 'BUTTON');
    /** only do callback when the element clicked on is a button */
    if (elementExists(button)) {
      executeOnce();
    }
  });
}
