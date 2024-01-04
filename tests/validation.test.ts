import { validateEmail, validateZipCode, validatePersonalNumber, validateText  } from '../src/validation';

describe('validateEmail', () => {
    it('should return true for a valid email', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return false for an invalid email', () => {
        expect(validateEmail('invalid email')).toBe(false);
    });
});


describe('validateZipCode', () => {
    it('should return true for a valid zip code', () => {
        expect(validateZipCode('12345')).toBe(true);
    });

    it('should return false for an invalid zip code', () => {
        expect(validateZipCode('1234')).toBe(false);
    });
});

describe('validatePersonalNumber', () => {
    it('should return true for a valid personal number', () => {
        expect(validatePersonalNumber('123456-7890')).toBe(true);
    });

    it('should return false for an invalid personal number', () => {
        expect(validatePersonalNumber('123456-7899')).toBe(false);
    });
});

describe('validateText', () => {
    it('should return true for a non-empty string', () => {
        expect(validateText('Hello')).toBe(true);
    });

    it('should return false for an empty string', () => {
        expect(validateText('')).toBe(false);
    });
});
