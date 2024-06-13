import { Presenter } from './presenter.js';

export class CsvPresenter implements Presenter<string> {
  present<Input>(data: Input): string {
    if (Array.isArray(data)) {
      return data.map((item) => Object.values(item).join(',')).join('\n');
    } else {
      return Object.values(data as Record<string, string>).join(',');
    }
  }
}
