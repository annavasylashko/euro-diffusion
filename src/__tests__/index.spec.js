import { main } from "../index.js";
import { ERRORS } from "../constants/errors.js";
import { decode } from "../euro-diffusion/coding.js";

describe('Required sample cases', () => {
    const diffusionResult = main();
    /*
    "Case number 1\nSpain 382\nPortugal 416\nFrance 1325\nCase number 2\nLuxembourg 0\nCase number 3\nBelgium 2\nNetherlands 2"
    */
        
    const resultLines = diffusionResult.split("\n");
    /*
    [
      'Case number 1',
      'Spain 382',
      'Portugal 416',
      'France 1325',
      'Case number 2',
      'Luxembourg 0',
      'Case number 3',
      'Belgium 2',
      'Netherlands 2'
    ]
    */
    const resultLineParts = resultLines.map((line) => line.split(" "));
    /*
    [
      [ 'Case', 'number', '1' ],
      [ 'Spain', '382' ],
      [ 'Portugal', '416' ],
      [ 'France', '1325' ],
      [ 'Case', 'number', '2' ],
      [ 'Luxembourg', '0' ],
      [ 'Case', 'number', '3' ],
      [ 'Belgium', '2' ],
      [ 'Netherlands', '2' ]
    ]
    */
    
    console.log(resultLineParts);

    it('should handle Case Number 1', () => {
        expect(resultLineParts[1][0]).toBe('Spain');
        expect(resultLineParts[1][1]).toBe('382');

        expect(resultLineParts[2][0]).toBe('Portugal');
        expect(resultLineParts[2][1]).toBe('416');

        expect(resultLineParts[3][0]).toBe('France');
        expect(resultLineParts[3][1]).toBe('1325');
    });

    it('should handle Case Number 2', () => {
        expect(resultLineParts[5][0]).toBe('Luxembourg');
        expect(resultLineParts[5][1]).toBe('0');
    });

    it('should handle Case Number 3', () => {
        expect(resultLineParts[7][0]).toBe('Belgium');
        expect(resultLineParts[7][1]).toBe('2');

        expect(resultLineParts[8][0]).toBe('Netherlands');
        expect(resultLineParts[8][1]).toBe('2');
    });
});

describe("Validation", () => {
    it('should throw error if countries amount (first case line) has incorrect format', () => {
        const input = "test\nFrance 1 4 4 6\n0";

        expect(() => decode(input)).toThrow(ERRORS.VALIDATION.INPUT_FORMAT);
    });

    it('should throw error if countries amount exceeds limit', () => {
        const input = "30\nFrance 1 4 4 6\n0";

        expect(() => decode(input)).toThrow(ERRORS.VALIDATION.MAX_COUNTRIES);
    });

    it('should throw error if country in case contains not name & 4 coordinates (aka 5 parts)', () => {
        const input = "3\nFrance 1 2 4 4 6\n0";

        expect(() => decode(input)).toThrow(ERRORS.VALIDATION.INPUT_FORMAT);
    });

    it('should throw error if coordinates are not numbers', () => {
        const input = "3\nFrance test 4 4 6\n0";

        expect(() => decode(input)).toThrow(ERRORS.VALIDATION.COORDINATES);
    });

    it('should throw error if max coordinates are bigger than min coordinates', () => {
        const input = "3\nFrance 8 4 4 6\n0";

        expect(() => decode(input)).toThrow(ERRORS.VALIDATION.COORDINATES);
    });

    it('should throw error if max coordinates exceed grid limit', () => {
        const input = "3\nFrance 1 300 4 6\n0";

        expect(() => decode(input)).toThrow(ERRORS.VALIDATION.COORDINATES);
    });
});

