export class ResponseTokenDto {
  token: string;
  constructor(data: Partial<ResponseTokenDto>) {
    Object.assign(this, data);
  }
}
