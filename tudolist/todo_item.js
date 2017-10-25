; (function () {
    'use strict'
    var todo_list, last_id;
    window.h = {
        todo_list: todo_list,
        last_id: last_id,
        add: add,
        del: del,
        seek: seek
    };

    init();
    function init() {
        todo_list = s.get('todo_list') || [];
        last_id = s.get('last_id') || 0;
    }

    function add(todo) {
        if (!todo.title){
            alert('无内容')
        }
        last_id++;
        todo.id = last_id;
        todo_list.push(todo);
        s.set('last_id', last_id);
        s.set('todo_list', todo_list);
    }

    function find_index(id) {
        return todo_list.findIndex(function (todo) {
            return todo.id === id;
        });
    }

    function del(id) {
        if (confirm('确定删除?') == true) {
        } else {
            return false;
        }
        var del_index = find_index(id);
        if (del_index === -1) return;
        todo_list.splice(del_index, 1)
        s.set('todo_list', todo_list);
    }

    function find(id) {
        return todo_list.find(function (todo) {
            return todo.id === id;
        });
    }

    function seek() {
        return todo_list;
    }

})()