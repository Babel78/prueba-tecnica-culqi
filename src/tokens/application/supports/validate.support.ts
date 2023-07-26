import * as Joi from 'joi';
import { CreateTokenDto } from '../dto/createToken.dto';
import { HttpError } from '../../infrastructure/helpers/exceptions/request.exception';
import {
  EMAIL_DOMAIN_ALLOWS,
  HTTP_ERROR,
  MESSAGE_VALIDATION,
} from '../constants/constants';
import { ParamsGetCardDto } from '../dto/paramsGetCard.dto';

export const validarPayloadCrearToken = (payload: CreateTokenDto) => {
  const schema = Joi.object().keys({
    card_number: Joi.string()
      .regex(/^\d+$/)
      .min(13)
      .max(16)
      .required()
      .messages({
        'any.required': '{{#label}} is required.',
        'string.empty': '{{#label}} cannot be empty.',
        'string.max': '{{#label}} maximum {{#limit}} characters allowed.',
        'string.min': '{{#label}} minimum {{#limit}} character required.',
        'string.pattern.base': '{{#label}} only allowed characters.',
      }),
    cvv: Joi.string().regex(/^\d+$/).min(3).max(4).required().messages({
      'any.required': '{{#label}} is required.',
      'string.empty': '{{#label}} cannot be empty.',
      'string.max': '{{#label}} maximum {{#limit}} characters allowed.',
      'string.min': '{{#label}} minimum {{#limit}} character required.',
      'string.pattern.base': '{{#label}} only allowed characters.',
    }),
    expiration_month: Joi.string()
      .regex(/^\d+$/)
      .min(1)
      .max(2)
      .required()
      .messages({
        'any.required': '{{#label}} is required.',
        'string.empty': '{{#label}} cannot be empty.',
        'string.max': '{{#label}} maximum {{#limit}} characters allowed.',
        'string.min': '{{#label}} minimum {{#limit}} character required.',
        'string.pattern.base': '{{#label}} only allowed characters.',
      }),
    expiration_year: Joi.string().regex(/^\d+$/).length(4).required().messages({
      'any.required': '{{#label}} is required.',
      'string.empty': '{{#label}} cannot be empty.',
      'string.length': '{{#label}} length must be {{#limit}} characters long.',
      'string.pattern.base': '{{#label}} only allowed characters.',
    }),
    email: Joi.string().email().min(5).max(100).required().messages({
      'any.required': '{{#label}} is required.',
      'string.empty': '{{#label}} cannot be empty.',
      'string.max': '{{#label}} maximum {{#limit}} characters allowed.',
      'string.min': '{{#label}} minimum {{#limit}} character required.',
    }),
  });

  const { error } = schema.validate(payload, { allowUnknown: false });
  if (error) {
    throw new HttpError(HTTP_ERROR.INVALID_DATA, error.details[0].message);
  } else {
    validateDomainEmail(payload.email);
    validateCardNumber(payload.card_number);
    validateExpirationMonth(payload.expiration_month);
    validateExpirationYear(payload.expiration_year);
  }
};

export const validarPayloadGetCard = (payload: ParamsGetCardDto) => {
  const schema = Joi.object().keys({
    token: Joi.string().required().length(16).messages({
      'any.required': '{{#label}} is required.',
      'string.empty': '{{#label}} cannot be empty.',
      'string.length': '{{#label}} length must be {{#limit}} characters long.',
      'string.pattern.base': '{{#label}} only allowed characters.',
    }),
  });
  const { error } = schema.validate(payload, { allowUnknown: false });
  if (error) {
    throw new HttpError(HTTP_ERROR.INVALID_DATA, error.details[0].message);
  }
};

const validateDomainEmail = (email: string) => {
  let isAllow = false;
  EMAIL_DOMAIN_ALLOWS.forEach((domain) => {
    const endWith = email.endsWith(domain);
    if (!endWith && !isAllow) {
      isAllow = false;
    } else {
      isAllow = true;
    }
  });
  if (!isAllow) {
    throw new HttpError(
      HTTP_ERROR.INVALID_DATA,
      MESSAGE_VALIDATION.INVALID_EMAIL_DOMAIN
    );
  }
};

//ALGORITHM LUHN
const validateCardNumber = (card_number: string) => {
  let sumDigitsCard = 0;
  const arrayNumber = card_number.split('');
  const reverseArrayNumber = arrayNumber.reverse();
  const numbersPares = reverseArrayNumber.filter(
    (num, index) => index % 2 === 0
  );
  const numbersImpares = reverseArrayNumber.filter(
    (num, index) => (index + 1) % 2 === 0
  );
  for (const element of numbersImpares) {
    const value: number = Number(element) * 2;
    if (value > 10) {
      const stringArr = value.toString().split('');
      const numArr = stringArr.map((value) => Number(value));
      const sumDigits = numArr.reduce((a, b) => a + b);
      sumDigitsCard += sumDigits;
    } else {
      sumDigitsCard += value;
    }
  }
  const arrayParesNum = numbersPares.map((number) => Number(number));
  const sumDigits = arrayParesNum.reduce((a, b) => a + b);
  sumDigitsCard += sumDigits;
  if (sumDigitsCard % 10 !== 0) {
    throw new HttpError(
      HTTP_ERROR.INVALID_DATA,
      MESSAGE_VALIDATION.INVALID_CARD
    );
  }
};

const validateExpirationMonth = (value: string) => {
  const monthInput = Number(value);
  if (monthInput < 1 || monthInput > 12) {
    throw new HttpError(
      HTTP_ERROR.INVALID_DATA,
      MESSAGE_VALIDATION.INVALID_EXPIRATION_MONTH
    );
  }
};

const validateExpirationYear = (value: string) => {
  const currentYear = new Date().getFullYear();
  const limitYear = currentYear + 5;
  const yearInput = Number(value);
  if (yearInput < currentYear || yearInput > limitYear) {
    throw new HttpError(
      HTTP_ERROR.INVALID_DATA,
      MESSAGE_VALIDATION.INVALID_EXPIRATION_YEAR
    );
  }
};
