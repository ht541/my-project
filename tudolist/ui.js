; (function () {
    'use strict'
    var el_todo_form = document.querySelector('#todo_form');
    var el_todo_list = document.querySelector('#todo_list');

    init();
    function init() {
        render();
        bind_submit();
    }

    function bind_submit() {
        el_todo_form.addEventListener('submit', function (e) {
            e.preventDefault();
            var new_todo = {};
            var input = document.getElementById('btn').value;
            new_todo.title = input;
            h.add(new_todo);
            render();
        });
    }


    function render() {
        el_todo_list.innerHTML = '';
        var list = h.seek();
        list.forEach(function (todo) {
            var el_todo = document.createElement("div")
            el_todo.innerHTML = `
         <div id="formcol">
            <div class="wrapper">
                <div class="row">
                    <div class="col le col-1">
                        <button data-id="${todo.id}" id="btn_del-${todo.id}" type="checkbox" class="fa fa-times" style='background:#fff;'></button>
                    </div>
                    <div class="col rt col-10" style="text-align:left;">
                        ${todo.title}
                    </div>
                    <div class="col ct col-1"><button class="fa fa-star-o"></button></div>
                </div>
            </div>
         </div>
            `
            var formcol = el_todo.querySelector("#formcol");
            formcol.classList.add('formcol')
            var btn_delete = el_todo.querySelector('#btn_del-' + todo.id)
            btn_delete.addEventListener('click', function () {
                var id = parseInt(btn_delete.dataset.id);
                h.del(id);
                render();
            })
            el_todo_list.appendChild(el_todo);
        })
    }



})();