<?php

class  Product {
    public $db;
    public function __construct($db){
        $this->db = $db;
    }

  public function add($row){
     $title = $row['title'];
     $price = $row['price'];
     $cat_id = $row['cat_id'];
     $stock = $row['stock'];
     if(!$title || !$price || !$cat_id || !$stock)
     return ['success'=>false,'msg'=>'invalid:$title || $price || $stock || cat_id'];
     if(!is_numeric($price) || !is_numeric($cat_id) || !is_numeric($stock))
     return ['success'=>false,'msg'=>'invalid:$title||$price||cat_id||stock'];
     $sql = $this->db->prepare("insert into product(title,price,cat_id,stock) value('{$title}','{$price}','{$cat_id}','{$stock}')")->execute();
     return $sql ? ['success'=>true]:['success'=>false,'msg'=>'error'];
  }

  public function remove($row){
     $id = $row['id'];
     if(!is_numeric($id))
     $this->verdict();
     $sql = $this->db->prepare('delete from product where id=:id');
     $sql->execute(['id'=>$id]);
     return ['success'=>true];
  }

  public function update($row){
     $id =$row['id'];
     if(!is_numeric($id))
      $this->verdict();
     $statement = $this->db->prepare('select * from product where id=:id');
     $statement->execute(['id'=>$id]);
     $old = $statement->fetch(PDO::FETCH_ASSOC);
     if(!$old){
         $this->verdict();
     }
     $merged = array_merge($old,$row);
    $r=$this->db->prepare('update product set title=:title,price=:price,cat_id=:cat_id,stock=:stock where id=:id')
    ->execute($merged);
    return $r ? ['success'=>true] :['success'=>false,'msg'=>'update_error'];
  }

  public function read(){
      $page =(int) @$_GET['page'] ? :1;
      $limit = 20;
      $offset = $limit * ($page-1);
     $all = $this->db->prepare('select * from product limit :offset,:limit');
     $all->execute([
         'offset'=>$offset, 
         'limit'=>$limit,
     ]);
     return $all->fetchall(PDO::FETCH_ASSOC);
  }
  
  public function verdict(){
    return ['success'=>false,'msg'=>'invalid:id'];
  }
}
