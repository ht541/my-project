; (function () {
    'use strict'
    window.Event = new Vue();


    Vue.component('page-product', {
        template: '#tpl-page-product',
        mounted: function () {
            var me = this;
            Event.$on('product_add_or_update.success', function () {
                me.form_product = {};
            });
        },
        props: ['list', 'listkd'],
        methods: {
            trigger: function (name, data) {
                Event.$emit(name, data);
            },
            product_del: function (id) {
                if (!confirm('确定删除'))
                    return;
                Event.$emit('product_del', id)
            },
            fill_form: function (product) {
                this.form_product = Object.assign({}, product);
            },

        },
        data: function () {
            return {
                form_product: {},
            }
        }
    });
    // 分类组件
    Vue.component('page-cat', {
        template: '#tpl-page-cat',
        mounted: function () {
            var me = this;
            Event.$on('cat_add_or_update.success', function () {
                me.form_cat = {
                    parent_id: 0,
                };
            });
        },
        props: ['list'],
        methods: {
            trigger: function (name, data) {
                Event.$emit(name, data);
            },
            cat_del: function (id) {
                if (!confirm('确定删除'))
                    return;
                Event.$emit('cat_del', id)
            },
            fill_form: function (cat) {
                this.form_cat = Object.assign({}, cat);
            },

        },
        data: function () {
            return {
                form_cat: {
                    parent_id: 0,
                }
            }
        }
    });
    // 数据中心
    new Vue({
        el: '#app',
        mounted: function () {
            this.init();
            this.cat_init();
            this.product_bind_evet();
            this.cat_bind_evet();

        },
        data: {
            product_list: [],
            last_product_id: 0,
            cat_list: [],
            last_cat_id: 0
        },
        methods: {
            init: function () {
                this.product_list = s.get('product_list') || [];
                this.last_product_id = s.get('last_product_id') || 0;
            },
            product_add_or_update: function (product) {
                if (product.id) {
                    var i = this.find_index(product.id);
                    this.product_list[i] = Object.assign({}, this.product_list[i], product)
                } else {
                    if (!product || !product.title || !product.price)
                        throw 'error'
                    product.id = this.inc();
                    this.product_list.push(product)
                }
                this.sync()
                Event.$emit('product_add_or_update.success', product)
            },

            product_del: function (id) {
                var i = this.find_index(id);
                this.product_list.splice(i, 1);
                this.sync();
            },
            find_index: function (id) {
                return this.product_list.findIndex(function (product) {
                    return product.id == id;
                })
            },

            inc: function () {
                s.set('last_product_id', ++this.last_product_id);
                return this.last_product_id;
            },
            sync: function () {
                s.set('product_list', this.product_list);
            },
            product_bind_evet: function () {
                var me = this;
                Event.$on('product_add_or_update', function (data) {
                    me.product_add_or_update(data);
                });
                Event.$on('product_del', function (data) {
                    me.product_del(data);
                });
            },
            /*----cat_product------*/
            cat_init: function () {
                this.cat_list = s.get('cat_list') || [];
                this.last_cat_id = s.get('last_cat_id') || 0;
            },
            cat_add_or_update: function (cat) {
                if (!cat || !cat.title)
                    throw 'invalid cat';
                if (!cat.parent_id)
                    cat.parent_id = 0;
                if (cat.id) {
                    var i = this.cat_find_index(cat.id);
                    if (i === -1) {
                        throw 'invalid cat.id'
                    }
                    this.cat_list[i] = Object.assign({}, this.cat_list[i], cat)
                } else {
                    cat.id = this.cat_inc();
                    this.cat_list.push(cat)
                }
                this.cat_sync()
                Event.$emit('cat_add_or_update.success', cat)
            },

            cat_del: function (id) {
                var i = this.cat_find_index(id);
                this.cat_list.splice(i, 1);
                this.cat_sync();
            },
            cat_find_index: function (id) {
                return this.cat_list.findIndex(function (cat) {
                    return cat.id == id;
                });
            },

            cat_inc: function () {
                s.set('last_cat_id', ++this.last_cat_id);
                return this.last_cat_id;
            },
            cat_sync: function () {
                s.set('cat_list', this.cat_list);
            },
            cat_bind_evet: function () {
                var me = this;
                Event.$on('cat_add_or_update', function (data) {
                    me.cat_add_or_update(data);
                });
                Event.$on('cat_del', function (data) {
                    me.cat_del(data)
                });
            }
        }
    });
})();