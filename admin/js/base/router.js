; (function () {
    'use strict'

    var data_list = document.querySelectorAll('[data-link]');
    var page_list = document.querySelectorAll('[data-page]');
    init()
    function init() {
        data_list.forEach(function (link) {
            link.addEventListener('click', function () {
                page_list.forEach(function (page) {
                    page.hidden = true;
                    if (link.dataset.link === page.dataset.page) {
                        page.hidden = false;
                    }
                })
            })
        });
    }
})();