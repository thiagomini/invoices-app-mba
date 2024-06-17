import { CsvPresenter } from './csv.preseter.js';
import { JsonPresenter } from './json.presenter.js';

export class PresenterFactory {
  static createPresenter(type: string) {
    switch (type) {
      case 'csv':
        return new CsvPresenter();
      case 'json':
        return new JsonPresenter();
      default:
        throw new Error('Invalid presenter type');
    }
  }
}
