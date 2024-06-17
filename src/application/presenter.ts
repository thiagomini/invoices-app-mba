export interface Presenter<Output> {
  present<Input>(data: Input): Output;
}
