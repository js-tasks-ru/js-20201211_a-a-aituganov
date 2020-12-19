/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  
    function makeSorting(array, direction) {
        return [...array].sort((string1, string2) =>
            direction * string1.localeCompare(string2, ['ru', 'en'], {caseFirst: 'upper'}));
    }
    
    if (param === 'asc') return makeSorting(arr, 1);
    else if (param === 'desc') return makeSorting(arr, -1);
    else return arr;

}
