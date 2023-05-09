import { CONFIG } from "../constants/config.js";
import { ERRORS } from "../constants/errors.js";

const decode = (string) => {
    const lines = string.split('\n').map((line) => line.replace('\r', ''))
    let lineNumber = 0
    let cases = new Array()

    while (lines[lineNumber] !== "0") {
        let countries = {}

        /**
         * Check if countries amount (first case line) has correct format
         */
        if (!Number(lines[lineNumber])) {
            throw new Error(ERRORS.VALIDATION.INPUT_FORMAT)
        }

        /**
         * Check if countries amount doesn't exceed limit
         */
        if (+lines[lineNumber] > CONFIG.MAX_COUNTRIES) {
            throw new Error(ERRORS.VALIDATION.MAX_COUNTRIES)
        }

        for (let i = 1; i <= +lines[lineNumber]; i++) {
            const parts = lines[lineNumber + i].split(" ")
            const countryName = parts[0]

            /**
             * Check if country in case contains name & 4 coordinates (aka 5 parts)
             */
            if (parts.length !== 5) {
                throw new Error(ERRORS.VALIDATION.INPUT_FORMAT)
            }

            /**
             * Check if coordinates are numbers
             */
            parts.slice(1, 5).map((coordinate) => {
                if (!Number(coordinate)) {
                    throw new Error(ERRORS.VALIDATION.COORDINATES)
                }
            })

            /**
             * Check if max coordinates are not bigger than min coordinates
             */
            if (+parts[1] > +parts[3] || +parts[2] > +parts[4]) {
                throw new Error(ERRORS.VALIDATION.COORDINATES)
            }

            /**
             * Check if max coordinates do not exceed grid limit
             */
            if (+parts[3] > CONFIG.GRID_SIZE || +parts[4] > CONFIG.GRID_SIZE) {
                throw new Error(ERRORS.VALIDATION.COORDINATES)
            }

            let cities = new Set()
            for (let x = parts[1]; x <= parts[3]; x++) {
                for (let y = parts[2]; y <= parts[4]; y++) {
                    cities.add({
                        country: countryName,
                        x: +x,
                        y: +y
                    })
                }
            }

            const country = {
                name: countryName,
                cities: cities
            }

            countries[countryName] = country
        }

        cases.push({
            countries: countries
        })
        
        lineNumber += +lines[lineNumber] + 1
    }

    return cases
}

const encode = (states) => {
    let result = []
    for (const [i, state] of states.entries()) {
        result.push(`Case number ${i + 1}`)
        
        const sortedState = Object.entries(state)
            .sort((a, b) => {
                const diff = a[1] - b[1];
                return diff === 0 ? a[0].localeCompare(b[0]) : diff;
            })
            .map(([key, value]) => `${key} ${value}`);
        
        result.push(...sortedState)
    }

    return result.join("\n")
}

export {decode, encode}