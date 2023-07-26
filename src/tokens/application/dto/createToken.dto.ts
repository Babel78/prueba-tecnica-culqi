export class CreateTokenDto {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;

  constructor(data: Partial<CreateTokenDto>) {
    Object.assign(this, data);
  }
}
