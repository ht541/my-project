<?php
$tmp_name = @$_FILES['avatar']['tmp_name'];
if($tmp_name){
    move_uploaded_file($tmp_name,'./imgs'.rand(1000,9999).'.jpg');
}else {
    del('文件有误');
}
