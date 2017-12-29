var parse = function () {
    return function parseJSON(jsonStr) {
        i = 0;
        str = jsonStr;
        try {
            return parse()
        } finally {
            str = ''
        }
    }

    function parse() {
        if (str[i] === '{') {
            return parseObject()
        } else if (str[i] === '[') {
            return parseArray()
        } else if (str[i] === 'n') {
            return parseNull()
        } else if (str[i] === '"') {
            return parseString()
        } else if (str[i] === 't') {
            return parseTrue()
        } else if (str[i] === 'f') {
            return parseFalse()
        } else {
            return parseNumber()
        }
    }

    function parseString() {
        i++
        var parseStr = ''
        while (str[i] != '"') {
            parseStr += str[i++]
        }
        i++
        return parseStr;
    }

    function parseFalse() {
        var content = str.substr(i, 5);
        if (content === 'false') {
            i = i + 5
            return false;
        }
    }

    function parseTrue() {
        var content = str.substr(i, 4)
        if (content === 'true') {
            i += 4
            return true
        }
    }

    function parseNull() {
        var content = str.substr(i, 4)
        if (content === 'null') {
            i += 4
            return null
        }
    }

    function parseNumber() {
        var numStr = ''
        while (isNumber(str[i])) {
            numStr += str[i++]
        }
        return parseFloat(numStr)
    }

    function isNumber(n) {
        var gather = {
            '.': true,
            'e': true,
            'E': true,
            '-': true,
            '+': true
        }

        if (gather[n]) {
            return true
        }

        if (n >= '0' && n <= '9') {
            return true
        }
    }


    function parseArray() {
        i++;
        var result = []
        while (str[i] !== ']') {
            result.push(parse())
            if (str[i] === ',') {
                i++
            }
        }
        i++
        return result;
    }

    function parseObject() {
        i++
        var result = {}
        while (str[i] !== '}') {
            var key = parseString()
            i++
            var value = parse()
            result[key] = value
            if (str[i] === ',') {
                i++
            }
        }
        i++
        return result;
    }
}()
