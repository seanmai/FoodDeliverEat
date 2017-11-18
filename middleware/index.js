var middlewareObj = {};

middlewareObj.notInArray = function(item, arr) {
    for(var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return false;
        }
    }
    return true;
}

module.exports = middlewareObj;
