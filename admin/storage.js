; (function () {
    'use strict'

    window.s = {}
    s.get = function (key) {
        var json = localStorage.getItem(key);
        return JSON.parse(json);
    },
        s.set = function (key, val) {
            var json = JSON.stringify(val);
            return localStorage.setItem(key, json);
        }
})();