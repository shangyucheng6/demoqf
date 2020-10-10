window.onload = function(){
        const oBanner = document.querySelector(".box");
        const oUl = document.querySelector(".box ul");
        const aBtns = document.querySelectorAll(".box ol li");
        const LeftANDRightBtn = document.querySelectorAll(".sbox a");
        let iNow = 1;//代表当前显示的图片的下标
        let timer = null;
          //点击小圆点切换
        for(var i = 0; i <aBtns.length;i++){
            aBtns[i].index = i;
            aBtns[i].onclick = function(){
             /*    for(var j = 0 ; j < aBtns.length;j++){
                    aBtns[j].className = "";
                }
                this.className = "active";
                var iNow = this.index + 1;
                startMove(oUl, {left: -600 * iNow});
            } */
            iNow = this.index + 1;
            tab();
            }
        }
       // autotab();
        //自动轮播
        function autotab(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000)
        }
        //轮播
        function tab(){
            for(var j = 0 ; j < aBtns.length;j++){
                    aBtns[j].className = "";
            }
           
            if(iNow == aBtns.length + 1){
                aBtns[0].className = "active";
            }else if(iNow == 0){
                aBtns[aBtns.length - 1].className = "active";
            }
            else{
                aBtns[iNow - 1].className = "active";
            }
            startMove(oUl,{left:iNow * -1500},function(){
                
                if(iNow == aBtns.length + 1){
                    iNow = 1;
                    oUl.style.left = "-1500px";
                }else if(iNow == 0){
                    iNow = 2;
                    oul.style.left ="-1500px" * iNow;
                }                                  
            },15);
            console.log(iNow);
        }
       
       oBanner.onmouseenter = function(){
           clearInterval(timer);
       }
       oBanner.onmouseleave = function(){
           autotab();
       }

       LeftANDRightBtn[0].onclick = function(){
           iNow--;
           antishake(tab(),15,1);
           //tab();
       }

       LeftANDRightBtn[1].onclick = function(){
           iNow++;
           antishake(tab(),15,1);
           //tab();
       }
  


 //购物车部分
     shopping();
    shop_num(); //主要是点击后在购物车里添加数据  和计算总量

 $("footer").click(function(){
    alert("ok");
});
$.ajax({
     url:"data/data1.json",
    success:function(arr){
        var str1 = ``;
        var str2 = ``;
        var str3 = ``;
        for(var i = 0; i <arr.length;i++){
            if(i < 4){
                str1 += ` <div class="headlf11">
                <a href="http://localhost/9.9register/open.html"></a>
                <img src="${arr[i].img}" alt="">
               
                <p class="pname">${arr[i].title} <span>${arr[i].price}</span></p>
                <p class="pnews">解释</p>
                <button class="btnadd" id = "${arr[i].id}">加入购物车</button>
            </div>  `;
            }else if(i < 12){
                str2 += `<div class="headlf11">
                <img src="${arr[i].img}" alt=""> 
                <p class="pname">${arr[i].title} <span>${arr[i].price}</span></p>
                <p class="pnews">解释</p>
                <button class="btnadd" id = "${arr[i].id}">加入购物车</button>
            </div> `;
            }else{
                str3 += `<div class="headrt1">
                <img src="${arr[i].img}" alt="">
                <p class="pname1">"${arr[i].title}" <span>${arr[i].price}</span></p>
                <p class="pnews1">解释</p>
                <button class="btnadd" id = "${arr[i].id}">加入购物车</button>
            </div>`;
            }
        };
        $(".headlf1").html(str1);
        $(".headlf2").html(str2);
        $(".headright").html(str3);
    },
    error:function(msg){
        console.log(msg);
    } 
})
    //将页面上的数据存入cookie 里面
    $("header").on("click",".btnadd",function(){
        var id = this.id;
        //alert(id);
        //判断当前点击加入购物车按钮的id
        var first = $.cookie("goods") == null ? true :false;
        if(first){
            $.cookie("goods",JSON.stringify([{id:id,num:1}]),{
               expires:7 
            });
            //console.log($.cookie("goods"));
        }
        else{
                //不是第一次添加的话，判断之前是否添加过
                var cookieArr = JSON.parse($.cookie("goods"));
                var same = false;  //假设没有相同的数据
                for(var i = 0 ;i <cookieArr.length;i++){
                    if(cookieArr[i].id == id){
                        same = true;
                        break;
                    }
                }
                same ? cookieArr[i].num++ : cookieArr.push({id:id,num:1});
                //处理完cookie里面的数据，然后在从新存回去
              $.cookie("goods",JSON.stringify(cookieArr),{
                  expires:7
              })
            }	  
            shopping();
            shop_num();
            ballMove(this);
    }) 

    //添加移入移出效果
    $(".navfootright3").click(function(){
        //alert("ok");
       $(".shop").animate({width:500},500);;
    })
    //移除的时候
    $(".shop").mouseleave(function(){
        //alert("ok");
        //$(".shop").css("marginRight","-498px");
        $(".shop").animate({width:2},500);
    })

    //购物车里面删除 增加 和减少按钮
    //删除按钮
    $(".shop").on("click", ".shopcar_delete", function(){
        var id = $(this).closest(".shopcar").remove().attr("id");
        console.log(id);
        //删除页面上的节点  从cookie中删除数据
            var cookieArr = JSON.parse($.cookie("goods"));
            // alert("循环前");
             for(var i = 0; i < cookieArr.length; i++){
               if(cookieArr[i].id === id){
                 cookieArr.splice(i, 1);
                 //alert(cookieArr);
                 break;
               }
             }
             if(cookieArr.length){
               $.cookie("goods", JSON.stringify(cookieArr), {
                 expires: 7
               })
             }else{
               $.cookie("goods", null);
             }
     
             //更新数据数量
             shop_num();
      
      })

      //删除函数
      
      //减少和增加购物车里的数量
      $(".shop").on("click", ".shopcar_tit .shopcar_ud", function(){
        var id = $(this).closest(".shopcar").attr("id");
        var cookieArr = JSON.parse($.cookie("goods"));
        for(var i = 0; i < cookieArr.length; i++){
          if(cookieArr[i].id == id){
            break;
          }
        }
        if(this.innerHTML == "+"){
          cookieArr[i].num++;
        }else{
          //cookieArr[i].num == 1 ? alert("数量为1，不能减少") : cookieArr[i].num--;
          if(cookieArr[i].num == 1){
            var id = $(this).closest(".shopcar").remove().attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            // alert("循环前");
             for(var i = 0; i < cookieArr.length; i++){
               if(cookieArr[i].id === id){
                 cookieArr.splice(i, 1);
                 //alert(cookieArr);
                 break;
               }
             }
             if(cookieArr.length){
               $.cookie("goods", JSON.stringify(cookieArr), {
                 expires: 7
               })
             }else{
               $.cookie("goods", null);
             }
     
             //更新数据数量
             shop_num();
          }else{
            cookieArr[i].num--;
          }

        }
        $.cookie("goods", JSON.stringify(cookieArr), {
          expires: 7
        })

        //修改页面上的数量
        $(this).siblings(".shopnum").html(`数量：${cookieArr[i].num}`);
        shop_num();
      }) 


      //下来菜单部分
      $(".menu").mouseenter(function(){
          //alert("ok");
        var menu12 = ` <ul class="menufirst">     
        <li class="lii">手机</li>
        <li  class="lii">电脑</li>
        <li  class="lii">平板</li>
    </ul>
    <div class="menutwo">
    <ul class="mt1">
        <li>华为手机</li>
        <li>苹果手机</li>
        <li>小米手机</li>
    </ul>
    <ul  class="mt2">
        <li>联想电脑</li>
        <li>戴尔电脑</li>
        <li>神州电脑</li>
    </ul>
    <ul class="mt3">
        <li>苹果平板</li>
        <li>华为平板</li>
        <li>步步高平板</li>
    </ul>
    </div>`;
        $(".menu12").html( menu12);
        $(".menufirst").css("display","block");
        //一级菜单
        $('.menufirst').find('li').mouseenter(function(){
            var index = $(this).index();
            $(this).addClass('menuac').siblings().removeClass('menuac');
            $('.menutwo').show();
            $('.menutwo').find('ul').eq(index).show().siblings().hide();
            //二级菜单
            $('.menutwo').find('ul').eq(index).find("li").mouseenter(function(){
                $(this).css("background","green").siblings().css("background","hotpink");
            })
            })
            //一级菜单移出
            $('.navfoot').mouseleave(function(){
                $('.menufirst').css("display","none");
                $('.menutwo').hide();
            })
      })




      //放大镜部分
    $(".headlf1").on("mouseenter","img",function(){
        //alert("ok");
        $(".enlarge").css("display","block");
        //连接外部放大镜功能
        $(".oppo").css("display","block");
        $(".oppo").on("click","a",function(){})
        var id =  $(this).nextAll(".btnadd").attr("id");
        var that = $(this);
        //alert(that);
        //alert(id);
        $.ajax({
            url:"data/data1.json",
            success:function(arr){
                var imgstr = ``;
                for(var i = 0; i < arr.length ; i++){
                    if(arr[i].id == id){
                        imgstr = `<img src="${arr[i].img}" alt="">`;
                        break;
                    }
                };
                $(".enlarge").html(imgstr);
            },
            error:function(msg){
                alert("错误" + msg);
            }
        });
        that.prev().css("display","block");
    }).on("mouseleave","img",function(){
        $(".enlarge").css("display","none");
        //$(".headlf11 a").css("display","none");   
   })
/*    .on("mousemove","img",function(ev){
    var that = $(this);
    var l = ev.clientX  - that.offset().left;
    var t = ev.clientY  - that.offset().top ;
    //限制出界
    t = Math.max(0,t);
    t = Math.min(225,t);
    l = Math.max(0,l);
    l = Math.min(265,l);
    that.prev().css({
        left:l + "px",
        top:t + "px",
    })
    $(".glass img").css({
        left:-2 * l + "px",
        top: -2 * t + "px"
    })
}) */
//连接
 

//求价格
   
    $(".shop").on("click",".shopcar",function(){
        //alert("ok");
        var total = 0;
        $(".navfootright6").click(function(){
            total = 0;
            $(".navfootright5").html(total);
        })
       var goodsp = $(this).find(".shopcar_tit").children("p").eq(1).children("span").html();
       var goodsn = $(this).find(".shopcar_tit").children("p").eq(2).children("span").html();
       
        total += goodsp * goodsn;
        $(".navfootright5").html(total);
       
    })
    //登录 注册
    $(".navfootright2").click(function(){
      $(".containerR").css("display","block");
    })
    $(".navfootright1").click(function(){
      $(".containerL").css("display","block");
    })

    $(".containerRL").mouseleave(function(){
        $(".containerR").css("display","none");
        $(".containerL").css("display","none");
    })
    
   //注册
   $("#btn1").click(function(){
    //alert("ok");
    var oinpt1 = $(".containerR").find("input").eq(0).val();
    var oinpt2 = $(".containerR").find("input").eq(1).val();
    var oinpt3 = $(".containerR").find("input").eq(2).val();
    //alert(oinpt1);
    $.ajax({
        type:'post',
        url:'../../php/1register.php',
        data:{
            username:oinpt1,
            password:oinpt2,
            repassword:oinpt3,
            createtime:new Date().getTime()
        },
        success:function(msg){
           var obj = JSON.parse(msg);//JSON.parse(<anonymous>)返回的字符串不是json格式
            if(obj.code){
                $(".alert").addClass("alert-danger") ;
            }else{
                $(".alert").addClass("alert-success");
            }
            $(".alert").css("display","block");
            $(".alert").html(obj.msg);

        },
        error:function(msg){
            console.log(msg);
        }
    })
    })
  //登录
  $("#btn2").click(function(){
    var oinptl1 = $(".containerL").find("input").eq(0).val();
    var oinptl2 = $(".containerL").find("input").eq(1).val();
    $.ajax({
        type:'post',
        url:'../../php/2login.php',
        data:{
            username:oinptl1,
            password:oinptl2,
        },
        success:function(msg){
           var obj = JSON.parse(msg);//JSON.parse(<anonymous>)返回的字符串不是json格式
            if(obj.code){
                $(".alert").addClass("alert-danger") ;
            }else{
                $(".alert").addClass("alert-success");
            }
            $(".alert").css("display","block");
            $(".alert").html(obj.msg);

        },
        error:function(msg){
            console.log(msg);
        }
    })
    })
    //登录和注册跳转
    $(".gol").click(function(){
        $(".containerR").css("display","none");
        $(".containerL").css("display","block");
    })
    $(".goR").click(function(){
        $(".containerR").css("display","block");
        $(".containerL").css("display","none");
    })
  







//所有代码执行代码都放在上面
}

    //一个加入购物车的函数，一个统计最后数量的函数
    //超购物车里插入数据
    function shopping(){
        var cookieStr = $.cookie("goods");
        if(!cookieStr){
            return;
        }
    //下载json里面所有的数据
    $.ajax({ 
        url:"data/data1.json",
        success:function(arr){
            var cookieArr = JSON.parse(cookieStr);
            var newArr = [];
            for(var i = 0 ; i < arr.length; i++){
                for(var j = 0 ; j <cookieArr.length;j++){
                    if(cookieArr[j].id == arr[i].id){
                        arr[i].num = cookieArr[j].num;
                        newArr.push(arr[i]);
                        break;
                    }
                }
            }
            //拿到了一个数据  里面有id 数量和json数据里的数据
            var str = ``;
          
            for(var i = 0; i < newArr.length; i++){
                str += ` <div class="shopcar" id="${newArr[i].id}">
                <img src="./${newArr[i].img}" alt="" class="shopcar_pic">
                <div class="shopcar_tit">
                    <p>商品名称: <span>${newArr[i].title} </span></p>
                    <p>价格:<span>${newArr[i].price}</span></p>
                    <p class = "shopnum">数量:<span>${newArr[i].num}</span></p>
                <button class="shopcar_ud">-</button>
                <button class="shopcar_ud">+</button>
                <button class="shopcar_delete">删除</button>
                </div>
            </div>`;
               
            }
           $(".shop").html(str);
        },
        error:function(msg){
            console.log(msg);
        }
    })
    }

    // 处理购物车商品数量
    function shop_num(){
        var cookieStr = $.cookie("goods");
        var sum = 0;
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length ; i++){
                sum += cookieArr[i].num;
            }
        }
        $(".navfootright4").html(sum);
    }
    //计算总的价格
/*     function shop_money(){
        var cookieStr = $.cookie("goods");
        if(!cookieStr){
            return;
        }else{
            var cookieArr = JSON.parse(cookieStr);
            var money = 0;
        }
       $.ajax({
        url:"data/data1.json",
        success:function(arr){
            for(var i = 0; i < arr.length;i++){
                for(var j = 0; j < cookieArr.length;j++){
                    if(cookieArr[j].id == arr[i].id){
                        money += cookieArr[j].num * arr[i].price;
                    }
                }
            }
            $(".navfootright2").html(money);
        },
        error:function(msg){
            alert(msg);
        }
       })
    } */

        //抛物线运动函数
    function ballMove(oBtn){
    //将小球移动到点击按钮的这个位置
    $("#ball").css({
    left: $(oBtn).offset().left,
    top: $(oBtn).offset().top,
    display: 'block'
    })

    //计算偏移位置：
    var offsetX = $(".navfootright .navfootright3").offset().left - $("#ball").offset().left;
    var offsetY =  $(".navfootright .navfootright3").offset().top - $("#ball").offset().top;

    var bool = new Parabola({
    el: "#ball",
    offset: [offsetX, offsetY],
    duration: 2000,
    curvature: 0.00001,
    autostart: true,
    callback: function(){
        $("#ball").hide();
    }
    })
     bool.start();
    }

 //startmove 函数
 function startMove(node,objcss,complete){
    clearInterval(node.timer);
    node.timer = setInterval(function(){
        var isEnd = true;
        for(var attr in objcss){
            //设置目的值 和当前值
            var itag = objcss[attr];
            var now = null;
            //获取属性
            //判断当前属性是否是 opacity
            if(attr == "opacity"){
                now = parseInt(parseFloat(getStyle(node,attr))*100);
            }else{
                now = parseInt(getStyle(node,attr));
            }
            // 设置速度
            var speed = (itag - now) /10
            speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
            // 设置当前值
             now += speed;
            // 比较 进行赋值
            if(attr == "opacity"){
                node.style.opacity = now /100;
                node.style.filter = `alpha(opacity = ${now})`;
            }else{
                node.style[attr] = now + "px";
            }
            // 判断isend 是不是false
            if(itag != now){
                isEnd = false;
            }
        }
        //当isend 是true 的时候 停止计时器 执行第三个形参
        if(isEnd){
            clearInterval(node.timer);
            complete && complete.call(node);
        }

    },15)
}
//antishake 函数
function antishake(func,wait,immediate){
    var timer = null;
    return function(){
        const that = this;
        const args = arguments;
        clearTimeout(timer);
        if(immediate){
            if(!timer){
                func.apply(that,args);
            }
            timer = setTimeout(function(){
                timer = null;
            },wait)
        }else{
            timer = setTimeout(function(){
                func.apply(that,args);
            },wait)
        }
    }
}
//getStyle 函数
  //获取节点样式
  function getStyle(node,attr){
    return node.currentStyle
    ? node.currentStyle[attr]
    :getComputedStyle(node)[attr];
}




