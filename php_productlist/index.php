<?php 
    
class Product{

    public $product_list;
    public $file_path = './product.json';
    public $parmas;
    public function __construct(){
        $this->product_list = $this->read()?:[];
        $this->parmas = array_merge($_GET,$_POST);
        $action = $this->parmas['action'];
        $result = $this->$action();
        echo $this->json($result);
    }
    public function add(){
       $title = $this->parmas['title'];
       $price = $this->parmas['price'];
       $this->product_list[]=[
           'title'=>$title,
           'price'=>$price,
       ];
      $this->sync();
      return ['success'=>true];
    }

    public function remove(){
       $index = $thi->parmas['id'];
       unset($this->product_list[$index]);
       $this->sync();
       return ['success'=>true];
    }

    public function update(){
      $index = $this->parmas['id'];
      $this->product_list[$index] = array_merge($this->product_list[$index],[
          'title' => $this->parmas['title'],
          'price' => $this->parmas['price'],
      ]);
      $this->sync();
      return ['success'=>true];
    }
    public function read(){
       $json=(file_get_contents($this->file_path));
       return json_decode($json,true);
    }

    public function sync(){
       file_put_contents($this->file_path,json_encode($this->product_list));
    }

    public function json($data){
        header('Content-type:application/json');
        return json_encode($data);
    }
}

$product = new Product();

    ?>