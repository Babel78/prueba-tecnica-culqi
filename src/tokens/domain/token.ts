export class Token {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
  constructor(data: Partial<Token>) {
    Object.assign(this, data);
  }
}
