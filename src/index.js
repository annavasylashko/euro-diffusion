import { readFile } from "./file-io/file-io.js";
import { decode, encode } from "./euro-diffusion/coding.js";
import { processCase } from "./euro-diffusion/diffusion.js";

export const main = () => {
    try {
        const filename = process.argv[2] || 'input.txt'
        const input = readFile(filename)
    
        const cases = decode(input)
        const resultStates = cases.map(processCase)
        const resultString = encode(resultStates)
    
        console.log(resultString)
        return resultString
    } catch (error) {
        console.log(error);
    }
};

main();
