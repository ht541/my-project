; (function () {
  'use strict';

  var tbody = document.querySelector('#product_entry');
  var form = document.querySelector('#product_form');
  var product_list = product.read();
  var product_cat_list = document.querySelector('#select-product-cat');
  var cat_list = cat.read();

  init();

  function init() {
    render();
    render_cat();
    bind_submit();
  }

  function bind_submit() {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = get_form_data(form);
      data.cat_id = parseInt(data.cat_id);
      if (data.id) {
        data.id = parseInt(data.id)
        product.update(data.id, data)
      } else {
        product.add(data)
      }
      clear_form(form)
      render();
    });
  }

  function get_form_data(form) {
    var data = {};
    var input_list = form.querySelectorAll('[name]');
    input_list.forEach(function (input) {
      var key = input.name;
      var val = input.value;
      data[key] = val;
    });
    return data
  }


  function set_form_data(form, data) {
    var input_list = form.querySelectorAll('[name]');
    for (var key in data) {
      input_list.forEach(function (input) {
        if (input.name === key) {
          input.value = data[key];
        }
      });
    }
  }


  function clear_form(form) {
    var input_list = form.querySelectorAll("[name]");
    input_list.forEach(function (input) {
      input.value = '';
    }); 
  }

  function render_cat() {
    product_cat_list.innerHTML = '';
    cat_list.forEach(function (cat) {
      var option = document.createElement('option');
      option.value = cat.id;
      option.innerText = cat.title;
      product_cat_list.appendChild(option);
    });
  }

  function render() {
    tbody.innerHTML = '';
    var list = product.read();
    list.forEach(function (row) {
      var tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${row.title}</td>
      <td>${row.price}</td>
      <td>${cat.get_title(row.cat_id) || '-'}</td>
      <td>
       <label>
       <input type="checkbox" class="hot_check">热卖
       </label>
       <label>
       <input type="checkbox" class="new_check">新品
       </label>
       <button data-id="${row.id}" class="btn_del">删除</button>
       <button data-id="${row.id}" class="btn_update">更新</button>
       </td>`

      var btn_del = tr.querySelector('.btn_del');
      var btn_update = tr.querySelector('.btn_update');
      var hot_check = tr.querySelector('.hot_check');
      var new_check = tr.querySelector('.new_check');
      hot_check.checked = hot.is_hot(row.id);
      new_check.checked = new_model.is_new(row.id);

      btn_del.addEventListener('click', function () {
        product.del(row.id)
        render();
      })

      btn_update.addEventListener('click', function () {
        set_form_data(form, row)
      })

      hot_check.addEventListener('change', function () {
        if (hot_check.checked) {
          hot.add(row.id);
        } else {
          hot.del(row.id);
        }
      });

      new_check.addEventListener('change', function () {
        if (new_check.checked) {
          new_model.add(row.id);
        } else {
          new_model.del(row.id);
        }
      });
      tbody.appendChild(tr)
    })
  }
})();
