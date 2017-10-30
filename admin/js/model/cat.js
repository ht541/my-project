; (function () {
    'use strict'
    var cat_list, last_cat_id;
    window.cat = {
        add: add,
        del: del,
        exist: exist,
        updata: updata,
        read: read,
        get_title: get_title
    }
    function init() {
        cat_list = s.set('cat_list') || [];
        last_cat_id = s.set('last_cat_id') || 0;
    }

    function exist(id) {
        return !!seek(id);
    }


    function get_title(id) {
        var cat = seek(id);
        if (!cat) {
            return cat = '';
        }
        return cat.title;
    }

    function add(cat) {
        if (!cat || !cat.title || !cat.product_id)
            throw 'invalid id';
        cat.product_id = parseInt(product_id)
        if (cat.product_id !== 0 && !exist(cat.product_id))
            throw 'invalid parent_id';
        cat.id = inc();
        cat_list.push(cat)
        sync();
    }

    function inc() {
        last_cat_id++;
        s.set('last_cat_id', last_cat_id)
        return last_cat_id;
    }


    function del(id) {
        var i = find_index(id);
        if (i === -1)
            throw 'invalid id'
        cat_list.splice(i, 1)
        sync()
    }

    function updata(id, new_cat) {
        var i = find_index(id);
        if (i === -1)
            throw 'invalid id'
        if (new_cat.parent_id !== 0 && !exist(new_cat.parent_id))
            throw 'invalid parent_id'
        cat_list[i] = Object.assign({}, cat_list[i], new_cat)
        sync();
    }

    function read(id) {
        if (id) {
            var i = find_index(id);
            return cat_list[i];
        }
        return cat_list;
    }

    function find_index(id) {
        return cat_list.findIndex(function (cat) {
            return cat.id === id
        })
    }

    function sync() {
        s.set('cat_list', cat_list);
    }
})();