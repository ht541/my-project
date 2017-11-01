; (function () {
    'use strict'
    window.s = {}
    s.get = function (key) {
        var json = localStorage.getItem(key)
        return JSON.parse(json)
    },
        s.set = function (key, val) {
            return localStorage.setItem(key, JSON.stringify(val))
        }
})();