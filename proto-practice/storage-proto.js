; (function () {
    'use strict'
    window.s = {
        get: function (key) {
            return JSON.parse(localStorage.getItem(key))
        },
        set: function (key, val) {
            return localStorage.setItem(key, JSON.stringift(val))
        }
    }
})();