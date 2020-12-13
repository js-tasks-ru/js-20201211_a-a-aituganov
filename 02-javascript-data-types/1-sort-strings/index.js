/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let newArr = arr.slice();
   let collator = new Intl.Collator(undefined, {
     caseFirst: "upper"
   });
    
   (param === "asc") ? newArr.sort((a, b) => collator.compare(a, b)) :
   (param === "desc") ? newArr.sort((a, b) => collator.compare(b, a))
}