<?php
require_once './product_list.php';
$list = $product->read();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    img {
      width:200px;;
    }
  </style>
</head>
<body>
  <form action="product_list.php" method="post"  enctype="multipart/form-data">
     <input type="hidden" name='action' value='add'>
    <input type="text" name='title' placeholder='名称'><br>
    <input type="text" name='price' placeholder='价格'><br>
    <input type="file" name='cover' placeholder='头像'><br>
    <button type='submit'>提交</button>
  </form>
  <div calss="product_list">
    <?php foreach($list as $product):?>
    <div calss='product-item'>
      <div class="cover"><img src="./imgs/<?php echo $product['cover_name']?>" alt=""></div>
      <div class="title"><?php echo $product['title']?></div>
      <div class="price"><?php echo $product['price']?></div>
          <a href="./product_list.php?action=remove&id=<?php echo @$product['id'] ?>">删除</a>
    </div>
  <?php endforeach;?>
  </div>
</body>
</html>