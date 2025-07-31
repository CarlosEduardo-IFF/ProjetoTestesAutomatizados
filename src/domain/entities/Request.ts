export class Request {
  constructor(
    public id: string,
    public item: string,
    public quantity: number,
    public client: string,
    public status: string,
    public date: Date
  ) {}
}