import Country from '../entities/Country.js';
import MapGrid from '../entities/MapGrid.js';

it('should add all keys to result map ', () => {
    const diffusionResult = new MapGrid([
        new Country('France', { xl: 1, yl: 4, xh: 4, yh: 6 }),
        new Country('Spain', { xl: 3, yl: 1, xh: 6, yh: 3 }),
        new Country('Portugal', { xl: 1, yl: 1, xh: 2, yh: 2 }),
    ]).startDiffusionEmulation();

    expect(Array.from(diffusionResult.keys()).sort())
    .toEqual(['France', 'Spain', 'Portugal'].sort());
});

it('should throw an error if one country does not have neighbors', () => {
    expect(() => new MapGrid([
        new Country('Country 1', { xl: 1, yl: 1, xh: 1, yh: 1 }),
        new Country('Country 2', { xl: 3, yl: 3, xh: 3, yh: 3 }),
    ])).toThrow();
});

it('should throw an error if creating country with wrong coordinates', () => {
    expect(() => new MapGrid([
        new Country('Country 1', { xl: 11, yl: 1, xh: 1, yh: 1 }),
    ])).toThrow();

    expect(() => new Country('Country 2', { xl: 2, yl: 1, xh: 1, yh: 1 })).toThrow();
    expect(() => new Country('Country 3', { xl: -1, yl: 1, xh: 1, yh: 1 })).toThrow();
    expect(() => new Country('Country 4', { xl: 1, yl: 1, xh: 3.4, yh: 4 })).toThrow();
    expect(() => new Country('Country 4', { xl: 1, yl: 2, xh: 3, yh: NaN })).toThrow();
});

describe('Required sample cases', () => {
    it('should handle Case Number 1', () => {
        const diffusionResult = new MapGrid([
            new Country('France', { xl: 1, yl: 4, xh: 4, yh: 6 }),
            new Country('Spain', { xl: 3, yl: 1, xh: 6, yh: 3 }),
            new Country('Portugal', { xl: 1, yl: 1, xh: 2, yh: 2 }),
        ]).startDiffusionEmulation();
        expect(diffusionResult.get('Spain')).toBe(382);
        expect(diffusionResult.get('Portugal')).toBe(416);
        expect(diffusionResult.get('France')).toBe(1325);
    });

    it('should handle Case Number 2', () => {
        const diffusionResult = new MapGrid([
            new Country('Luxembourg', { xl: 1, yl: 1, xh: 1, yh: 1 }),
        ]).startDiffusionEmulation();
        expect(diffusionResult.get('Luxembourg')).toBe(0);
    });

    it('should handle Case Number 3', () => {
        const diffusionResult = new MapGrid([
            new Country('Netherlands', { xl: 1, yl: 3, xh: 2, yh: 4 }),
            new Country('Belgium', { xl: 1, yl: 1, xh: 2, yh: 2 }),
        ]).startDiffusionEmulation();
        expect(diffusionResult.get('Netherlands')).toBe(2);
        expect(diffusionResult.get('Belgium')).toBe(2);
    });
});
