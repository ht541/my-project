;(function () {
  'use strict';

  window.TodoApi = TodoApi;

  function TodoApi(todo_list) {
    this.list = todo_list || s.get('todo_list') || [];

    this.add = function (todo) {
      this.list.push(todo);
      this.sync();
    }

    this.remove = function (index) {
      this.list.splice(index, 1);
      this.sync();
    }

    this.sync = function () {
      s.set('todo_list', this.list);
    }
    // this.update = function () {
    //
    // }
    this.read = function () {
      return this.list;
    }

    this.each = function (callback) {
      if (callback.constructor !== Function)
        return;

      for (var i = 0; i < this.list.length; i++) {
        var todo = this.list[i];
        callback(todo, i);
      }
    }
  }
})();

