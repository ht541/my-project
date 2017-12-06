    let _ = Symbol('_');
    const log = console.log.bind(console),
          dir = console.dir.bind(console)
    function chunk(array, size = 1) {
        const arrLen = array.length;
        let index = 0,
            result = [];
        while(index < arrLen) {
            result.push(array.slice(index, index + size));
            index += size;
        }
        return result;
    }
    /**
     * sameValueZero算法比较函数，正负零相等且NaN自相等，因为===正负零相等NaN不自相等而
     * Object.is()NaN自相等但正负零不相等，取其并集。
     * @param {any} compare 
     * @param {any} compared 
     * @returns boolean value
     */
    function eq(compare, compared) {
        return (compare === compared || Object.is(compare, compared)) ? true : false;
    }
    function getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
    function compact(array) {
        return array.filter((val, index, arr) => {
            return !!val === true ? true : false;
        });
    }

    function concat(array, ...values) {
        values.forEach(val => {
            if (getType(val) === 'array') {
                array.push(...val);
            }else {
                array.push(val);
            }
        });
        return array;
    }
 
    function difference(array, ...values) {
        const removes = values.reduce((acumulator, val) => {
            return acumulator.concat(val);
        });
        return array.filter((arrayVal) => {
            return !removes.some(removeVal => {
                return eq(removeVal, arrayVal);
            });
        });
    }

    function differenceBy(array, ...values) {
        let lastArg = vlaues.pop();
        const removes = values.reduce((acumulator, val) => {
            return acumulator.concat(val);
        });
        const arr = array.map(iteratee(lastArg)),
              rem = removes.map(iteratee(lastArg)),
              result = [];
        arr.forEach((arrVal,index) => {
            if(!rem.some(remVal => eq(remoVal, arrVal))){
                result.push(array[index]);
            }
        });
        return result;
    }

    function differenceWith(array, ...values) {
        let comparator = values.pop();
        const removes = values.reduce((acumulator, val) => {
            return acumulator.concat(val);
        });
        return array.filter((arrayVal) => {
            return !removes.some(removeVal => {
                return comparator(removeVal, arrayVal);
            });
        });
    }

    function drop(array, n = 1) {
        return array.slice(n);
    }

    function dropRight(array, n = 1) {
        return drop(array.reverse(), n).reverse();
    }

    function clone(value) {
        let result,
            type = getType(value);
        if (type === 'number' || type === 'string' || type === 'boolean' || type === 'null' || type === 'undefined' || type === 'symbol') {
            return value;
        }else if (type === 'date') {
            return new Date(+value);
        }else if (type === 'regexp') {
            result = new RegExp();
            ['lastIndex', 'source', 'flags'].forEach(item => {
                result[item] = value[item];
            });
            return result;
        }else if (type === 'set' || type === 'map') {
            return type === 'set' ? new Set(Array.from(value)) : new Map(Array.from(value));
        }else if (type === 'object' || type === 'array') {
                result = type === 'object' ? {} : [];
                for (let prop in value) {
                    result[prop] = value[prop];
                }
                return result;
        }else {
            return {};
        }
    }

    function dropRightWhile(array, predicate) {
        let n = 0;
        clone(array).reverse().some(item => {
            if(iteratee(predicate)(item)) {
                n += 1;
                return false;
            }else {
                return true;
            }
        });
        return dropRight(array, n);
    }

    function dropWhile(array, predicate) {
        let n = 0;
        array.some(item => {
            if(iteratee(predicate)(item)) {
                n += 1;
                return false;
            }else {
                return true;
            }
        });
        return drop(array, n);
    }

    function fill(array, value, start = 0, end = array.length) {
        let pad = [],
            dif = end - start;
        for (let i = 0; i < dif; i++) {
            pad.push(value);
        }
        array.splice(strat, dif, ...pad);
        return array;
    }

    function findIndex(array, predicate, fromIndex = 0) {
        let result;
        array.slice(fromIndex).some((item,index) => {
            if(iteratee(predicate)(item)) {
                result = index + fromIndex;
                return true;
            }
        });
        return result === undefined ? -1 : result;
    }

    function findLastIndex(array, predicate, fromIndex = array.length - 1) {
        let result;
        array.slice(0, fromIndex + 1).reverse().some((item,index) => {
            if(iteratee(predicate)(item)) {
                result = fromIndex - index;
                return true;
            }
        });
        return result === undefined ? -1 : result;
    }

    function flatten(array) {
        return array.reduce((acumulator, item) => acumulator.concat(item), []);
    }

    function flattenDeep(list, result = []) {
        list.forEach(item => {
            if(Array.isArray(item)) {
                flattenDeep(item, result)
            } else {
                result.push(item)
            }
        })
        return result
    }

    function flattenDepth(array, depth = 1) {
        let result = array;
        for (let i = 0; i < depth; i++) {
            result = flatten(result);
        }
        return result;
    }

    function fromPairs(array) {
        let result = {};
        array.forEach(item => {
            result[item[0]] = item[1];
        })
        return result;
    }

    function head(array) {
        return array[0];
    }

    function indexOf(array, value, fromIndex = 0) {
        let result;
        fromIndex = fromIndex > -1 ? fromIndex : array.length*Math.ceil(-fromIndex/array.length) + fromIndex;
        array.slice(fromIndex).some((item, index) => {
            if (eq(item, value)) {
                result = index + fromIndex;
                return true;
            }
        });
        return result === undefined ? -1 : result;
    }

    function lastIndexOf(array, value, fromIndex = array.length - 1) {
        let result;
        fromIndex = fromIndex > -1 ? fromIndex : array.length*Math.ceil(-fromIndex/array.length) + fromIndex;
        array.slice(0, fromIndex + 1).reverse().some((item, index) => {
            if (eq(item, value)) {
                result = fromIndex - index;
                return true;
            }
        });
        return result === undefined ? -1 : result;
    }

    function initial(array) {
        return array.slice(0, array.length - 1);
    }

    function intersection(...arrays) {
        debugger;
        const head = arrays.shift();
        return head.filter(headItem => arrays.every(arrItem => indexOf(arrItem, headItem) < 0 ? false : true));
    }

    function intersectionBy(...arrays) {
        const predicate = arrays.pop(),
              head = arrays.shift(),
              result = [];
        arrays = arrays.map(array => array.map(iteratee(predicate)));
        clone(head).map(iteratee(predicate)).forEach((headItem, headIdx) => {
            if (arrays.every(arrItem => indexOf(arrItem, headItem) < 0 ? false : true)) {
                result.push(head[headIdx]);
            }
        });
        return result;
    }

    function intersectionWith(...arrays) {
        const comparator = arrays.pop(),
              head = arrays.shift();
        return head.filter(headItem => arrays.every(arrItem =>  arrItem.some(item => comparator(headItem, item))));
    }

    /**
     * 返回第一个参数
     * 
     * @param {any} values 
     * @returns first args
     */
    function identity(...values) {
        return values[0];
    }
    /**
     * 执行深比较来确定两者的值是否相等。 
**注意: **这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects
, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。
 不支持函数和DOM节点比较。
     * 
     * @param {any} value 
     * @param {any} other 
     * @returns 
     */
    function isEqual(value, other) {
        const valType = getType(value),
              otherType = getType(other);
        let type;
        if (valType !== otherType) {
            return false;
        }
        type = valType;
        if (type === 'null' || type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean' || type === 'symbol') {
            return eq(value, other);
        }else if (type === 'date') {
            return isEqual(+value, +other);
        }else if (type === 'error') {
            return ['message', 'stack', 'name'].every(prop => {
                return value[prop] === other[prop];
            });
        }else if (type === 'arraybuffer') {
            if(value.byteLength !== other.byteLength) {
                return false;
            }
            const viewOfValue = new Int8Array(value),
                  viewOfOther = new Int8Array(other);
            return viewOfValue.every((val, index) => val === viewOfOther[index]); 
        }else if (type === 'set' || type === 'map') {
            return isEqual(Array.from(value), Array.from(other));
        }else if(type === 'regexp') {
            return ['lastIndex', 'source', 'flags'].every(prop => {
                return values[prop] === other[prop];
            });
        }else if (type === 'object' || type === 'array') {
            if (value === other) {
                return true;
            }
            let valueProps = Object.getOwnPropertyNames(value),
                otherProps = Object.getOwnPropertyNames(other);
            if (valueProps.length !== otherProps.length) {
                return false;
            }
            return valueProps.every(prop => {
                return isEqual(value[prop], other[prop]);
            });
        }
    }

    function isMatch(object, source) {
        for(let prop in source) {
            if(!isEqual(object[prop], source[prop])) {
               return false; 
            }
        }
        return true;
    }

    function matches(source) {
        return function(object) {
            return isMatch(object, source);
        }
    }

    function matchesProperty(path, srcValue){
        return function(object) {
            return isEqual(property(path)(object), srcValue);
        }
    }
    /**
     * 解析一个path为数组，数组的每一项都为属性名，如果类型为数组直接返回。是字符串就先用.符号分隔成小块，在对没有.符号情况下
     *分为两种形式如a[b][c]或者[d][e]。针对这两种情况再写一个正则进行处理把a,b,c或者d,e提取出来存入props数组。
     * 
     * @param {array/string} path 
     * @returns array
     */
    function toPath(path) {
        const type = getType(path);
        if(type === 'string') {
            let regExp = /(\w*)(?:\[(.+)\])*/,
                props = [];
            path.split('.').forEach(item => {
                let res = regExp.exec(item);
                if(res[1] != null) {
                    props = props.concat(res[1]);
                }
                if(res[2] != null) {
                    props = props.concat(res[2].split(']['));
                }
            });
            return props;
        }
        return path;
    }
    /**
     *接受一个path参数，返回一个接受对象的函数，这个函数返回对象的这个path路径的值。 
     * 
     * @param {any} path 
     * @returns 
     */
    function property(path) {
        const type = getType(path);
        let props = type === 'array' ? path : toPath(path);
        return function (object) {
            let result = object;
            try {
                props.forEach(prop => {
                    result = result[prop];
                });
            }catch(e) {
                console.log('run time error: invalid path,' + e.message);
            }
            return result;
        }
    }
    /**
     * 与property相反。
     * 
     * @param {Obejct} object 
     * @returns value
     */
    function propertyOf(object) {
        return function (path) {
            return property(path)(object);
        }
    }
    /**
     * 返回一个函数，它根据参数的的类型不同采用不同的函数处理。
     * 
     * @param {any} value 
     * @returns 
     */
    function iteratee(value) {
        let type = getType(value);
        return function(...args) {
            if (type === 'function') {
                return value(...args);
            }else if (type === 'object') {
                return matches(value)(identity(...args));
            }else if (type === 'array') {
                return matchesProperty(...value)(identity(...args));
            }else if (type === 'string') {
                return property(value)(identity(...args));
            }
        }
    }

    function attempt(func, ...args) {
        try {
            return func(...args);
        }catch(e) {
            return e;
        }
    }

    function method(path, ...args) {
        return function(object) {
            try {
                return property(object)(...args);
            }catch(e) {
                console.log(e);
            }
        }
    }

    function methodOf(object, ...args) {
        return function(path) {
            try {
                return property(object)(...args);
            }catch(e) {
                console.log(e);
            }
        }
    }

    function join(array, separator = ',') {
        return array.join(separator);
    }

    function last(array) {
        return array[array.length - 1];
    }

    function nth(array, n = 0) {
        return array[n < 0 ? array.length + n : n];
    }

    function pull(array, ...values) {
        for (let i = 0; i < arrays.length; i++) {
            if (indexOf(values, array[i]) > -1) {
                array.splice(i, 1);
                i -= 1;
            }
        }
        return array;
    }

    function pullAll(array, values) {
        return pull(array, ...values);
    }

    function pullAllBy(array, values, predicate) {
        const func = iteratee(predicate),
              vals = values.map(func),
              arrs = array.map(func);
        for (let i = 0; i < arrs.length; i++) {
            if (indexOf(vals, arrs[i]) > -1) {
                arrs.splice(i, 1);
                array.splice(i, 1);
                i -= 1;
            }
        }
        return array;
    }

    function pullAllWith(array, values, comparator) {
        for (let i = 0; i < array.length; i++) {
            if (values.some(value => comparator(value, array[i]))) {
                array.splice(i, 1);
                i -= 1;
            }
        }
        return array;
    }
    /**
     * 这里使用了Symbol值作为占位符，先将对应的indexes中的index筛选出来并同时用唯一的symbol值进行替换占位方便后续
     * 对array进行处理。
     * @param {any} array 
     * @param {any} indexes 
     * @returns 
     */
    function pullAt(array, ...indexes) {
        indexes = flattenDeep(indexes);
        const rd = Symbol('rd'),
              result = clone(array).filter((item, index) => {
                  if(indexOf(indexes, index) > -1) {
                      array[index] = rd;
                      return true;
                  }
              });
        for (let i = 0; i < array.length; i++) {
            if (array[i] === rd) {
                array.splice(i, 1);
                i -= 1;
            }
        }
        return result;
    }

    function remove(array, predicate) {
        const func = iteratee(predicate),
              result = [];
        for (let i = 0; i < array.length; i++) {
            if (func(array[i])) {
                result.push(array[i]);
                array.splice(i, 1);
                i -= 1;
            }
        }
        return result;
    }

    function reverse(array) {
        return array.reverse();
    }

    function slice(array, start = 0, end = array.length) {
        return array.slice(start, end);
    }
    /**
     * 有序数组采用二分查找法，因为需要找出尽可能小的索引， 所以在找到相等的值的索引时还需继续向前查找直到最小。另外一点需要
     * 注意的地方（下面实现方式）就是，当start和end相差值为1时，直接返回end作为索引值即可。
     * @param {any} array 
     * @param {any} value 
     * @returns 
     */
    function sortedIndex(array, value) {
        let start = 0,
            end = array.length - 1,
            index,
            currentIdx = (start, end) => Math.floor((start + end) / 2);
        return (function sorted(array, value) {
            if (array[currentIdx(start, end)] === value) {
                index = currentIdx(start, end) - 1;
                while(array[index] === value) {
                    index -= 1;
                }
                return index + 1;
            }else if (array[currentIdx(start, end)] < value) {
                start = currentIdx(start, end);
                if(end - start > 1) {
                    return sorted(array, value);
                }else {
                    return end;
                }
            }else {
                end = currentIdx(start, end);
                if(end - start > 1) {
                    return sorted(array, value);
                }else{
                    return end;
                }
            }
        })(array, value);
    }

    function sortedIndexBy(array, value, predicate) {
        array = array.map(iteratee(predicate));
        value = iteratee(predicate)(value);
        return sortedIndex(array, value);
    }

    function sortedIndexOf(array, value) {
        let index =  sortedIndex(array, value);
        return array[index] === value ? index : -1;
    }

    function sortedLastIndex(array, value) {
        let start = 0,
        end = array.length - 1,
        index,
        currentIdx = (start, end) => Math.floor((start + end) / 2);
        return (function sorted(array, value) {
            if (array[currentIdx(start, end)] === value) {
                index = currentIdx(start, end) + 1;
                while(array[index] === value) {
                    index += 1;
                }
                return index;
            }else if (array[currentIdx(start, end)] < value) {
                start = currentIdx(start, end);
                if(end - start > 1) {
                    return sorted(array, value);
                }else {
                    return end;
                }
            }else {
                end = currentIdx(start, end);
                if(end - start > 1) {
                    return sorted(array, value);
                }else{
                    return end;
                }
            }
        })(array, value);
    }

    function sortedLastIndexBy(array, value, predicate) {
        array = array.map(iteratee(predicate));
        value = iteratee(predicate)(value);
        return sortedLastIndex(array, value);
    }

    function sortedLastIndexOf(array, value) {
        let index = sortedLastIndex(array, value);
        return array[index - 1] === value ? index - 1 : -1;
    }

    function sortedUniq(array) {
        let result = [];
        array.forEach(item => {
            if(!eq(item, last(result))) {
                result.push(item);
            }
        });
        return result;
    }

    function sortedUniqBy(array, predicate) {
        let result = [],
            temp = [],
            arr = array.map(iteratee(predicate));
        arr.forEach((item,index) => {
            if(!eq(item, last(temp))) {
                temp.push(arr[index]);
                result.push(array[index]);
            }
        });
        return result;
    }

    function tail(array) {
        return array.slice(1);
    }

    function take(array, n = 1) {
        return array.slice(0, n);
    }

    function takeRight(array, n = 1) {
        const len = array.length;
        return n < len ? array.slice(len - n, len) : clone(array);
    }

    function takeRightWhile(array, predicate) {
        let n = 0;
        clone(array).reverse().some(item => {
            if(iteratee(predicate)(item)){
                n += 1;
                return false;
            }
            return true;
        });
        return takeRight(array, n);
    }

    function takeWhile(array, predicate) {
        let n = 0;
        array.some(item => {
            if(iteratee(predicate)(item)){
                n += 1;
                return false;
            }
            return true;
        });
        return take(array, n);
    }
    /**
     * 这里使用了Map数据结构以达到快速查找的目的，否则利用数组，其时间复杂度会变得让人有点难以接受，关键是Map.get()用的是
     * theSameValueZero算法。
     * @param {any} arrays 
     * @returns 
     */
    function union(...arrays) {
        let hash = new Map(),
            array = arrays.reduce((acumulator, array) => acumulator.concat(array));
        return array.filter(item => {
            if(!hash.get(item)) {
                hash.set(item, true);
                return true;
            }
        });
    }

    function unionBy(...arrays) {
        let hash = new Map(),
            result = [],
            predicate = arrays.pop(),
            array = arrays.reduce((acumulator, array) => acumulator.concat(array)),
            arr = array.map(iteratee(predicate));
       arr.forEach((item, index) => {
            if(!hash.get(item)) {
                hash.set(item, true);
                result.push(array[index]);
            }
        });
        return result;
    }

    function unionWith(...arrays) {
        let comparator = arrays.pop(),
            array = arrays.reduce((acumulator, array) => acumulator.concat(array));
        for(let i = 0; i < array.length; i++) {
            for(let j = i + 1; j < array.length; j++) {
                if (comparator(array[i], array[j])) {
                    array.splice(j, 1);
                    j -= 1;
                }
            }
        }
        return array;
    }
    /**
     * 因为set可以去重，并且其去重时保留第一次出现的元素。
     * 
     * @param {any} array 
     * @returns 
     */
    function uniq(array) {
        return Array.from(new Set(array));
    }

    function uniqBy(...arrays) {
        return unionBy(...arrays);
    }

    function uniqWith(...arrays) {
        return unionWith(...arrays);
    }

    function unzip(array) {
        const max = Math.max(...(array.map(item => item.length))),
              result = [];
        for (let i = 0; i < max; i++) {
            result.push(array.map(item => item[i]));
        }
        return result;
    }
    
    function unzipWith(array, predicate) {
        const max = Math.max(...(array.map(item => item.length))),
              result = [];
        for (let i = 0; i < max; i++) {
            result.push(iteratee(predicate)(...(array.map(item => item[i]))));
        }
        return result;
    } 

    function without(array, ...values){
        const hash = new Map();
        values.forEach(value => hash[value] = true);
        return array.filter(item => hash[item] ? false : true);
    }

    function xor(...arrays) {
        return arrays.reduce((acumulator, value) => without(acumulator, ...value).concat(without(value, ...acumulator)));
    }

    function withoutBy(array, ...values) {
        const predicate = values.pop(),
              hash = new Map(),
              func = iteratee(predicate);
        values.forEach(value => hash[func(value)] = true);
        return array.filter(item => hash[func(item)] ? false : true);
    }

    function xorBy(...arrays) {
        const predicate = arrays.pop();
        return arrays.reduce((acumulator, value) => withoutBy(acumulator, ...(value.concat(predicate))).concat(withoutBy(value, ...(acumulator.concat(predicate)))));
    }
    /**
     * 取具有比较函数时的不相交集
     * 
     * @param {any} p 
     * @param {any} n 
     * @param {any} comparator 
     * @returns 
     */
    function getXorWith(p, n, comparator) {
        let pre = clone(p),
            next = clone(n);
        for (let i = 0; i < pre.length; i++) {
            for (let j = 0; j < next.length; j++) {
                if (comparator(pre[i], next[j])) {
                    next.splice(j, 1);
                    pre.splice(i, 1);
                    j -= 1;
                }
            }
        }
        return pre.concat(next);
    }
    function xorWith(...arrays) {
        const comparator = arrays.pop();
        return arrays.reduce((acumulator, value) => getXorWith(acumulator, value, comparator));
    }

    function zip(...arrays) {
        return unzip(arrays);
    }

    function zipObject(...arrays) {
        return fromPairs(arrays);
    }

    function zipObjectDeep(props, values) {
        props = props.map(prop => toPath(prop));
        const result = {};
              propsType = props.map(prop => tail(prop).map(prop => eq(+prop, NaN) ? 'object' : 'array'));
        let temp = result;
        props.forEach((prop, index) => {
             temp = result;
             initial(prop).forEach((item, idx, items) => {
                if(getType(temp[item]) !== propsType[index][idx]) {
                    temp[item] = propsType[index][idx] === 'array' ? [] : {};
                }
                temp = temp[item];
             });
             temp[last(prop)] = values[index];
        })
        return result;
    }

    function zipWith(...arrays) {
        const predicate = arrays.pop();
        return unzipWith(arrays, predicate);
    }

    // All methods of Array be completed

    function countBy(collection, predicate) {
        const result = {},
              func = iteratee(predicate);
        let key;
        for (let prop in collection) {
            key = func(collection[prop]);
            if (result[key] === undefined) {
                result[key] = 1;
            }else {
                result[key] += 1;
            }
        }
        return result;
    }

    function values(object) {
        if (getType(object) === 'array') {
            return object;
        }
        return Object.keys(object).map(key => object[key]);
    }

    function every(collection, predicate) {
        if (isEqual(collection, []) || isEqual(collection, {})) {
            return true;
        }
        const func = iteratee(predicate);
        collection = values(collection); 
        return collection.every(item => func(item));
    }

    function filter(collection, predicate) {
        const func = iteratee(predicate);
        collection = values(collection);
        return collection.filter(item => func(item));
    }

    function find(collection, predicate, fromIndex = 0) {
        const func = iteratee(predicate);
        let result;
        colletion = values(collection);
        collection.slice(fromIndex).some(item => {
            if (func(item)) {
                result = item;
                return true;
            }
        });
        return result;
    }

    function findLast(collection, predicate, fromIndex) {
        const func = iteratee(predicate);
        let result;
        colletion = values(collection);
        fromIndex = collection.length - 1;
        collection.slice(0, fromIndex).reverse().some(item => {
            if (func(item)) {
                result = item;
                return true;
            }
        });
        return result;
    }

    function flatMap(collection, predicate) {
        const func = iteratee(predicate);
        collection = values(collection);
        return flatten(collection.map(item => func(item)));
    }

    function flatMapDeep(collection, predicate) {
        const func = iteratee(predicate);
        collection = values(collection);
        return flattenDeep(collection.map(item => func(item)));
    }

    function flatMapDepth(collection, predicate, depth = 1) {
        const func = iteratee(predicate);
        collection = values(collection);
        return flattenDepth(collection.map(item => func(item)), depth);
    }

    function forEach(collection, predicate) {
        const func = iteratee(predicate),
              keys = Object.keys(collection);
        keys.some(key => func(collection[key], key, collection));
        return collection;
    }

    function forEachRight(collection, predicate) {
        const func = iteratee(predicate),
              keys = Object.keys(collection);
        keys.reverse().some(key => func(collection[key], key, collection));
        return collection;
    }

    function groupBy(collection, predicate) {
        const func = iteratee(predicate),
              result = {},
              values = Object.keys(collection).map(key => collection[key])
        let prop
        values.forEach(value => {
            prop = func(value)
            if(result[prop] === undefined) {
                result[prop] = [value]
            } else {
                result[prop].push(value)
            }
        })
        return result
    }

    function includes(collection, value, fromIndex = 0) {
        const type = getType(collection)
        let index
        if(type === 'string') {
            index = collection.indexOf(value, fromIndex)
        } else if(type === 'object') {
            let values = Object.keys(collection).map(key => collection[key])
            index = indexOf(values, value, fromIndex)
        } else {
            index = indexOf(collection, value, fromIndex)
        }
        return index === -1 ? false : true
    }

    function invokeMap(collection, path, ...args) {
        const type = getType(path),
              values = getType(collection) === 'array' ? collection : Object.keys(collection).map(key => collection[key])
        if(type !== 'function') {
            return values.map(value => property(path)(value).call(value, ...args))
        }
        return values.map(value => path.call(value, ...args))
    }

    function keyBy(collection, predicate) {
        const func = iteratee(predicate),
              result = {},
              values = Object.keys(collection).map(key => collection[key])
        values.forEach(value => {
            result[func(value)] = value
        })
        return result
    }

    function map(collection, predicate) {
        const func = iteratee(predicate)
        return Object.keys(collection).map(key => func(collection[key], key, collection))
    }

    function orderBy(collection, predicates, orders = new Array(predicates.length).fill('asc')) {
        const funcs = predicates.map(predicate => iteratee(predicate)).reverse(),
              values = Object.keys(collection).map(key => collection[key])
        let sequence
        orders = orders.reverse()
        funcs.forEach((func, index) => {
            values.sort((pre, next) => {
                sequence = orders[index] == 'asc' ? -1 : 1
                if(func(pre) < func(next)) return sequence
                else if(func(pre) == func(next)) return 0
                else return -sequence
            })
        })
        return values
    }

    function partition(collection, predicate) {
        const values = Object.keys(collection).map(key => collection[key]),
              result = [[], []],
              func = iteratee(predicate)
        values.forEach(value => {
            if(func(value)) {
                result[0].push(value)
            } else {
                result[1].push(value)
            }
        })
        return result
    }

    function reduce(collection, predicate, accumulator) {
        const func = iteratee(predicate),
              keys = Object.keys(collection)
        return keys.reduce(function (accumulator, val, key, keys) {
            return func(accumulator, collection[val], val, collection)
        }, accumulator)
    }

    function reduceRight(collection, predicate, accumulator) {
        const func = iteratee(predicate),
            keys = Object.keys(collection).reverse()
        return keys.reduce(function (accumulator, val, key, keys) {
            return func(accumulator, collection[val], val, collection)
        }, accumulator)
    }

    function reject(collection, predicate) {
        const func = iteratee(predicate),
              values = Object.keys(collection).map(key => collection[key])
        return values.filter(value => !func(value))
    }

    function sample(collection) {
        const values = Object.keys(collection).map(key => collection[key])
        return 
    }

    function sampleSize(collection, n = 1) {
        const values = Object.keys(collection).map(key => collection[key]),
              result = [],
              len = values.length,
              endIndex = len < n ? len : n
        let index
        for(var i = 0; i < endIndex; i++) {
            index = Math.floor(Math.random() * values.length)
            result.push(values[index])
            values.splice(index, 1)
        }
        return result
    }

    function shuffle(collection) {
        return sampleSize(collection, Object.keys(collection).length)
    }

    function size(collection) {
        if(collection.length != undefined) {
            return collection.length
        }
        return Object.keys(collection).length
    }

    function some(collection, predicate) {
        const func = iteratee(predicate),
              values = Object.keys(collection).map(key => collection[key])
        return values.some(func)
    }

    function sortBy(collection, ...predicates) {
        if(Array.isArray(predicates[0]) && predicates.length == 1) {
            predicates = predicates[0]
        }
        const funcs = predicates.map(predicate => iteratee(predicate)).reverse(),
              values = Object.keys(collection).map(key => collection[key])
        funcs.forEach(func => {
            values.sort((pre, next) => {
                if (func(pre) < func(next)) {
                    return -1
                } else if(func(pre) == func(next)) {
                    return 0
                } else {
                    return 1
                }
            })
        })
        return values
    }
    // methods of Date
    
    function now() {
        return Date.now()
    }
    // methods of Object

    function assign(object, ...sources) {
        sources.forEach(source => keys(source).forEach(key => object[key] = source[key]));
        return object;
    }

    function keys(object) {
        return Object.keys(object);
    }

    function keysIn(object) {
        let result = [];
        for(let prop in object) {
            result.push(prop);
        }
        return result;
    }

    function assignIn(object, ...sources) {
        sources.forEach(source => keysIn(source).forEach(key => object[key] = source[key]));
        return object;
    }

    function assignInWith(object, ...rest) {
        const customizer = rest.pop(),
              sources = rest
        let temp
        sources.forEach(source => keysIn(source).forEach(key => {
            temp = customizer(object[key], source[key])
            if(temp === undefined) {
                object[key] = source[key]
            } else {
                object[key] = temp
            }
        }));
        return object;
    }

    function assignWith(object, ...rest) {
        const customizer = rest.pop(),
            sources = rest
        let temp
        sources.forEach(source => keys(source).forEach(key => {
            temp = customizer(object[key], source[key])
            if (temp === undefined) {
                object[key] = source[key]
            } else {
                object[key] = temp
            }
        }));
        return object;
    }

    function at(object, ...paths) {
        paths = Array.isArray(paths[0]) && paths.length == 1 ? paths[0] : paths
        return paths.map(path => propertyOf(object)(path))
    }

    function create(object, properties) {
        var F = function(){}
        F.prototype = object
        var result = new F()
        if(properties) {
            assign(result, properties)
        }
        return result
    }

    function defaults(object, ...sources) {
        sources.forEach(source => {
            keys(source).forEach(key => {
                if(!(key in object)) {
                    object[key] = source[key]
                }
            })
        })
        return object
    }

    function defaultsDeep(object, ...sources) {
        function areAryOrObj(value1, value2) {
            const type1 = getType(value1),
                  type2 = getType(value2)
            return type1 == type2 && (type1 == 'array' || type1 == 'object')
        }
        function helper(object, source) {
            keys(source).forEach(key => {
                if(!(key in object)) {
                    object[key] = source[key]
                } else if(areAryOrObj(object[key], source[key])) {
                    helper(object[key], source[key])
                }
            })
        }
        sources.forEach(source => helper(object, source))
        return object
    }
    //methods of Function

    function after(n, func) {
        let times = 0;
        return function (...args) {
            if (times < n) {
                times += 1;
            }else {
                return func.apply(this, args);
            }
        }
    }

    function ary(func, n = func.length) {
        return function(...args) {
            return func(...take(args, n));
        }
    }

    function before(n, func) {
        let times = 0,
            result;
        return function(...args) {
            if (times < n) {
                times += 1;
                result = func.apply(this, ...args);
            }
            return result;
        }
    }
    /**
     * bind的函数实现稍微复杂一点，需要满足两点要求，1是partials部分可以使用占位符，2是要考虑new的情况。
     * 
     * @param {any} func 
     * @param {any} thisArg 
     * @param {any} partials 
     * @returns 
     */
    function bind(func, thisArg, ...partials) {
        if (typeof func !== 'function') {
            throw new Error('first argument of bind must be a function');
        }else {
            let fBound = function (...args) {
                if (this instanceof fBound) {
                    func.call(this);
                }else {
                    args.some((arg, index) => {
                        let flag = partials.some((item, idx) => {
                            if(item === _) {
                                partials[idx] = arg;
                                return true;
                            }
                        });
                        if (flag === false) {
                            partials = partials.concat(args.slice(index));
                            return true;
                        }else {
                            return false;
                        }
                    });
                    return func.apply(thisArg, partials);
                }
            };
            let fNOP = function() {};
            fNOP.prototype = func.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        }
    }
/**
 * bindkey 需要注意一点得是，object[key]允许重新定义绑定函数即使它还不存在。所以每次调用返回的函数都需要去从object中去取
 * 这个key所对应的value。
 * @param {any} object 
 * @param {any} key 
 * @param {any} partials 
 * @returns 
 */
    function bindKey(object, key, ...partials) {
        return function (...args) {
            return bind(object[key], object, ...partials)(...args);
        }
    }
    /**
     * 处理占位符的函数，这里尤其需要注意的一点就是，改变partials本身，不返回新的数组。
     * 这里用的处理算法是在partials中依次寻找占位符，找到就将args的对应的参数替换掉它，要么一直找到args的结束，要么partials
     * 的占位符先找完，这时就将剩余的未替换占位符的args中的值依次推入partials中。
     * @param {array} partials 
     * @param {array} args 
     */
    function handlePlaceHolder(partials, args) {
        args.some((arg, index) => {
            let  flag = partials.some((item, idx) => {
                if(item === _) {
                    partials[idx] = arg;
                    return true;
                }
            });
            if (!flag) {
                partials.push(...args.slice(index));
                return true;
            }
        });
    }

    function handlePlaceHolderRight(partials, args) {
        clone(args).reverse().some((arg, index) => {
            let  flag = partials.some((item, idx) => {
                if(item === _) {
                    partials[idx] = arg;
                    return true;
                }
            });
            if (!flag) {
                partials.unshift(...args.slice(0, args.length - index));
                return true;
            }
        });
    }
    /**
     * 柯里化实现有两点需要注意，一是curry化后的每个函数都应该拥有‘属于’自己的闭包（用来记录传入的参数状况），二是函数在参数
     * 满足使函数调用的情况下，需要在调用后将记录参数状况的数据结构再次初始化，以便于下次调用，最后再返回调用结果。
     * @param {function} func 
     * @returns value
     */
    function curry(func) {
        return (function (func) {
            let arity = func.length,
                partials = [],
                inner = function(...args) {
                    handlePlaceHolder(partials, args);
                    if (partials.length >= arity && partials.slice(0, arity).every(item => item !== _)) {
                        let result = func(...partials);
                        partials = [];
                        return result;
                    }else {
                        return inner;
                    }
                }
            return inner;
        })(func);
    }

    function curryRight(func) {
        return (function (func) {
            let arity = func.length,
                partials = [],
                inner = function(...args) {
                    handlePlaceHolderRight(partials, args);
                    if (partials.length >= arity && partials.slice(0, arity).every(item => item !== _)) {
                        let result = func(...partials);
                        partials = [];
                        return result;
                    }else {
                        return inner;
                    }
                }
            return inner;
        })(func);
    }

    function partial(func, ...partials) {
        return function(...args) {
            handlePlaceHolder(partials, args)
            return func(...partials);
        }
    }

    function partialRight(func, ...partials) {
        return function(...args) {
            handlePlaceHolderRight(partials, args)
            return func(...partials);
        }
    }

    function throttle(func, wait = 0, options = {leading:false,trailing:true}) {
        return (function(func, wait, options) {
            let flag = true,
                result,
                parameters;
            const inner = function(...args) {
                parameters = args;
                let that = this;
                if (flag === true) {
                    if(options.leading === false && options.trailing === true) {
                            inner.id = setTimeout(function(){
                                result = func.call(that,...args);
                                flag = true;
                            }, wait);
                            flag = false;
                            return result;
                    }else if(options.leading === true && options.trailing === false) {
                        result = func.call(that,...args);
                        flag = false;
                        setTimeout(function () {
                            flag = true;
                        },wait);
                        return result;
                    }
                }else {
                    return result;
                }
            };
            inner.cancel = function() {
                clearTimeout(this.id);
            };
            inner.flush = function() {
                inner.cancel();
                result = func(...parameters);
                return result;
            }
            return inner;
        })(func, wait, options);
    }

    function defer(func, ...args) {
        return setTimeout(func, 0, ...args);
    }

    function delay(func, wait , ...args) {
        return setTimeout(func, wait, ...args);
    }

    function flip(func) {
        return function(...args) {
            return func.apply(this, args.reverse());
        }
    }

    function memoize(func, resolver) {
        memoize.Cache = Map;
        return (function(){
            let resType = getType(resolver),
                keys,
                inner = function(...args) {
                    keys = [];
                    for (let key of inner.cache.keys()) {
                        keys.push(key);
                    }
                    if(resType === 'function') {
                        if(keys.some(key => key === resolver(...args))) {
                            return inner.cache.get(resolver(...args));
                        }else {
                            inner.cache.set(resolver(...args), func.call(this, ...args));
                            return inner.cache.get(resolver(...args));
                        }
                    }else {
                        if(keys.some(key => key === identity(...args))) {
                            return inner.cache.get(identity(...args));
                        }else {
                            inner.cache.set(identity(...args), func.call(this, ...args));
                            return inner.cache.get(identity(...args));
                        }
                    }
                };
            inner.cache = new memoize.Cache();
            return inner;
        })(func, resolver);
    }
    
    function negate(predicate) {
        return function(...args) {
            return !predicate.apply(this, args);
        }
    }

    function once(func) {
        return (function(func){
            let times = 0,
                result,
                inner = function(...args) {
                    if(times < 1) {
                        tiems += 0;
                        result = func.apply(this, args);
                    }
                    return result;
                };
            return inner;
        })(func);
    }

    function isArray(value) {
        return getType(value) === 'array';
    }

    function overArgs(func, ...transforms) {
        return function(...args) {
            transforms = isArray(head(transforms)) ? head(transforms) : transforms;
            args = args.map((arg, index) => index in transforms ? transforms[index](arg) : arg);
            return func.apply(this, args);
        }
    }

    function rearg(func, ...indexes) {
        return function(...args) {
            indexes = isArray(head(indexes)) ? head(indexes) : indexes;
            let newArgs = [];
            indexes.forEach(item => newArgs.push(args[item]));
            return func(...newArgs);
        }
    }

    function rest(func, start = func.length - 1) {
        return function(...args) {
            let rest = args.splice(start);
            args.push(rest);
            return func.apply(this, args);
        }
    }
/**
 * 检查 value 是否是类数组。 如果一个值被认为是类数组，那么它不是一个函数，
 * 并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。
 * 
 * @param {any} value 
 */
    function isArrayLike(value) {
        let type = getType(value);
        if(type !== 'function' && isInteger(value.length)) {
            return true;
        }
        return false;
    }

    function isInteger(value) {
        return Number.isSafeInteger(value);
    }

    function size(collection) {
        if(isArrayLike(collection)) {
            return collection.length;
        }else if(getType(collection) === 'object') {
            return Object.keys(collection).length;
        }
    }
    function spread(func, start = 0) {
        return function(...args) {
            return func.apply(this, args.slice(start));
        }
    }

    function unary(func) {
        return function(arg) {
            return func.call(this, arg);
        }
    }

    function wrap(value, wrapper) {
        return function(...args) {
            return wrapper.call(this, value, ...args);
        }
    }

    //methods of Lang
    function isUndefined(value) {
        return value === undefined
    }
    function castArray(value) {
        if(arguments.length === 0) return []
        else {
            if(isArray(value)) return value
            return [value]
        }
    }
    /**
     * 数据中只存在数组，普通对象，和基本数据类型的情况下，代码如下
     * @param {*} value 
     */
    function cloneDeep(value) {
        let type = getType(value)
        if(type !== 'array' && type !== 'object') {
            return value
        } else if(type == 'array') {
            return Object.keys(value).map(key => cloneDeep(value[key]))
        } else {
            let obj = Object.create(value.prototype)
            Object.keys(value).forEach(key => {
                obj[key] = cloneDeep(value[key])
            })
            return obj
        }
    }
/**
 * 只考虐比较简单的情况
 * @param {*} value 
 * @param {*} customizer 
 */
    function cloneWith(value, customizer) {
        let type = getType(value),
            temp
        if(type !== 'array' && type !== 'object') {
            temp = customizer(value)
            return temp === undefined ? value : temp
        } else if(type == 'array') {
            return value.map(val => {
                temp = customizer(val)
                return temp === undefined ? val : temp
            })
        } else {
            let result = Object.create(value.prototype)
            Object.keys(value).forEach(key => {
                temp = customizer(value[key])
                result[key] = temp === undefined ? value[key] : temp
            })
            return result
        }
    }

    function cloneDeepWith(value, customizer) {
        let type = getType(value),
            temp
        if (type !== 'array' && type !== 'object') {
            temp = customizer(value)
            return temp === undefined ? value : temp
        } else if (type == 'array') {
            return Object.keys(value).map(key => cloneDeepWith(value[key]))
        } else {
            let obj = Object.create(value.prototype)
            Object.keys(value).forEach(key => {
                obj[key] = cloneDeepWith(value[key])
            })
            return obj
        }
    }
    function isElement(value) {
        return getType(value).indexOf('element') == -1 ? false : true
    }

    function conformsTo(object, source) {
        let func
        return Object.keys(source).every(key => {
            func = iteratee(source[key])
            if(func(object[key])) return true
            else return false
        })
    }

    function conforms(source) {
        return function(object) {
            let func 
            Object.keys(source).every(key => {
                func = iteratee(source[key])
                if(func(object[key])) return true
                else return false
            })
        }
    }

    function gt(value, other) {
        return value > other ? true : false
    }

    function gte(value, other) {
        return value >= other ? true : false
    }

    function isArguments(value) {
        return getType(value) === 'arguments' ? true : false
    }

    function isArrayBuffer(value) {
        return getType(value) === 'arraybuffer' ? true : false
    }

    function findKey(object, predicate) {
        let result
        const func = iteratee(predicate)
        keys(object).some(key => {
            if(func(object[key])) {
                result = key
            }
        })
        return result
    }

    function findLastKey(object, predicate) {
        let result
        const func = iteratee(predicate)
        keys(object).reverse().some(key => {
            if (func(object[key])) {
                result = key
            }
        })
        return result
    }

    function forIn(object, predicate) {
        const func = iteratee(predicate)
        keysIn(object).some(key => {
            if(func(object[key], key, object) === false) return true
        })
    }

    function forInRight(object, predicate) {
        const func = iteratee(predicate)
        keysIn(object).reverse().some(key => {
            if (func(object[key], key, object) === false) return true
        })
    }

    function forOwn(object, predicate) {
        const func = iteratee(predicate)
        keys(object).some(key => {
            if (func(object[key], key, object) === false) return true
        })
    }

    function forOwnRight(object, predicate) {
        const func = iteratee(predicate)
        keys(object).reverse().some(key => {
            if (func(object[key], key, object) === false) return true
        })
    }

    function functions(object) {
        return keys(object).filter(key => typeof object[key] === 'function')
    }

    function functionsIn(object) {
        return keysIn(object).filter(key => typeof object[key] === 'function')
    }

    function constant(value) {
        return function (){
            return value
        }
    }

    function get(object, path, defaultValue) {
        const type = getType(path)
        let props = type === 'array' ? path : toPath(path),
            result = object
        try {
            props.forEach(prop => {
                result = result[prop];
            });
            return result === undefined ? defaultValue : result
        } catch (e) {
            return defaultValue
        }
    }

    function has(object, path) {
        path = toPath(path)
        let prop = path.pop(),
            temp = property(path)(object)
        if(typeof temp === 'object' && temp !== null) {
            return keys(temp).indexOf(prop) > -1
        }
        return false
    }

    function hasIn(object, path) {
        path = toPath(path)
        let prop = path.pop(),
            temp = property(path)(object)
        if (typeof temp === 'object' && temp !== null) {
            return prop in temp
        }
        return false
    }

    function invert(object) {
        let result = {}
        keys(object).forEach(key => result[object[key]] = key)
        return result
    }

    function invertBy(object, func = function (key) {return key}) {
        let result = {},
            tempKey
        keys(object).forEach(key => {
            tempKey = func(object[key], key, object)
            if(result[tempKey] === undefined) {
                result[tempKey] = [key]
            } else {
                result[tempKey].push(key)
            }
        })
        return result
    }

    function invoke(object, path, ...args) {
        path = toPath(path)
        let funcProp = path.pop(),
            obj = property(path)(object)
        return obj[funcProp](...args)
    }

    function mapKeys(object, predicate) {
        let result = {},
            value,
            func = iteratee(predicate)
        keys(object).forEach(key => {
            value = object[key]
            result[func(value, key, object)] = value
        })
        return result
    }

    function mapValues(object, predicate) {
        let result = {},
            func = iteratee(predicate)
        keys(object).forEach(key => {
            result[key] = func(object[key], key, object)
        })
        return result
    }
    function isObject(value) {
        return getType(value) === 'object' ? true : false
    }
    function merge(object, ...sources) {
        sources.forEach(source => {
            keys(source).forEach(key => {
                if(!(key in object)) {
                    object[key] = source[key]
                } else {
                    if(isArray(source[key]) && isArray(object[key])) {
                        merge(object[key], source[key])
                    } else if (isObject(source[key]) && isObject(object[key])) {
                        merge(object[key], source[key])
                    } else {
                        object[key] = source[key] === undefined ? object[key] : source[key]
                    }
                }
            })
        })
        return object
    }

    function mergeWith(object, ...values) {
        let customizer = values.pop(),
            sources = values,
            value
        sources.forEach(source => {
            keys(source).forEach(key => {
                if (!(key in object)) {
                    value = customizer(object[key], source[key], key, object, source)
                    object[key] = value
                } else {
                    value = customizer(object[key], source[key], key, object, source)
                    object[key] = value === undefined ? object[key] : value
                }
            })
        })
        return object
    }

    function omit(object, ...props) {
        props = flattenDeep(props)
        let result = assign({}, object)
        props.forEach(prop => {
            delete result[prop]
        })
        return result
    }

    function isNumber(value) {
        return getType(value) === 'number' ? true : false
    }

    function omitBy(object, predicate) {
        const func = iteratee(predicate),
              result = assignIn({}, object)
        keysIn(object).forEach(key => {
            if(func(object[key], key)) delete result[key]
        })
        return result
    }

    function pick(object, ...props) {
        props = flattenDeep(props)
        let result = {}
        props.forEach(prop => result[prop] = object[prop])
        return result
    }

    function pickBy(object, predicate) {
        let result = {},
            func = iteratee(predicate)
        keys(object).forEach(key => {
            if (func(object[key], key)) result[key] = object[key]
        })
        return result
    }

    function get(object, path, defaultValue) {
        const type = getType(path)
        let props = type === 'array' ? path : toPath(path),
            result = object
        try {
            props.forEach(prop => {
                result = result[prop];
            });
            return result === undefined ? defaultValue : result
        } catch (e) {
            return defaultValue
        }
    }
    function isInteger(value) {
        return Number.isInteger(value)
    }
    function set(object, path, value) {
        let lastItem,
            refe = object,
            itemType
        path = toPath(path)
        path.slice(0, -1).forEach((item, index, path) => {
            itemType = isInteger(+path[index + 1]) ? 'array' : 'object'
            if (!(item in refe) || itemType !== getType(refe[item])) {
                refe[item] = itemType === 'array' ? [] : {}
            }
            refe = refe[item]
        })
        lastItem = path[path.length - 1]
        refe[lastItem] = value
        return object
    }

    // function 
