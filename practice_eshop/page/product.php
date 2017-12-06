<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="">
</head>
<body>
    <h1>商品管理</h1>
    <form id="product_form">
      <label>
      id：
      <input type="hidden" name="id">
      </label></br>
      <label>
      title：
      <input type="text" name="title">
      </label></br>
      <label>
      price：
      <input type="text" name="price">
      </label></br>
      <label>
      stokc：
      <input type="text" name="stock">
      </label></br>
      <label>
      cat_id：
      <select name='cat_id' id="cat_select"></select>
      </label></br>
      <button type="submit">提交</button>
    </form>
    <div id="render_product_list"></div>
    <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
    <script src="../public/base.js"></script>
</body>
</html>