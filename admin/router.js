; (function () {
    'use strict'

    var data_list = document.querySelectorAll('[data-link]');
    var page_list = document.querySelectorAll('[data-page]');
    init()
     function init(){
         render_page('admin')
         data_list.forEach(function(link){
             link.addEventListener('click',function(){
                   render_page(link.dataset.link)
             })
         })
     }
       function render_page(page_name){
           page_list.forEach(function(page){
               page.hidden = true;
               if(page.dataset.page === page_name){
                   page.hidden = false;
               }
           })
       }
})();