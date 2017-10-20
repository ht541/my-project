; (function () {
    'use strict'
    var article_list, last_id;
    init_data();

    window.b = {
        article_list: article_list,
        last_id: last_id,
        add: add,
        del: del,
        update: update,
        seek: seek,
    }

    function init_data() {
        article_list = s.get('article_list') || [];
        last_id = s.get('last_id') || 0;
    }
  
    function add(article) {
        if (!article || !article.title) {
            alert('请输入内容')
            return;
        }
        last_id++;
        article.id = last_id;
        article_list.push(article);
        s.set('last_id', last_id);
        sync()
    }
    function find_index(id) {
        return article_list.findIndex(function (article) {
            return article.id === id;
        });
    }

    function del(id) {
        if(true){
            alert('确定删除文章?')
        }
        var shit_index = find_index(id);
        if (shit_index == -1) return;
        article_list.splice(shit_index, 1)
        sync();
    }

    function update(id, patch) {
        var index = find_index(id);
        var article = article_list[index];
        article_list[index] = Object.assign({}, article, patch);
        sync();
    }
    function find(id) {
        return article_list.find(function (article) {
            return article.id == id
        });
    }

    function seek(id) {
        if (id)
            return find(id);
        return article_list;
    }

    function sync() {
        s.set('article_list', article_list);
    }



})();