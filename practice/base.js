; (function () {
    'use strict'
    var result = [];
    var list_form = $('#list_form');
    var btn = list_form.find("#btn").val();
    var el_list = $('.el_list');
    init();
    function init() {
        list_form.on('submit', function (e) {
            e.preventDefault();
            $.get('http://api.github.com/search/users?q='+'btn')
                .then(function (data) {
                    result = data.items;
                    render();
                })
        });
    }
    function render(){
        el_list.html('');
        result.forEach(function(user){
            var el_user = $('<div></div>')
            el_user.html(`         
        <div class="row result">
          <div class="col sm">
                <img src="${user.avatar_url}">
            </div>
          <div class="col lg">
                <p>${user.login}</p>
            </div>
        </div>`);
            el_list.append(el_user);
        })
    }
})();