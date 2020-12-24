/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if (typeof size === 'undefined') return string;
    if (string.length === 0 || size === 0) return '';
    
    let result = '', 
        prevLetter = '',
        count = 0;
    const letters = Array.from(string);

    for (let i = 0; i < letters.length; i++) {
        if (prevLetter !== letters[i] || count < size) {
        result += letters[i];
        }
        if (count === size) count = 0;
        count++;
        prevLetter = letters[i];
    }
    
    return result;
}