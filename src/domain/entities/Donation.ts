export class Donation {
  constructor(
    public id: string,
    public item: string,
    public quantity: number,
    public date: Date
  ) {}
}