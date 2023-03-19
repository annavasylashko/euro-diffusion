import City from './City.js';

class GridDictionary {
    constructor() {
        this.map = new Map();
    }
    key(coords) {
        return `${coords.x}-${coords.y}`;
    }
    set(coords, value) {
        const key = this.key(coords);
        this.map.set(key, value);
    }
    get(coords) {
        const key = this.key(coords);
        return this.map.get(key);
    }
}

export class MapGrid {
    countriesGrid = new GridDictionary();

    constructor(countries) {
        this.countries = countries;
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;

        // find min/max coords
        countries.forEach((country) => {
            this.minX = Math.min(this.minX, country.coordinates.xl);
            this.minY = Math.min(this.minY, country.coordinates.yl);
            this.maxX = Math.max(this.maxX, country.coordinates.xh);
            this.maxY = Math.max(this.maxY, country.coordinates.yh);
        });

        this.addCitiesToCountries();
        this.addNeighboursToCities();
    }

    /**
     * Check if all countries have coins of each motif
     * @returns {boolean} Flag that shows is diffusion completed
     */
    isCompleted() {
        return this.countries.every((country) => country.isCompleted());
    }

    /**
     * Create and set cities to countries
     */
    addCitiesToCountries() {
        const coinTypes = this.countries.map((country) => country.name);

        this.countries.forEach((country, countryIndex) => {
            for (let x = country.coordinates.xl; x <= country.coordinates.xh; x += 1) {
                for (let y = country.coordinates.yl; y <= country.coordinates.yh; y += 1) {
                    const city = new City(coinTypes, country.name);
                    this.countriesGrid.set({ x, y }, city);
                    this.countries[countryIndex].addCity(city);
                }
            }
        });
    }

    /**
     * Fill neighbours array in cities
     */
    addNeighboursToCities() {
        for (let x = this.minX; x <= this.maxX; x += 1) {
            for (let y = this.minY; y <= this.maxY; y += 1) {
                const city = this.countriesGrid.get({ x, y });

                if (!city) {
                    continue;
                }

                const neighbours = [];

                const addNeighbour = (x, y) => {
                    const neighbourCity = this.countriesGrid.get({ x, y });

                    if (neighbourCity) {
                        neighbours.push(neighbourCity);
                    }
                };

                if (x < this.maxX) {
                    addNeighbour(x + 1, y); // right neighbour
                }
                if (x > this.minY) {
                    addNeighbour(x - 1, y); // left neighbour
                }
                if (y < this.maxY) {
                    addNeighbour(x, y + 1); // up neighbour
                }
                if (y > this.minY) {
                    addNeighbour(x, y - 1); // down neighbour
                }

                if (this.countries.length > 1 && !neighbours.length) {
                    throw new Error(`City in ${city.countryName} has no neighbours`);
                }

                city.neighbours = neighbours;
            }
        }
    }

    /**
     * Start emulation of euro diffusion
     * @returns {Map<string, number>} diffusionResult ({ Spain => 382, France => 1325 })
     */
    startDiffusionEmulation() {
        this.countriesGrid = new GridDictionary();
        const result = new Map();
        let currentDay = 0;

        do {
            this.countries.forEach((country) => {
                country.cities.forEach((city) => {
                    city.transportCoinsToNeighbours();
                });

                if (country.isCompleted()) {
                    if (!result.has(country.name)) {
                        result.set(country.name, currentDay);
                    }
                }
            });

            this.countries.forEach((country) => {
                country.cities.forEach((city) => {
                    city.updateCoins();
                });
            });
            currentDay += 1;
        } while (!this.isCompleted());

        // check if result has all countries
        this.countries.forEach((country) => {
            if (!result.has(country.name)) {
                result.set(country.name, currentDay);
            }
        });

        return result;
    }

    /**
     * Convert diffusion result map to string
     * @param {Map<string, number>} diffusionResult ({ Spain => 382, France => 1325 })
     * @returns {string} formatted to string diffusion result ("Spain 382\nFrance 1325")
     */
    static resultToStringFormatter(diffusionResult) {
        const results = [];

        for (const [countryName, days] of diffusionResult.entries()) {
            results.push(`${countryName} ${days}`);
        }

        return results.join('\n');
    }
}

export default MapGrid;
