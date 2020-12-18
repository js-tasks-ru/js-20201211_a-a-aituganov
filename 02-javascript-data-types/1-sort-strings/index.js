/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

    const newArr = arr.slice();
  
    function compare(first, second) {
      return first.localeCompare(second, 'ru-en', {caseFirst: "upper"});
    }
    
    if (param === 'asc') {
        return newArr.sort((a, b) => compare(a, b));
    } else if (param === 'desc') {
        return newArr.sort((a, b) => compare(b, a));
    }

}
