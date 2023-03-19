import City from './City.js';

const COORDINATES = {
    MIN: 1,
    MAX: 10,
};
const MAX_NAME_LENGTH = 25;

export class Country {
    constructor(name, coordinates) {
        if (!Country.areCoordinatesValid(coordinates)) {
            throw new Error('Coordinates are invalid');
        }
        if (name.length > MAX_NAME_LENGTH) {
            throw new Error(`Name must be less than ${MAX_NAME_LENGTH} characters`);
        }
        this.cities = [];
        this.name = name;
        this.coordinates = coordinates;
    }

    /**
     * Check if coordinates are valid
     * @param {object} coordinates
     */
    static areCoordinatesValid({ xl, yl, xh, yh }) {
        const isCorrectLowHighRange = (low, high) => {
            return low <= high;
        };

        const areCoordinatesInBounds = (coordinates) => {
            return coordinates.map((coordinate) => {
                if (!Number.isInteger(coordinate)) return false;

                return ((coordinate >= COORDINATES.MIN) && (coordinate <= COORDINATES.MAX));
            }).every(Boolean);
        };

        const areInBounds = areCoordinatesInBounds([xl, yl, xh, yh]);
        const xRangeValid = isCorrectLowHighRange(xl, xh);
        const yRangeValid = isCorrectLowHighRange(yl, yh);

        return areInBounds && xRangeValid && yRangeValid;
    }

    /**
     * Add city to country cities
     * @param {City} city - City to add
     */
    addCity(city) {
        this.cities.push(city);
    }

    /**
     * Check if all cities have coins of each motif
     * @returns {boolean} Flag that shows is diffusion completed in country
     */
    isCompleted() {
        return this.cities.every((city) => city.isCompleted());
    }

    /**
     * Get country object form string
     * @param {string} countryString - string in format '{name} {xl} {yl} {xh} {yh}'
     * @returns {Country}
     */
    static parseCountryString(countryString) {
        const [name, ...coordinates] = countryString.split(' ');
        const [xl, yl, xh, yh] = coordinates.map((coordinate) => parseInt(coordinate));

        return new Country(name, { xl, yl, xh, yh });
    }
}

export default Country;
