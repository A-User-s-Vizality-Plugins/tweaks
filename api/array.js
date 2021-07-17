const removeElement = (array, element) => {
    return array.filter(item => {
        let searchModule = element
        if (typeof element === "function") {
            searchModule = array.find(element)
        }
        return item !== searchModule
    })
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