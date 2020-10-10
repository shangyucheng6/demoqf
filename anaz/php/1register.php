<?php
 header("Content-type:text/html;charset=utf-8");
    //模拟官方的返回，生成对应的内容
    $resopnseData = array("code"=>0, "msg"=> "");
    //code 指的是传输是否成功 而msg 是要返回的内容

    //var_dump($_POST);
    //将数据取出来
    $username = $_POST['username'];
    $password = $_POST['password'];
    $createtime = $_POST['createtime'];
    $repassword = $_POST['repassword'];

    //判断用户名是否为空
    if(!$username){
        $resopnseData['code'] = 1;  
        $resopnseData['msg'] = "用户名不可以为空";
        echo json_encode($resopnseData);
        exit;  //结束运行
    }
    if(!$password){
        $resopnseData['code'] = 2;
        $resopnseData['msg'] = "密码不可以为空";
        echo json_encode($resopnseData);
        exit;
    }
    if($repassword !== $password){
        $resopnseData['code'] =3;
        $resopnseData['msg'] = "两次密码不同";
        echo json_encode($resopnseData);
        exit;
    }

    
    //这是php5的 链接数据库 天龙八部
    // 第一步 链接数据库
    $link = mysql_connect("127.0.0.1","root","123456");

    // 第二步 判断数据库链接是否成功
    if(!$link){
        echo "链接失败";
        exit;
    }

    // 第三步 设置字符集、
    mysql_set_charset("utf8");

    // 第四步 选择数据库
    mysql_select_db("qf2004");

    // 第五步 准备sql语句
    $sql = "SELECT * FROM users WHERE username = '{$username}'";        //准备需要数据的条件

    //第六步 发送sql语句
    $res = mysql_query($sql);//查询语句，查询和第五步的相同的数据
    //$arr = array();

    //第七步 处理集
    //判断用户名是否注册
    $row = mysql_fetch_assoc($res); //取得所有的关联数据，如果没有返回 false
    if($row){
        $resopnseData['code'] = 5;
        $resopnseData['msg'] = "用户名已经存在";
        echo json_encode($resopnseData);
        exit;
    }
    //如果没有进行插入数据
    $sql2 = "INSERT INTO users(username,password,createtime) VALUES('{$username}','{$password}','{$createtime}')";
    $res = mysql_query($sql2);
    if(!$res){
        $resopnseData['code'] = 6;
        $resopnseData['msg'] = '注册失败';
        echo json_encode($resopnseData);
        exit;
    }
    $resopnseData['msg'] = "注册成功";
    echo json_encode($resopnseData);
    


    // 第八步 关闭数据库
    mysql_close($link);
    
?>