;(function () {
  'use strict';

  window.new_model = {
    add: add,
    del: del,
    read: read,
    is_new: is_new,
  }

  var new_list;

  init();

  function init() {
    new_list = s.get('new_list') || [];
  }

  function add(product_id) {
    if (is_new(product_id))
      return;

    new_list.push(product_id);
    sync();
  }

  function del(product_id) {
    var i = new_list.indexOf(product_id);
    if (i === -1)
      return;

    new_list.splice(i, 1);
    sync();
  }

  function is_new(product_id) {
    return new_list.indexOf(product_id) !== -1;
  }

  function read() {
    return new_list;
  }

  function sync() {
    s.set('new_list', new_list);
  }
})();
