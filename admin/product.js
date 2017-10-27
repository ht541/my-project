; (function () {
    'use strict'
    var product_list, product_last_id, error_index = 'idnex不存在，请检查';
    window.product={
        add:add,
        del:del,
        update:update,
        seek:seek
    }

    init();

    function init() {
        product_list = s.get('product_list') || [];
        product_last_id = s.get("product_last_id") || 0;
    }

    function add(product) {
        if (!product.title || !product.price)
            throw 'required title and price'
        product.id = inc();
        product_list.push(product);
        sync();
    }

    function find_index(id) {
        return product_list.findIndex(function (product) {
            return product.id === parseInt(id)
        })
    }
    function del(id) {
        var shit_index = find_index(id);
        if (shit_index === -1)
            throw error_index;
        product_list.splice(shit_index, 1)
        sync();
    }

    function update(id, new_product) {
        var index = find_index(id);
        if (index === -1)
            throw error_index;
        product_listp[index] = Object.assign({}, product_list[index], new_product);
        sync()
    }

    function seek(id) {
        if (id) {
            var index = find_index(id);
            if (id === -1)
                throw error_index;
            return product_list[index]
        }
        return product_list;
    }

    function sync() {
        s.set('product_list', product_list)
    }

    function inc() {
        product_last_id++
        s.set('product_last_id', product_last_id);
        return product_last_id;
    }
})();
