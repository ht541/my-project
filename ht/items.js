; (function () {
    'use strict'
    var ine, ineid;
    init_data_1();

    function init_data_1() {
        ine = s.get('ine')
        ineid = s.get('ineid')
        if (!ine) {
            ine = []
            s.set('ine', ine)
        }
        if (!ineid) {
            ineid = 0
            s.set('ineid', ineid)
        }
    }
    function add(id, title,content, author) {
        var new_article_list = {
            id: ineid + 1,
            title: title,
            content:content,
            author: author,
        }
        ine.push(new_article_list)
        inc()
        sync()
    }

    function find_index(id) {
        return ine.findIndex(function (at) {
            if (at.id == id) {
                return true
            }
        });
    }

    function del(id) {
        var shit_index = find_index(id);
        if (shit_index === -1) return;
        ine.splice(shit_index, 1);
        sync()
    }

    function updata(id, title) {
        var task_index = find_index(id);
        if (task_index === -1) return;
        var task = ine[task_index];
        task.title = title;
        task.author = author;
        sync()
    }

    function seek(id) {
        var seek_index = find_index(id);
        if (seek_index === -1) return;
        return ine[seek_index];
        sybn()
    }
    function inc() {
        ineid = s.get('ineid')
        s.set('ineid', ineid + 1)
    }

    function sync() {
        s.set('ine', ine)
    }


})();