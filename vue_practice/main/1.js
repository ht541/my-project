; (function () {
    'use strict'
    new Vue({
        el: '#app',
        data: {
            current: {
                title: '',
                completed: false,
            },
            list: []
        },
        methods: {
            merge: function () {
                updata = this.current.id;
                if (updata) {
                    var index = this.list.findIndex(function (item) {
                        return item.id === updata;
                    });
                    Vue.set(this.list, index, Object.assign({}, this.current))
                } else {
                    var title = this.current.title;
                    if (!title && title !== 0)
                        return;
                    this.current.id == this.notx_id();
                    this.list.push(Object({}, this.current));
                }
            },
            
            notx_id: function (id) {
                return this.list.length + 1;
            },
            del:function(id){
                var i = this.list.findIndex(function(index){
                    return id === index.id;
                })
                this.list.splice(i,1)
            }
        }
    });
})();