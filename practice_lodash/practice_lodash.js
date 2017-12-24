; (function () {
    'use strict'

    function chunk(array, size = 1) {
        var len = array.length;
        var result = [];
        var index = 0;
        while (index < len) {
            result.push(array.slice(index, index + size))
            index += size;
        }
        return result;
    }

    function eq(compare, comppared) {
        return (compare === comppared || Object.is(compare, comppared)) ? true : false;
    }

    function compact(arr) {
        return filters(arr, function (item, index, arr) {
            return !!item === true ? true : false;
        })
    }
    function filters(arr, test) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            if (test(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    function rest(arr) {
        return arr.splice(arr[0], arr[arr.length - 1]);
    }

    function drop(arr, n = 1) {
        return arr.slice(n);
    }

    function dropRight(arr, n = 1) {
        return drop(arr.reverse(), n).reverse();
    }

    function sLice(arr, start, end = arr.length) {
        return arr.splice(start, end);
    }


    function map(arr, mapper) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            result.push(mapper(arr[i]));
        }
        return result;
    }

    function join(arr, arrjner) {
        return reduce(arr, function (result, value, index) {
            if (index == arr.length - 1) {
                return result + value;
            }
            return result + value + arrjner;
        }, '')
    }


    function once(fn) {
        var called = false;
        return function (...args) {
            if (!called) {
                called = true;
                return fn(...args);
            }
        }
    }

    function filp(fn) {
        return function (...args) {
            return fn(...args.reverse())
        }
    }

    function negate(fn) {
        return function (n) {
            if (fn(n)) {
                return false;
            } else {
                return true;
            }
        }
    }

    function Each(collection, iter) {
        for (var key in collection) {
            if (false === iter(collection[key], key, collection))
                break;
        }
    }


    function keys(obj) {
        var result = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                result.push(key)
            }
        }
        return result;
    }

    function numberTostring(n, base) {
        var result = '', sign = '';
        if (n < 0) {
            sigb = '-';
            n = -n
        }
        do {
            result = String(n % base) + result;
            n = n / base
        } while (n > 0) {
            return sign + result;
        }
    }

    function take(arr, n = 1) {
        return arr.slice(0, n);
    }

    function takeRight(arr, n = 1) {
        return arr.reverse().slice(0, n).reverse();
    }

    function size(obj) {
        return Object.keys(obj).length;
    }

    function size(obj) {
        var count = 0;
        for (var key in obj) {
            count++
        }
        return count
    }

    function add(augend, addend) {
        return augend + addend;
    }

    function keys(obj) {
        var result = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                result.push(key);
        }
        return result;
    }

    function keyIn(obj) {
        var result = [];
        for (var key in obj) {
            result.push(key);
        }
        return result;
    }

    function creates(proto) {
        function A() { };
        A.prototype = proto;
        return new A();
    }

    function clone(obj) {
        if (isArrays(obj)) {
            return obj.slice();
        }
        var arr = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr[key] = obj[key]
            }
        }
        return arr;
    }

    function gt(value, other) {
        return value > other ? true : false;
    }

    function gte(value, other) {
        return value >= other ? true : false;
    }

    function isArguments(values) {
        return Object.prototype.toString.call(values) === "[object Arguments]";
    }

    function isArrays(test) {
        return Object.prototype.toString.call(test) === "[object Array]";
    }


    function constant(n) {
        return function () {
            return n;
        }
    }

    function first(arr) {
        return arr[0];
    }

    function last(arr) {
        return arr[lengt - 1];
    }

    function reverse(arr) {
        var r = []
        for (var i = arr.length - 1; i >= 0; i--) {
            r.push(arr[i]);
        }
        return r
    }

    function reverseString(str) {
        var r = '';
        for (var i = str.length - 1; i >= 0; i--) {
            r += str[i];
        }
        return r;
    }


    function getTypr(values) {
        return Object.prototype.toString.call(values).slice(8, -1).toLowerCase();
    }

    function findIndex(arr, predicate, index = 0) {
        for (var i = 0; i < arr.length; i++) {
            var value = arr[i];
            if (predicate(value, i), index)
                return i
        }
        return -1
    }
    function find(collection, predicate, index = 0) {
        for (let key in collection) {
            if (predicate(collection[key], index)) {
                return collection[key];
            }
        }
    }

    function indexOf(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                return i;
            }
        }
        return -1
    }

    function reMove(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }
    function flattenDeep(arr) {
        while (arr.some(item => Array.isArray(item))) {
            arr = Array.prototype.concat(...arr);
        }
        return arr;
    }

    function flattenDeeps(arr) {
        var result = [];
        function forDeeps(ary) {
            for (var i = 0; i < ary.length; i++) {
                if (Array.isArray(ary[i])) {
                    forDeeps(ary[i])
                } else {
                    result.push(ary[i])
                }
            }
        }
        forDeeps(arr)
        return result;
    }

    function bind(fn, ...fixedArgs) {
        return function (...receivedArgs) {
            for (var i = 0; i < fixedArgs.length; i++) {
                if (fixedArgs[i] === _) {
                    fixedArgs[i] = receivedArgs.shift();
                }
            }
            var Args = fixedArgs.concat(receivedArgs);
            return fn(...Args);
        }
    }


    function reduce(arr, reducer, values) {
        var start = values === undefined ? 1 : values;
        for (var key in arr) {
            start = reducer(start, arr[key], key, arr);
        }
        return start;
    }


    function initial(arr) {
        return arr.splice(0, arr.length - 1, )
    }

    function containsAll(str, ...srgs) {
        for (var i = 0; i < srgs.length; i++) {
            if (str.indexOf(srgs[i]) === -1) {
                return false;
            }
        }
        return true;
    }


    function mostTimes(fn, n) {
        let count = 0;
        return function (...args) {
            if (conunt < n) {
                count++;
                return fn(...args);
            }
        }
    }

    function constant(value) {
        return function () {
            return value;
        }
    }

    function identity(value) {
        return value;
    }

    function toArray(value) {
        return [].concat(value);
    }

    function difference(arr, ...value) {
        for (var i = 0; i < arr.length; i++) {
            value.filter(item => {
                if (arr[i] === item) {
                    arr.splice(i, 1)
                }
            })
        }
        return arr;
    }

    function fill(arr, value, start = 0, end = arr.length) {
        for (var i = start; i < end; i++) {
            arr[i] = value
        }
        return arr;
    }

    function pull(arr, ...value) {
        for (var i = 0; i < arr.length; i++) {
            value.forEach(item => {
                if (item === arr[i]) {
                    arr.splice(i, 1)
                }
            })
        }
        return arr;
    }

    function isEqual(obj, other) {
        if (isNaN(obj) && isNaN(other)) {
            return true;
        }
        if (typeof obj !== 'object' && typeof other !== 'object') {
            return obj === other ? true : false;
        }

        var v1, v2;
        var size1 = 0, size2 = 0;
        for (prop in obj) {
            size1++
        }
        for (prop in other) {
            size2++
        }
        if (size1 !== size2) {
            return false
        }
        for (prop in obj) {
            v1 = obj[prop]
            v2 = other[prop]
            if (typeof v1 === 'object') {
                if (!isEqual(v1, v2)) {
                    return false
                }
            } else {
                if (v1 !== v2) {
                    return false
                }
            }
        }
        return true;
    }


    function isMatch(obj, source) {
        for (var key in source) {
            if (!isEqual(obj[key], source[key])) {
                return false;
            }
        }
        return true;
    }

    function delay(fn, wait, ...args) {
        setTimeout(function () {
            fn(...args)
        }, wait)
    }

    function repeat(fn, tims, duration) {
        return function () {
            for (var i = 0; i < tims; i++) {
                setTimeout(fn(), duration)
            }
        }
    }

    function repeats(fn, tims, duration) {
        return function () {
            var t = setInterval(fn, duration)
            setTimeout(function () {
                clearInterval(t)
            }, tims * duration)
        }
    }

    function attempt(source) {
        return function () {
            return source
        }
    }

    function unary(fn) {
        return function (arg) {
            fn(arg)
        }
    }

    function spread(fn) {
        return function (ary) {
            return fn.apply(null, ary)
        }
    }
})();
