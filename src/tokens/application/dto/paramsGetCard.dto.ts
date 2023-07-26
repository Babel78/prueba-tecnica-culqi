export class ParamsGetCardDto {
  token: string;

  constructor(data: Partial<ParamsGetCardDto>) {
    Object.assign(this, data);
  }
}
