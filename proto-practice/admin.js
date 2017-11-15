;(function () {
  'use strict';

  window.api = new TodoApi();
  var el_todo_list = document.getElementById('todo-list');

  api.each(function (todo, i) {
    var t = new Todo(todo.title, todo.completed, i);
    t.render(el_todo_list);
  });

})();

