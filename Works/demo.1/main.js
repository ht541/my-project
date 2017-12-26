; (function () {
    'use strict'
    var result = user_list;
    function search(keyworld) {
        result = [];
        for (var i = 0; i < user_list.length; i++) {
            var user = user_list[i];
            if (user.name.indexOf(keyworld) != -1) {
                result.push(user);
            }
        }
    }


    function render() {
        var content = document.querySelector('#content');
        content.innerHTML = '';
        for (var i = 0; i < result.length; i++) {
            var user = result[i];
            var add = document.createElement('div');
            add.innerHTML = '姓名:' + user.name +
                '年龄:' + user.age;
            content.appendChild(add);
        }
    }

    function boot() {
        var form = document.querySelector('#search_form');
        var input = document.querySelector('#search_input');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var keyworld = input.value;
            if (!keyworld) {
                alert('请输入')
                return;
            }
            search(keyworld);
            render()
        })
    }
    boot()
})();
