/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {

    const newObj = (typeof obj === 'undefined') 
    ? undefined // если в параметр функции не передан аргумент, будет undefined 
    : Object.fromEntries(Object.entries(obj).map(el => el.reverse())); // иначе создается клон с инвертированными данными
    
    return newObj;

}
