; (function () {
    'use strict'
    var hot_list;

    window.hot = {
        add: add,
        del: del,
        read:read,
        is_hot: is_hot,

    }
    init()
    function init() {
        hot_list = s.get('hot_list') || [];
    }

    function add(product_id) {
        if (!product.exist(product_id))
            throw 'invalid id';
        if (is_hot(product_id))
            return;
        hot_list.push(product_id);
        sync()
    }

    function del(product_id) {
        var index = hot_list.indexOf(product_id)
        if (index === -1)
            return;
        hot_list.splice(index, 1)
        sync()
    }

    function is_hot(product_id) {
        return hot_list.indexOf(product_id !== -1)
    }

    function read() {
        return hot_list;
    }

    function sync() {
        s.set('hot_list', hot_list)
    }
})();