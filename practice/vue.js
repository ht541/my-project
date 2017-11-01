; (function () {
    'use strict'
    new Vue({
        el: '#root',
        data: {
            new_user: {},
            user_list: [],
        },
        methods: {
            add_user: function () {
                if (!this.new_user.username || !this.new_user.age)
                    return;
                this.user_list.push(Object.assign({}, this.new_user));
                this.new_user = {};
            },
            del: function (index) {
                this.user_list.splice(index, 1)
            },
            updata: function (index) {
                this.new_user = this.user_list[index]
            }
        }

    });
})();