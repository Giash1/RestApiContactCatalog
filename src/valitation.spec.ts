import { validateEmail, validateZipCode, validatePersonalNumber, validateText } from './validation';

describe('Validation functions', () => {
    test('validateEmail', () => {
        expect(validateEmail('test@test.com')).toBe(true);
        expect(validateEmail('invalidEmail')).toBe(false);
    });

    test('validateZipCode', () => {
        expect(validateZipCode('12345')).toBe(true);
        expect(validateZipCode('1234')).toBe(false);
    });

    test('validatePersonalNumber', () => {
        expect(validatePersonalNumber('550713-1405')).toBe(true);
        expect(validatePersonalNumber('550713-140')).toBe(false);
    });

    test('validateText', () => {
        expect(validateText('Test')).toBe(true);
        expect(validateText('')).toBe(false);
    });
});
