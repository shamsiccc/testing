import {
  isValidCardNumber,
  getPaymentSystem,
  formatCardNumber,
  VALID_EXAMPLES,
  PAYMENT_SYSTEM_NAMES,
} from '../validators';

describe('Validators', () => {
  describe('isValidCardNumber', () => {
    test('should validate Visa and MasterCard', () => {
      expect(isValidCardNumber('4111111111111111')).toBe(true);
      expect(isValidCardNumber('5555555555554444')).toBe(true);
      expect(isValidCardNumber('4111111111111112')).toBe(false);
    });
  });

  describe('getPaymentSystem', () => {
    test('should identify major payment systems', () => {
      expect(getPaymentSystem('4111111111111111')).toBe('visa');
      expect(getPaymentSystem('5555555555554444')).toBe('mastercard');
      expect(getPaymentSystem('378282246310005')).toBe('amex');
    });

    test('should handle basic prefixes', () => {
      expect(getPaymentSystem('4')).toBe('visa');
      expect(getPaymentSystem('51')).toBe('mastercard');
      expect(getPaymentSystem('34')).toBe('amex');
      expect(getPaymentSystem('37')).toBe('amex');
    });
  });

  describe('formatCardNumber', () => {
    test('should format 16-digit numbers', () => {
      expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
      expect(formatCardNumber('')).toBe('');
    });
  });

  describe('Constants', () => {
    test('VALID_EXAMPLES should have correct keys', () => {
      expect(VALID_EXAMPLES.visa).toBeDefined();
      expect(VALID_EXAMPLES.mastercard).toBeDefined();
    });

    test('PAYMENT_SYSTEM_NAMES should have basic names', () => {
      expect(PAYMENT_SYSTEM_NAMES.visa).toBe('Visa');
      expect(PAYMENT_SYSTEM_NAMES.mastercard).toBe('MasterCard');
      expect(PAYMENT_SYSTEM_NAMES.amex).toBe('American Express');
    });
  });
});
