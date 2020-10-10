<?php
    header("Content-type:text/html;charset=utf-8");

    $responseData = array("code" => 0, "msg" => "");

    //var_dump($_POST);
    $username = $_POST['username'];
    $password = $_POST['password'];

    if(!$username){
        $responseData["code"] = 1;
        $responseData["msg"] = "用户名不能为空";
        echo json_encode($responseData);
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["msg"] = "密码不能为空";
        echo json_encode($responseData);
    }
    
    //判读数据库里有没有这个用户名和密码
    $link = mysql_connect("localhost","root","123456");

    if(!$link){
        $responseData["code"] = 3;
        $responseData["msg"] = "没有链接成功";
        echo json_encode($responseData);
        exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db("qf2004");

    $sql = "SELECT * FROM users WHERE username = '{$username}' AND password ='{$password}'";

    $res = mysql_query($sql);
    $row = mysql_fetch_assoc($res);

    if($row){
        $responseData['msg'] = "登录成功";
        echo json_encode($responseData);
    }else{
        $responseData['code'] = 4;
        $responseData["msg"] = "数据库没有找到这个用户";
        echo json_encode($responseData);
        exit;
    }
    mysql_close($link);


?>