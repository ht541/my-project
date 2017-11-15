<?php

class Product {
    public $list_src = 'E:\githt\my-project\php_practice_demo\data\product.json';
    public $last_id_src = 'E:\githt\my-project\php_practice_demo\data\last_id.json';
    public $list;
    public $last_id;


    public function __construct(){
        $this->read();
        $action = @$_POST['action'];
        if($action){
            $this->$action();
        }
    }


    public function add(){
        $title = $_POST['title'];
        $price = $_POST['price'];
        $cover = $_FILES['cover']['tmp_name'];
        if(!$title && !$price && !$cover)
        return ['usccess'=>false,'img'=>'invalid'];
        $cover_name = time().rand(100,999).'.jpg';
        move_uploaded_file($cover,'./imgs/'.$cover_name);
        $this->list[]=[
            'id'=>$this->inc(),
            'title'=>$title,
            'price'=>$price,
            'cover_name'=>$cover_name,
        ];
        $this->sync();
        return ['success'=>true];
    }
    
      public function read(){
      $json=(file_get_contents($this->list_src));
      $this->list=json_decode($json,true);
      $this->last_id = json_decode(file_get_contents($this->last_id_src));
          return $this->list;
      }

    public function sync(){
        $json = json_encode($this->list);
        file_put_contents($this->list_src,$json);
    }

    public function inc(){
        $this->last_id++;
        file_put_contents($this->last_id_src,json_encode($this->last_id));
        return $this->last_id;
    }

    public function remove(){

    }

    
}

$product = new Product();
