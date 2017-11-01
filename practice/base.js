; (function () {
    'use strict'
    var result = [];
    var list_form = $('#list_form');
    var btn = list_form.find("#btn");
    var el_list = $('.el_list');
    var loading = $('#loading');
    var empty = $('#empty')
    init();
    function init() {
        list_form.on('submit', function (e) {
            loading.show();
            e.preventDefault();
            $.get('http://api.github.com/search/users?q=' + btn.val())
                .then(function (data) {
                    result = data.items;
                    if (data.items.length === 0)
                        empty.show();
                    else
                        empty.hide()
                    render();
                })
                .fail(function () {
                    alert('接口出错了')
                })
                .always(function () {
                    loading.hide();
                })
        });
    }
    function render() {
        el_list.html('');
        result.forEach(function (user) {
            var el_user = $('<div></div>')
            el_user.html(`         
        <div class="row result">
          <div class="col sm">
                <img src="${user.avatar_url}">
          </div>
          <div class="col lg">
                <p>${user.received_events_url}</p>
          </div>
        </div>`);
            el_list.append(el_user);
        })
    }
})();