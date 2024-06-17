import { Presenter } from './presenter.js';

export class JsonPresenter implements Presenter<Record<string, unknown>> {
  present<Input>(data: Input): Record<string, unknown> {
    return data as Record<string, unknown>;
  }
}
