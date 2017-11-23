<?php

class cat{
      public  $db;

      public function __construct($db){
          $this->db=$db;
      }

      public function add($row){
           $title=$row['title'];
           if(!$title)
           return['success'=>false,'mag'=>'invalid:title'];
           if($this->title_exist($title))
           return['success'=>false,'msg'=>'invalid:title'];
           $h = $this->db->prepare('insert into cat(title) value(:title)');
           $r=$h->execute(['title'=>$titlel,]);
           return $r ? ['success'=>true]:['success'=>false,'title_error'];
      }

      public function remove($row){
           $id=$row['id'];
           if(!$id||!$this->find($id))
           return['success'=>false,'msg'=>'invalid'];
           $h=$this->db->prepare('delete from cat where id=:id');
           $r=$h->execute([
                 'id'=>$id
           ]);
           return $r ? ['success'=>true]:['success'=>false,'invalid:error'];
      }

      public function update($row){
           $id =$row['id'];
           $old = $this->find($id);
           $title=$row['title'];
           if(!$id || !$old)
           return ['success'=>true,'msg'=>'invalid:id'];
           if(!$this->title_exist($title))
           return['success'=>false,'mas'=>'invalid:title'];
           $new_row = array_merge($old,[
                 'title'=>$title
           ]);
           $h = $this->db->prepare('update cat set title=:title where id=:id');
           $r = $h->execute($new_row);
           return $r ? ['success'=>true]:['success'=>false,'msg'=>'invalid:error'];
      }

      public function read($row){
            $id = $row['id'];
            $page = $row['page'];
            $limit = 3;
            $offset=$limit * ($page-1);
            $db =$this->db;
            if($id){
                  $r=$db->prepare('select * from cat where id=:id');
                  $r->execute([
                        'id'=>$id
                  ]);
            }else{
                  $r=$db->prepare('select * from cat order by id limit :offset,:limit');
                  $r->execute([
                        'limit'=>$limit,
                        'offset'=>$offset,
                  ]);
                  $h = $r->fetchall(PDO::FETCH_ASSCO);
            }
            return['success'=>true,'data'=>$h];
      }

      public function find($id){
            $h=$this->db->prepare('select * from cat where id=:id');
            $r = $h->execute([
                  'id'=>$id
            ]);
            return $r->fetch(PDO::FETCH_ASSCO);
      }
      
      public function title_exist($title){
            $h=$this->db->prepare('select * from cat where title=:title');
            $h->execute([
                  'title'=>$title
            ]);
            return (bool) $h->fetch(PDO::FETCH_ASSCO);
      }
}