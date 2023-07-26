export class ResponseCardInfoDto {
  card_number: string;
  expiration_month: string;
  expiration_year: string;
  email: string;

  constructor(data: Partial<ResponseCardInfoDto>) {
    Object.assign(this, data);
  }
}
