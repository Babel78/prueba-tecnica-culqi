export const payloadCreateToken = {
  card_number: '6011111111111117',
  cvv: '113',
  expiration_month: '06',
  expiration_year: '2023',
  email: 'ther@gmail.com',
};

export const payloadInvalidCard = {
  card_number: '6011111111111117s',
  cvv: '113',
  expiration_month: '06',
  expiration_year: '2023',
  email: 'ther@gmail.com',
};

export const payloadCardNotLUHN = {
  card_number: '360000000000028',
  cvv: '113',
  expiration_month: '06',
  expiration_year: '2023',
  email: 'ther@gmail.com',
};

export const payloadInvalidCVV = {
  card_number: '6011111111111117',
  cvv: '113s',
  expiration_month: '06',
  expiration_year: '2023',
  email: 'ther@gmail.com',
};

export const payloadInvalidExMonth = {
  card_number: '6011111111111117',
  cvv: '113',
  expiration_month: '06s',
  expiration_year: '2023',
  email: 'ther@gmail.com',
};

export const payloadInvalidExYear = {
  card_number: '6011111111111117',
  cvv: '113',
  expiration_month: '06',
  expiration_year: '2023s',
  email: 'ther@gmail.com',
};

export const payloadInvalidEmail = {
  card_number: '6011111111111117',
  cvv: '113',
  expiration_month: '06',
  expiration_year: '2023',
  email: 'theprox@facebook.com',
};

export const payloadTokenGenerate = {
  token: '3oRuXpYcNNg6mrxc',
};

export const payloadCardInfo = {
  card_number: '6011111111111117',
  expiration_month: '06',
  expiration_year: '2023',
  email: 'ther@gmail.com',
};

export const payloadToken = {
  token: '3oRuXpYcNNg6mrxc',
};

export const payloadTokenError = {
  token: '',
};
