; (function () {
    'use strict'
    var tbody = document.querySelector("#cat_entry")
    var form = document.querySelector("#cat_form")
    var cat_list = cat.read();

    function init() {

    }

    function cat_form_submit() {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var new_cat = {};
            var input_list = form.querySelectorAll('[name]');
            input_list.forEach(function (input) {
                var key = input.name;
                var val = input.value;
                new_cat[key] = val;
            });
            cat.add(new_cat)
            clear()
        });
    }

    function clear(form) {
        var form_list = form.querySelectorAll('[name]');
        form_list.forEach(function (input) {
            input.value = '';
        })
    }

    function cat_set_form(form, data) {
        var input_list = form.querySelectorAll('[name]');
        for (var key in data) {
            input_list.forEach(function (input) {
                if (input.name === key)
                    input.value = data[key]
            });
        }
    }
})();