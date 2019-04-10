import ListOptionsModel from './ListOptions.model';
import ListOptionsController from './ListOptions.controller';
import ListOptionsView from './ListOptions.view';

/**
 *
 * @param options {Array}
 * @param buttonData {object}
 * @param config {?{multi: boolean} || {useCaseKey: string}} Whether or not the items are radio buttons
 * @returns {ListOptionsView}
 */
export default function listOptionComponent(options, buttonData, config = undefined) {
  const listOptionsModel = new ListOptionsModel(options, buttonData),
    listOptionsController = new ListOptionsController(listOptionsModel, config);
  return new ListOptionsView(listOptionsController);
};
