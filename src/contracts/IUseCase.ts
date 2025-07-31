export interface IUseCase<Input, Output > {
  perform(input: Input): Promise<Output>;
}
