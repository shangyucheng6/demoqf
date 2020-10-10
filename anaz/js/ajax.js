
function ajax({type = "get",url,data,success,error}){
    //1,创建一个ajax的对象
   var xhr = null;
   try{
       xhr = new XMLHttpRequest();
   }catch(error){
       xhr = new ActiveXObject("Microsoft.XMLHTTP");
   }
   //2,open 方法
   if(type === "get" && data){
       url += "?" + querystring(data);
   }
   xhr.open(type,url,true);
   //3, 调用send
   if(type === "get"){
       xhr.send();
   }else{
       xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
       xhr.send(data && querystring(data));
   }
   //4 获取数据
   xhr.onreadystatechange = function (){
       if(xhr.readyState == 4){
           if(xhr.status == 200){
               success && success(xhr.responseText);
           }else{
               error && error('error' + xhr.status);
           }
       }
   }
}

//调用函数 用来拼接字符串的
function querystring(obj){
  var str = ``;
  for(var attr in obj){
      str += `${attr}=${obj[attr]}&`;
  }
  return str.substring(0, str.length - 1);
}
