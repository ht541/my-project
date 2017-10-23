; (function () {
    'use strict'
    var el_article_list = document.querySelector('#article_lists');
    var el_article_form = document.querySelector('#article_form');
    var btn_del, btn_update;

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
            <textarea id="text_content" cols="110" rows="20" style="background:rgb(249, 240, 240);border-radius:7px;">
             标题:${article.title}&nbsp${article.id}    作者:${article.author}    发布时间:${article.mydate}

             内容:${article.content}
             </textarea></br>
             <button data-id="${article.id}" id="btn-delete-${article.id}" class="fa fa-times" style="background:#fff;color:#000000;padding:5px"></button>
             <button id="btn-update-${article.id}" class="fa fa-refresh" style="background:#fff;color:#000000;padding:5px;"></button>
             `;
            btn_del = el_article.querySelector('#btn-delete-' + article.id);
            btn_update = el_article.querySelector('#btn-update-' + article.id);
            btn_del.addEventListener('click', function () {
                var id = parseInt(btn_del.dataset.id)
                b.del(id);
                render();
            });
            el_article_list.appendChild(el_article);
        });
    }
})();