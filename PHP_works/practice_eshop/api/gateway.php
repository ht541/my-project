<?php 
require_once('./product.php');
require_once('./cat.php');
function new_db(){
    return new PDO ('mysql:dbname=eshop;host=localhost;charset=utf8','root','hutong541',[
        PDO::ATTR_CASE => PDO::CASE_NATURAL, /*PDO::CASE_NATURAL | PDO::CASE_LOWER 小写，PDO::CASE_UPPER 大写， */
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, /*是否报错，PDO::ERRMODE_SILENT 只设置错误码，PDO::ERRMODE_WARNING 警告级，如果出错提示警告并继续执行| PDO::ERRMODE_EXCEPTION 异常级，如果出错提示异常并停止执行*/
        PDO::ATTR_ORACLE_NULLS => PDO::NULL_NATURAL, /* 空值的转换策略 */
        PDO::ATTR_STRINGIFY_FETCHES => false, /* 将数字转换为字符串 */
        PDO::ATTR_EMULATE_PREPARES => false, /* 模拟语句准备 */
    ]);
}
function parse_param(){
    $param = array_merge($_GET,$_POST);
    $Klass = ucfirst(@$param['model']);
    $method =@$param['action'];
    $model = new $Klass(new_db());
    unset($param['model'],$param['action']);
    return $model->$method($param);
}

function json($data){
    header('Content-type:application/json');
     return json_encode($data);
}


function init(){
    echo json(parse_param());
}
init();