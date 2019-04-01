import getClosest from '../../../../utilities/getClosest';
import PubSub from 'pubsub-js';

export default class ButtonRadioController {

  /**
   * @desc Changes the model
   * @param e {event}
   * @param scope {string} The scope which can be used to identify specific pubsub event
   */
  static clickHandler(e, scope) {
    const data = {
      "button": getClosest(e.target, 'BUTTON'),
      "container": getClosest(e.target, 'DIV'),
      "radioList": getClosest(e.target, 'UL')
    };
    PubSub.publish('buttonClicked.default', data);
    if (typeof(scope) !== 'undefined') {
      PubSub.publish(`buttonClicked.${scope}`, data);
    }
  }

  constructor(model) {
    this.model = model;
    this.scope = this.model.scope;
  }

  get title() {
    return this.model.title;
  };

  get useCaseKey() {
    return this.model.useCaseKey;
  }

  get value() {
    return this.model.value;
  };

  get valueType() {
    return this.model.valueType;
  }

  get showTarget() {
    return this.model.showTarget;
  }

  get isDefault() {
    return this.model.isDefault;
  }

  /**
   * @desc interface for the eventlistener
   * @param e
   */
  handleEvent(e){
    e.stopPropagation();
    switch(e.type){
      case "click":
        ButtonRadioController.clickHandler(e, this.scope);
        break;
      default:
        console.log(e.target);
    }
  };

}
