export interface IController<RequestType = any, ResponseType = any> {
  handle(request: RequestType): Promise<ResponseType>;
}
