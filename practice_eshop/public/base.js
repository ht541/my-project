; (function () {
    'use scrict'

    var el_form_list = document.querySelector('#product_form');
    var el_cat_select = document.querySelector('#cat_select');
    var el_product_list = document.querySelector('#render_product_list');
    var cat_list = [];
    var product_list = [];

    init()
    function init() {
        get_cat_list();
        get_product_list();
        el_form_list.addEventListener('submit', function (e) {
            e.preventDefault();
            var row = get_from_data(el_form_list);
            update_or_add(row);
        })
    }


    function update_or_add(obj) {
        if (obj.id) {
            var promise = $.post('/api/gateway.php?model=product&action=update', obj)
        } else {
            var promise = $.post('/api/gateway.php?model=product&action=add', obj)
        }
        promise.then(function (res) {
            console.log(res)
            if (res.success) {
                get_product_list();
                render_product_list();
                clear_from(el_form_list);
            }
        });
    }

    function clear_from(el) {
        el.querySelectorAll('[name]').forEach(function (el) {
            el.value = ''
        });
    }

    function get_from_data(el) {
        var input_list = el.querySelectorAll("[name]");
        var row = {};
        for (var i = 0; i < input_list.length; i++) {
            var input = input_list[i];
            var key = input.name;
            var val = input.value;
            row[key] = val;
        }
        return row;
    }

    function get_cat_list() {
        $.get('/api/gateway.php?model=cat&action=read')
            .then(function (res) {
                cat_list = res.data;
                render_cat_list();
            })
    }


    function get_product_list() {
        $.get('/api/gateway.php?model=product&action=read')
            .then(function (res) {
                product_list = res
                render_product_list();
            })
    }

    function render_cat_list() {
        el_cat_select.innerHTML = '';
        for (var i = 0; i < cat_list.length; i++) {
            var cat = cat_list[i];
            var option = document.createElement('option');
            option.value = cat.id;
            option.innerText = cat.title;
            el_cat_select.appendChild(option);
        }
    }

    function render_product_list() {
        el_product_list.innerHTML = '';
        product_list.forEach(function (product) {
            var row = document.createElement('div');
            row.innerHTML = `
            <span>${product.title}</span>
            <span>${product.price}</span>
            <span>${product.stock}</span>
            <button id='remove'>删除</button>
            <button id='update'>更新</button>
            <hr>
            `;
            var remove_btn = row.querySelector('#remove');
            var update_btn = row.querySelector('#update');
            remove_btn.addEventListener('click', function () {
                remove_from(product.id)
            });

            update_btn.addEventListener('click', function () {
                set_from_data(el_form_list, product);
            });

            el_product_list.appendChild(row)
        })
    }


    function remove_from(id) {
        var ok = confirm('确定删除?');
        if (!ok)
            return
        $.post('/api/gateway.php?model=product&action=remove', { id: id })
            .then(function (res) {
                if (res.success) {
                    get_product_list();
                    render_product_list();
                }
            })
    }

    function set_from_data(el, data) {
        for (var key in data) {
            var input = el.querySelector(`[name=${key}]`);
            if (input) {
                input.value = data[key];
                render_product_list();
            }
        }
    }
})();