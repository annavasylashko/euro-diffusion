import FileReader from './FileReader.js';
import MapGrid from './entities/MapGrid.js';
import Country from './entities/Country.js';
import { resultToStringFormatter } from './utils/resultFormatter.js';

const processCase = (countriesStrings) => {
    try {
        const countries = [];

        countriesStrings.map((countryString) => {
            countries.push(Country.parseCountryString(countryString));
        });
        
        const result = new MapGrid(countries).startDiffusionEmulation();
        const formattedResult = resultToStringFormatter(result);

        console.log(formattedResult);
    } catch (error) {
        console.error(error.toString());
    }
};

const main = () => {
    const countryStrings = FileReader.parse('inputFile');

    countryStrings.map((countries, idx) => {
        console.log(`${idx ? '\n' : ''}Case Number ${idx + 1}`);
        processCase(countries);
    });
};

main();
