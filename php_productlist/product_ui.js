; (function () {
    'use strict'
    var form_el = document.querySelector('#form_el')
    var box = document.querySelector('#box')
    var product_title = form_el.querySelector('[name]')
    var product_price = form_el.querySelector('[price]')
    var product_list;

    function init() {
        form_el.addEventListener('submit', function (e) {
            e.preventDefault();
            var product = {};
            product.title = product_title.value;
            product.title = parseFloat(product_price.value);
            if (!product.title || !product.price)
                return;
            $.post('./product.json', product)
                .done(function () {
                    $.get(function (r) {
                        product_list = r;
                        render();
                    })
                });
        });
    }


    function render() {
        box.innerHTML = '';
        product_list.forEach(function (product) {
            var box = document.createElement('div');
            box.innerHTML = `
            <span>${product.title}</span>
            <span>${product.price}</span>`
        });
        box.appendChild(box);
    }
})();