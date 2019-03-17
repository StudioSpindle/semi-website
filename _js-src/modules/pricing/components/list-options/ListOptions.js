import { htmlToElement } from '../../../../helpers/helpers';

const _addListItems = Symbol('addListItems');

export default class ListOptions {

  /**
   * @returns {string} the list html element as a string
   */
  static htmlString() {
    return `<ul class="list-ui list-buttons-radio"></ul>`;
  }

  constructor(children){
    this._children = children;
    /** constructs the html element from html template literal (string) */
    this._html = htmlToElement(ListOptions.htmlString());
  }

  /**
   *
   * @returns {HTMLUListElement} A list
   */
  init(){
    return this[_addListItems](this._html);
  }

  /**
   * Use this if you need to render the element
   * @returns {HTMLUListElement}
   */
  render() {
    return this.init();
  }

  /**
   * use this if you need to use the element as a string
   * @returns {String}
   */
  create() {
    return this.init().outerHTML;
  }

  [_addListItems](node) {
    this._children.forEach((child) => {
      node.insertAdjacentElement('beforeend', child);
    });
    return node;
  }
}
