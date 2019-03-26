import ListOptionsModel from './ListOptions.model';
import ListOptionsController from './ListOptions.controller';
import ListOptionsView from './ListOptions.view';

export default function listOptionComponent(children, dataAttr) {
  const listOptionsModel = new ListOptionsModel(children, dataAttr),
    listOptionsController = new ListOptionsController(listOptionsModel);
  return new ListOptionsView(listOptionsController);
};
