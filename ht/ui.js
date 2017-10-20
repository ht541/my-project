; (function () {
    'use strict'
    var el_article_list = document.querySelector('#article_lists');
    var el_article_form = document.querySelector('#article_form');
    init();

    function init() {
        render();
        bind_submit();
    }


    function bind_submit() {
        el_article_form.addEventListener('submit', function (e) {
            e.preventDefault();
            var new_article = {};
            var input_list = el_article_form.querySelectorAll('[name]');
            for (var i = 0; i < input_list.length; i++) {
                var input = input_list[i];
                var key = input.name;
                var val = input.value;
                new_article[key] = val;
            }
            b.add(new_article);
            el_article_form.reset();
            render();
        });
    }


    function render() {
        el_article_list.innerHTML = '';
        var list = b.seek();
        list.forEach(function (article) {
            var el_article = document.createElement('div');
            el_article.innerHTML = `
             标题:${article.title} ID:${article.id}
             作者:${article.author}
                  ${article.content}  
            <div>
            <button data-id="${article.id}" id="btn-delete-${article.id}">删除</button>
            <button data-id="${article.id}" id="btn-update-${article}">更新</button>
            </div>
            </br>`;
            var btn_del = el_article.querySelector('#btn-delete-' + article.id);
            var btn_update = el_article.querySelector('#btn-update-');
            btn_del.addEventListener('click', function () {
                var id = parseInt(btn_del.dataset.id)
                b.del(id);
                render();
            });
            el_article_list.appendChild(el_article);
        });
    }
})();