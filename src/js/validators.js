export function getPaymentSystem(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return 'unknown';
  }

  const cleaned = cardNumber.replace(/\D/g, '');

  // Все нули - не платежная система
  if (/^0+$/.test(cleaned)) {
    return 'unknown';
  }

  // Проверки
  if (cleaned.startsWith('4')) {
    return 'visa';
  }

  if (cleaned.match(/^5[1-5]/)) {
    return 'mastercard';
  }

  if (cleaned.match(/^3[47]/)) {
    return 'amex';
  }

  if (cleaned.match(/^220/)) {
    return 'mir';
  }

  if (cleaned.match(/^35/)) {
    return 'jcb';
  }

  if (cleaned.match(/^6011|^64[4-9]|^65/)) {
    return 'discover';
  }

  if (cleaned.match(/^3(0[0-5]|[68])/)) {
    return 'diners';
  }

  return 'unknown';
}

export function isValidCardNumber(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return false;
  }

  const cleaned = cardNumber.replace(/\D/g, '');

  // Проверка длины
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  // Все нули - не валидная карта
  if (/^0+$/.test(cleaned)) {
    return false;
  }

  // Проверяем платежную систему
  const system = getPaymentSystem(cleaned);
  if (system === 'unknown') {
    return false;
  }

  // Алгоритм Луна
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i -= 1) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function formatCardNumber(cardNumber) {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return '';
  }

  const cleaned = cardNumber.replace(/\D/g, '');

  // Разный формат для AmEx
  if (cleaned.match(/^3[47]/) && cleaned.length === 15) {
    // AmEx: 4-6-5 формат
    return cleaned.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  }

  return cleaned.replace(/(\d{4})/g, '$1 ').trim();
}

export const VALID_EXAMPLES = {
  visa: '4485428996537790',
  mastercard: '5555555555554444',
  mir: '2201382000000021',
  jcb: '3530111333300000',
  amex: '378734493671000',
  discover: '6011111111111117',
  diners: '30569309025904',
};

export const PAYMENT_SYSTEM_NAMES = {
  visa: 'Visa',
  mastercard: 'MasterCard',
  mir: 'Mir',
  jcb: 'JCB',
  amex: 'American Express',
  discover: 'Discover',
  diners: 'Diners Club',
  unknown: 'Unknown',
};
