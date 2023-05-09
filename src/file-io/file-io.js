import fs from 'fs';
import { ERRORS } from '../constants/errors.js';

const readFile = (filename) => {
    try {
        const contents = fs.readFileSync(filename, 'utf8');
        return contents;
    } catch (error) {
        throw new Error(ERRORS.FILE.NO_FILE_NAME);
    }
}

export { readFile }