/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {

    const filtered = Object.entries(obj).filter(el => fields.includes(el[0]));
  
    let newObj = {};
  
    for (let i of filtered) {
        newObj[i[0]] = i[1];
    }
  
    return newObj;
    
};
