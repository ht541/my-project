; (function () {
    'use strict'
    window.s = {
        get: function (key) {
            var cot = localStorage.getItem(key)
            return JSON.parse(cot);
        },
        set: function (key, val) {
            val = JSON.stringify(val)
            return localStorage.setItem(key, val)
        }
    }
})();