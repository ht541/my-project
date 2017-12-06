; (function () {
    'use strict'

    /* Array */
    function chunk(array, size = 1) {
        const arrLen = array.length;
        let index = 0,
            result = [];
        while (index < arrLen) {
            result.push(array.slice(index, index + 1))
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

    function reduce(arr, reducer, values) {
        var start = values === undefined ? 1 : values;
        for (var key in arr) {
            start = reducer(start, arr[key], key, arr);
        }
        return start;
    }

    function join(arr, arrjner) {
        return reduce(arr, function (result, value, index) {
            if (index === arr.length - 1) {
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

    function forEach(arr, action) {
        for (var i = 0; i < arr.length; i++) {
            action(arr[i], i);
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

    function teke(arr, n = 1) {
        return arr.slice(0, n);
    }

    function size(obj) {
        if (isArrays(obj)) {
            return obj.length;
        } else {
            return Object.keys(obj).length;
        }
    }

    function isArrays(test) {
        return Object.prototype.toString.call(test) === "[object Array]";
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
         if(isArrays(obj)){
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
 
     function constant(n){
         return function(){
             return n;
         }
     }

     function first(arr){
         return arr[0];
     }

     function last(arr){
         return arr[lengt-1];
     }
     
   
})();