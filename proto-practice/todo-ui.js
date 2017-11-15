;(function () {
  'use strict';

  window.Todo = Todo;

  function Todo(title, completed, index) {
    this.api = new TodoApi;
    this.index = index;
    this.title = title;
    this.completed = completed;

    // this.tpl = `
    // <div>
    // ${title}
    // </div>`;
  }

  Todo.prototype.render = function (parent_el) {
    if (!parent_el)
      throw 'invalid:parent_el';

    this.el = document.createElement('div');
    this.el.innerHTML = `
    <b> ${this.title} </b>
    <span>${this.completed}</span>
    <button class="btn-remove">删除</button>
    `;
    var btn_remove = this.el.querySelector('.btn-remove');
    var me = this;
    btn_remove.addEventListener('click', function () {
      me.api.remove(this.index);
      me.el.remove();
    });
    parent_el.appendChild(this.el);
  }
})();

