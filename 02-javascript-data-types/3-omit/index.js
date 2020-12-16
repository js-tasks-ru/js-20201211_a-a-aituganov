/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
    let filtered = Object.entries(obj).filter(el => !fields.includes(el[0]));
  
    let newObj = {};
  
    for (let i of filtered) {
        newObj[i[0]] = i[1];
    }
  
    return newObj;
};
