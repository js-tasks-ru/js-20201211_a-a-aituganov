/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    
    return function (obj) {

        if (Object.entries(obj).length > 0) { // если объект не пустой
        
            const pathToArr = path.split('.'); // преобразуем входной аргумент в массив, чтобы искать по ключам

            let key = obj[pathToArr[0]]; // первый ключ в объекте
        
            for (let i = 1; i < pathToArr.length; i++) { // крутим цикл пока не дойдем до занчения последнего ключа
                key = key[pathToArr[i]]; 
            }
        
            return key;
        }
    }

}
