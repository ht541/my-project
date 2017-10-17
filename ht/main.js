; (function () {
    'use strict'
    var task_list, last_id;
    init_data();
    function init_data() {
        task_list = s.get('task_list');
        last_id = s.get('last_id');
        if (!task_list) {
            task_list = []
            s.set('task_list', task_list)
        }
        if (!last_id) {
            last_id = 0
            s.set('last_id', last_id)
        }
    }

    function add(title, completed) {
        completed = completed ? completed : false;
        var new_task = {
            id: s.get('last_id') + 1,
            title: title,
            completed: completed
        }
        task_list.push(new_task)
        inc()
        sync()
    }
    function find_index(id) {
        return task_list.findIndex(function (item) {
            if (item.id == id) {
                return true
            }
        })
    }

    function del(id) {
        var shit_index = find_index(id)
        if (shit_index === -1)
            return;
        task_list.splice(shit_index, 1)
        sync()
    }

    function updata(id, title) {
        var task_index = find_index(id)
        if (task_index === -1) return
        var task = task_list[task_index]
        task.title = title
        sync()
    }
    function comment(content){
                                                                               
    }

    function inc() {
        s.set('last_id', last_id + 1)
    }

    function sync() {
        s.set('task_list', task_list)
    }
})();