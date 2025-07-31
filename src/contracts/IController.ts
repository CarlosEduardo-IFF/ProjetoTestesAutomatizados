export interface IController<RequestType, ResponseType > {
  handle(request: RequestType): Promise<ResponseType>;
}
