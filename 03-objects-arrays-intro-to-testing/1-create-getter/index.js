/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  
    return function (obj) {
      if (Object.entries(obj).length > 0) {
        const pathToArr = path.split('.');
        let keys = obj[pathToArr[0]];
  
        for (let i = 1; i < pathToArr.length; i++) {
          keys = keys[pathToArr[i]];
        }
  
        return keys;
      }
    }
  }
  
