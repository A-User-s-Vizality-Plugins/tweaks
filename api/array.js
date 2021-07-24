const _remove = (array, func) => {
    array.splice(array.findIndex(func), 1)
}

const removeElement = (array, element, debug = false) => {
    if ((!array || !element) && !debug) return
    if (typeof element === "function") {
        _remove(array, element)
    } else {
        _remove(array, e => e === element)
    }
}

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

export default {
    removeElement,
    moveArray
}