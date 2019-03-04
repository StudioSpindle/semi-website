import { elementExists } from '../../helpers/helpers';
import pricingConfig from './pricingConfig';
import getChoiceFieldset from './getChoiceFieldset';
import handleChoiceUseCases from './handleChoiceUseCases';
import handleChoiceHosting from './handleChoiceHosting';
import handleChoiceClusters from './handleChoiceClusters';
import handleChoiceContextionaries from './handleChoiceContextionaries';
import handleChoiceWeaviates from './handleChoiceWeaviates';
import handleChoiceNetworkNodes from './handleChoiceNetworkNodes';

(function(factory) {

  /** Find the global object for export to both the browser and web workers. */
  var globalObject = typeof window === 'object' && window ||
    typeof self === 'object' && self;

  /**
   *  Setup calculator.js for different environments.
   *  First is Node.js or CommonJS.
   */
  if(typeof exports !== 'undefined') {
    factory(exports);
  } else if(globalObject) {
    /**
     * Export calculator globally even when using AMD for cases when this script
     * is loaded with others that may still expect a global calculator.
     */
    globalObject.calculator = factory({});

    /** Finally register the global calculator with AMD. */
    if(typeof define === 'function' && define.amd) {
      define([], function() {
        return globalObject.calculator;
      });
    }
  }

}(function(calculator) {
  function initCalculatorOnLoad() {
    const formPricing = document.getElementById(pricingConfig.formId);

    if (elementExists(formPricing)) {

      const fieldSets = formPricing.getElementsByTagName('FIELDSET');
      const fieldsetUseCase = getChoiceFieldset(fieldSets, 'use-case');
      const fieldsetHostingPreference = getChoiceFieldset(fieldSets, 'hosting-preference');
      const fieldsetClusters = getChoiceFieldset(fieldSets, 'clusters');
      const fieldsetContextionaries = getChoiceFieldset(fieldSets, 'contextionaries');
      const fieldsetWeaviates = getChoiceFieldset(fieldSets, 'weaviates');
      const fieldsetNetworkNodes = getChoiceFieldset(fieldSets, 'network-nodes');

      /** execute the choices */

      /** first fieldset, use cases */
      handleChoiceUseCases(fieldsetUseCase, function() {
        const nextFieldset = getChoiceFieldset(fieldSets, 'hosting-preference');
        nextFieldset.classList.remove('form-stepper__step--hide');
        nextFieldset.classList.add('form-stepper__step--show');
      });

      /** second fieldset, hosting preference */
      handleChoiceHosting(fieldsetUseCase, fieldsetHostingPreference, fieldSets)
        .then(function() {
          const nextFieldset = getChoiceFieldset(fieldSets, 'clusters');
          nextFieldset.classList.remove('form-stepper__step--hide');
          nextFieldset.classList.add('form-stepper__step--show');
        });

      /** third fieldset, number of clusters */
      handleChoiceClusters(fieldsetClusters, function() {
        const nextFieldset = getChoiceFieldset(fieldSets, 'contextionaries');
        nextFieldset.classList.remove('form-stepper__step--hide');
        nextFieldset.classList.add('form-stepper__step--show');
      });

      /** fourth fieldset, type of network nodes (contextionaries) */
      handleChoiceContextionaries(fieldsetContextionaries, function() {
        const nextFieldset = getChoiceFieldset(fieldSets, 'weaviates');
        nextFieldset.classList.remove('form-stepper__step--hide');
        nextFieldset.classList.add('form-stepper__step--show');
      });

      /** fifth fieldset, required number of weaviates */
      handleChoiceWeaviates(fieldsetWeaviates, function() {
        const nextFieldset = getChoiceFieldset(fieldSets, 'network-nodes');
        nextFieldset.classList.remove('form-stepper__step--hide');
        nextFieldset.classList.add('form-stepper__step--show');
      }).then(function(resolve) {
        console.log('resolve: ', resolve);
        // const weaviatesPrice = resolve.weaviatesPrice;
        // console.log('inside calculator: ', weaviatesPrice);
      });

      handleChoiceNetworkNodes(fieldsetNetworkNodes, '00000000', function() {
        console.log('the next one can be shown');
      }).then();

    } else {
      console.error(`No form present. Are you sure the form with id '${pricingConfig.formId}' exists?`);
    }
  }

  /** interface definition */
  calculator.initCalculatorOnLoad = initCalculatorOnLoad;

  return calculator;
}));
