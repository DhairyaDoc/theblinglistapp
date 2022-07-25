export const NAME = "name";
export const EMAIL = "email";
export const APPARTMENT_NUMBER = "appartmentNumber";
export const STREET_NUMBER = "streetNumber";
export const STREET_NAME = "streetName";
export const POSTAL_CODE = "postalCode";

export const AMOUNT = "amount";
// https://learnersbucket.com/examples/javascript/credit-card-validation-in-javascript/#:~:text=Validating%20credit%20card%20in%20javascript%20with%20Luhn's%20algorithm.&text=Get%20a%20double%20of%20every,divisible%20then%20it%20is%20valid.
export const CARD_NUMBER = "cardNumber";
// https://www.geeksforgeeks.org/how-to-validate-cvv-number-using-regular-expression/
export const CARD_CVV_NUMBER = "cardCvvNumber";
// https://forum.freecodecamp.org/t/trying-to-validate-a-credit-card-expiry-month-against-current-date/191434/2
export const CARD_EXPIRATION_DATE = "cardExpirationDate"

export const ALPHABET_REGEX = /^[A-Za-z ]*$/;
// eslint-disable-next-line
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const NUMBER_REGEX = /^[0-9]*$/;

export const CARD_CVV_REGEX = /^[0-9]{3, 4}$/
