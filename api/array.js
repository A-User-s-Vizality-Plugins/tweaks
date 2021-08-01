const _remove = (array, func) => {
    array.splice(array.findIndex(func), 1)
}

/**
 * Removes an element from array
 * @param {Array} array Array to process
 * @param {*} element Element to remove
 * @param {Boolean} [ignoreErrors=false] If should proceed if undefined is recived
 */
const removeElement = (array, element, ignoreErrors = false) => {
    if ((!array || !element) && !ignoreErrors) return
    if (typeof element === "function") {
        _remove(array, element)
    } else {
        _remove(array, e => e === element)
    }
}

/**
 * Moves an element from array
 * @param {Array} array Array to process
 * @param {Number} from Locate the element
 * @param {Number} to Place to move
 * @returns {Array<*>} the modified array
 */
const moveArray = (array, from, to) => {
    if (to === from) return array;

    var target = array[from];
    var increment = to < from ? -1 : 1;

    for (var k = from; k != to; k += increment) {
        array[k] = array[k + increment];
    }
    array[to] = target;
    return array;
}

/**
 * Adds an element after a specified index
 * @param {Array} array Array to process
 * @param {*} item Item to add
 * @param {Number} place Where to add
 * @returns {Array<*>} the modified array
 */
export const insertAfter = (array, item, place) => {
    let temp = [...array] // Remove link with variable
    temp.splice(place, 0, item)
    return temp
}

/**
 * Adds an element before a specified index
 * @param {Array} array Array to process
 * @param {*} item Item to add
 * @param {Number} place Where to add
 * @returns {Array<*>} the modified array
 */
export const insertBefore = (array, item, place) => {
    let temp = [...array] // Remove link with variable
    temp.splice(array.length - place, 0, item)
    return temp
}

export default {
    removeElement,
    moveArray,
    insertAfter,
    insertBefore
}