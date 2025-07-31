export interface IUseCase<Input = void, Output = void> {
  perform(input: Input): Promise<Output>;
}
