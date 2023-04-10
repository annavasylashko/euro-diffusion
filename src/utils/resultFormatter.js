/**
 * Convert diffusion result map to string
 * @param {Map<string, number>} diffusionResult ({ Spain => 382, France => 1325 })
 * @returns {string} formatted to string diffusion result ("Spain 382\nFrance 1325")
 */
export const resultToStringFormatter = (diffusionResult) => {
    const results = [];

    for (const [countryName, days] of diffusionResult.entries()) {
        results.push(`${countryName} ${days}`);
    }

    return results.join('\n');
};
