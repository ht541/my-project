; (function () {
    'use strict'
    window.s = {
        get: function (key) {
            var json = localStorage.getItem(key);
            return JSON.parse(json);
        },
        set: function (key, val) {
            var val = JSON.stringify(val);
            return localStorage.setItem(key, val)
        }
    }
})();