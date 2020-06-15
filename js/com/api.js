//封装api
var ltapi="http://x4.cnyujiu.com//home/api/index";
var imgapi="http://x4.cnyujiu.com";
var searchapi="http://x4.cnyujiu.com/home/api/searchlst";
var liuyan="http://x4.cnyujiu.com/home/api/liuyan"
//接口
var port={
  "peijian":"peijian",
  "quesion":"quesion",
  "caidan":"caidan",
  "link":"link",
  "product":"product",
  "artic":"artic",
  "banner":"banner",
  "getcolum":"getcolum",
  "arctidetial":"arctidetial",
  "getcolum":"getcolum"
}
//19产品配件
//18问答类型
//17菜单类型
//16链接模板
//15产品模板
//14文章模板
//13图片模板
//"getcolum":"getcolum"
//"arctidetial":"arctidetial"
//getcolum获取某栏目所有下级且显示层级关系


//语言类型
var lan="en";



//input输入
$(".input-title-box>input").click(function(){
  $(this).css("width",200)
  $(this).addClass("textactive")
})
// 失去焦点
 $(".input-title-box>input").blur(function(){
   $(this).css("width",160)
   $(this).removeClass("textactive")
   })

//需要更改内容
//var lancon= getQueryString("lan");
//console.log(lancon,"lanlan11111111")
//if(lancon){
//lancon="中文";
//}else{
//
//  if(lan=="cn"){
//    lancon="English";
//  }else{
//    lancon="中文";
//  }
//
//}
//$(".nav_right_box_btn").html(lancon)

// $(".nav_right_box_btn").click(function(){
//        //console.log(getQueryString) 
// 	   console.log($(location)[0].href)
//        var url=$(location).attr("href");
//        if(url.indexOf("?")!=-1){                        //判断是否存在参数
// 			url = url.replace(/(\?|#)[^'"]*/, '');           //去除参数
// 		}
//   if($(this).html()=="中文"){
//     $(this).html("English")
//     lan="en"
// 	 // url=url+'?lan=en'
//    // url=url+'?lan='+lan
//    // $(location).attr('href', url);
//   }else{
//     $(this).html("中文")
//    lan="cn"
//   // $(location).attr('href', url);
//   }
  
//   $.cookie("language",lan,{ expires: 7, path: '/', secure: false });
//    url=url+'?lan='+lan
//     console.log(url,"828282")
//   $(location).attr('href', url); 
  
// })

//中英文切换
$(".nav_right_box_btn").click(function(){
	
   let tabUrl = ''
   let arr = ''
   let pramas = ''
   console.log($(location)[0].href)
   let url_href=$(location)[0].href
   arr = url_href.split('/')
   console.log(arr,"arr111111")
   pramas = arr[arr.length-1]
   console.log(pramas,"pramas")
  if($(this).html()=="中文"){
    tabUrl = 'official_en/'+pramas
  }else{
   tabUrl = '../official_cn/'+pramas
  }
  
  $(location).attr('href', tabUrl); 
  
})

//我要留言提交
$(".btn_sbmit").click(function(){
 // //console.log(11)
  var str0=$(".modal-body .sbmit_name").val();
  var str1=$(".modal-body .sbmit_phone").val();
  var str2=$(".modal-body .sbmit_text_con").val();
  //console.log(str0,str1,str2,"neirong")
  if(str0 =="" || str1=="" || str2==""){
    $(".sbmit_hint").removeClass("sbmit_hint_g")
    if(str0 ==""){
      $(".sbmit_hint").html("姓名不能为空")
    }
    if(str1 ==""){
      $(".sbmit_hint").html("电话或邮箱不能为空")
    }
    if(str2 ==""){
      $(".sbmit_hint").html("留言内容不能为空")
    }


  }else{
    $.ajax({
      "url":liuyan+"/"+"user_name/"+str0+"/tel/"+str1+"/liuyan/"+str2,
      "type":'get',
      dataType : "json",
      "success":function(date){
        //console.log(this.url,"hah22221121")
       // callback(date.date,date.supervisor,date)
       //console.log(date,"成功")
       $(".modal-body .sbmit_name").val("");
       $(".modal-body .sbmit_phone").val("");
       $(".modal-body .sbmit_text_con").val("");
     
       $(".sbmit_hint").html("留言成功,我们会尽快与您联系")
       $(".sbmit_hint").addClass("sbmit_hint_g");

          
          setTimeout(function(){
            $("#myModal").modal('hide');
          },1000);
          

      },
      "error":function(req){
          //console.log(req,"错误");
          $(".sbmit_hint").html("留言失败")
           $(".sbmit_hint").removeClass("sbmit_hint_g");
      }

    })
    }

  })






 
function ajax(type,portname,number,callback){
 // //console.log(lan,"这是地址")
 //2020-6-12新增
  // console.log($.cookie("language"),"565656565656")
  // let language = $.cookie("language")
  // if(language == 'en'){
  // lan="en";
  // $(".nav_right_box_btn").html("English")
  // }else{
  //  lan="cn";
  //  $(".nav_right_box_btn").html("中文")
  //  //console.log("没有获得只")
  // }
  // var m =getQueryString("lan");
var m =getQueryString("lan");
if(m == 'en'){
lan="en";
$(".nav_right_box_btn").html("English")
}else{
 lan="cn";
 $(".nav_right_box_btn").html("中文")
 //console.log("没有获得只")
}

  var pageTotal = 0;
  $.ajax({
    //"url":ltapi+portname+"?"+"lan="+lan+"&"+"t="+number,
    "url":ltapi+portname+"/"+"lan/"+lan+"/"+"t/"+number,
    "type":type,
    dataType : "json",
    "success":function(date){
     // console.log(this.url,"hah22221121")
      callback(date.date,date.supervisor,date)
    },
    "error":function(req){
        console.log(req,"错误");
    }
  });

}



/* 时间戳转日期
* @param timestamp
* @returns {}
*/
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
 Y = date.getFullYear() + '-';
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  D = date.getDate() + ' ';
 // h = date.getHours() + ':';
  //m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
  //s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
  return Y+M+D;
  }



function timestampToTime1(timestamp) {
var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//Y = date.getFullYear() + '-';
M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)+ '- ' ;
D = date.getDate() + ' ';
return M+D;
}
function timestampToTime2(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '';
  //M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
  //D = date.getDate() + ' ';
 // h = date.getHours() + ':';
  //m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
  //s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
  return Y;
  }

  function timestampToTime3(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //Y = date.getFullYear() + '';
    //M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
    D = date.getDate() + ' ';
   // h = date.getHours() + ':';
    //m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    //s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    return D;
    }
    function timestampToTime4(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + '/';
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
      //D = date.getDate() + ' ';
     // h = date.getHours() + ':';
      //m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
      //s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
      return Y+M;
      }



//taber切换
/* @titlename   taber切换的列表
* @classname     需要添加的类名
* @showname      显示的名字 父级加子元素 字符串   
*/
  function taberone(titlename,classname,showname){
    $(titlename).off("click").on("click",function(){
      var index = $(this).index();
      $(titlename).eq(index).addClass(classname).siblings().removeClass(classname);
      $(showname).eq(index).show().siblings(showname).hide()
    });
  }

  //字符串转数组
  /* str 需要转化的字符串  注意分割以逗号分割的 最后如果有逗号要去掉
  */   
  function string_arr(str){
    var arr=[];
    var s=str;
    arr=s.split(",");
    return arr

  }
  function string_arr2(str){
    var arr=[];
    var s=str;
    arr=s.split("|");
    return arr

  }





  //banner实例化
  //taber切换
/* @name   实例化后的名字 string
* @id   实例化的id名字  string
*/

  function swiperbanner(name,id){

    var name= new Swiper(id, {
    
      navigation: {
        nextEl: '.swiper-button-next',//左右两侧按钮
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      loop : true,//衔接切换
      
      autoplay: {
        disableOnInteraction: false,//用户操作不停止
        delay: 2000,//1秒切换一次 
      },
      
    });
    return name;
  }

  function swiperbanner_footer(name,id,portnumber){
    var name=new Swiper($(id),{
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // <!-- slidesPerView : 3, -->
        // <!-- spaceBetween : 20, -->
        centeredSlidesBounds:true,//靠左 boolean
        slidesPerView: 5 ,
        centeredSlides: true,
        spaceBetween: 30,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination', 
        },
    })
    //底部轮播
    ajax("get",port.banner,portnumber,function(date){
     // //console.log(date,123)
      var footerbanner="";
      for(var i=0;i<date.length;i++){
        footerbanner+=`
            <div class="swiper-slide">
              <div class="swiper-slide-box box11">
                <img class="swiper-small-img" src="${imgapi+date[i].bannerimage}" alt="">
                <div class="swiper-big-box">
                  <img class="swiper-big-box-img" src="${imgapi+date[i].bannerimage}" alt="">
                </div>
              </div>
            </div>`;
      }
      //公司资质底部banner和实例化
      $(id+" .swiper-wrapper").html(footerbanner);

    //移入放大图片
    $( id+" .swiper-wrapper .swiper-slide").mouseover(function(){
      $(this).find(".swiper-big-box").show();
    })
    $( id+" .swiper-wrapper .swiper-slide").mouseout(function(){
      $(this).find(".swiper-big-box").hide();
    })
  })
  }




  //获取url地址
  function getQueryString(name) {   
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if( r != null ) return decodeURI( r[2] ); return null;   
}







//banner图加放大功能
/* @name  实例化后的名字 string
* @id   实例化的id名字  string需要带#
*@viewnumber  显示的数量
*/
//banner下的循环
function bannermagnify(name,id,viewnumber ){
  var name=new Swiper($(id),{
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // <!-- slidesPerView : 3, -->
      // <!-- spaceBetween : 20, -->
      centeredSlidesBounds:true,//靠左 boolean
      slidesPerView: 5 ,
      centeredSlides: true,
      spaceBetween: 30,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination', 
      },

  })
  //放大镜效果
  $(id+">.swiper-wrapper>.swiper-slide").mouseover(function(){
    //鼠标移入显示小方块和放大图片
    $(this).find("div.swiper-small-moverbox").show()
    $(this).find("div.swiper-big-box").show()

  })
  $(id+">.swiper-wrapper>.swiper-slide").mouseout(function(){
      //鼠标移除消失
      $(this).find("div.swiper-small-moverbox").hide();
      $(this).find("div.swiper-big-box").hide()

  })
  //定位
  $(id+">.swiper-wrapper>.swiper-slide").mousemove(function(e){
    // //console.log(e)
    e = e || window.event;
    //获得鼠标位置
  var __xx = e.pageX || e.clientX + document.body.scroolLeft;
  var __yy = e.pageY || e.clientY + document.body.scrollTop;
  // //console.log(__xx,__yy)
    var x=__xx-$(this).find(".swiper-small-moverbox").width()/2-$(this).find(".swiper-slide-box").offset().left;
    var y=__yy-$(this).find(".swiper-small-moverbox").height()/2-$(this).find(".swiper-slide-box").offset().top;
  
    //限制范围
    if(x<=0){x=0}
    if(x>=$(this).find(".swiper-slide-box").width()-$(this).find(".swiper-small-moverbox").width()){$(this).find(".swiper-slide-box").width()-$(this).find(".swiper-small-moverbox").width()};
    if(y<=0){y=0}
    if(y>=$(this).find(".swiper-slide-box").height()-$(this).find(".swiper-small-moverbox").height()){$(this).find(".swiper-slide-box").height()-$(this).find(".swiper-small-moverbox").height()}
    //小方块需要跟随鼠标移动

    $(this).find(".swiper-small-moverbox").css({
      "left":x,
      "top":y
    })
    //图片需要移动的位置
    var ximg=-x*($(this).find(".swiper-big-box-img").width()/$(this).find(".swiper-small-img").width())
    var yimg=-y*($(this).find(".swiper-big-box-img").height()/$(this).find(".swiper-small-img").height())
    //放大镜图片跟小方块移动
    // //console.log
    $(this).find(".swiper-big-box-img").css({
      "left":ximg,
      "top":yimg
    })
  })
}


//滚动监听回到顶部
$(window).scroll(function(){
  //console.log()
  var ht_top=$("html").scrollTop();
  if(ht_top>=800){
    $(".broadside").show();
  }else{
    $(".broadside").hide();
  }
})

// 回到顶部
$(".broadside_top").click(function(){
    $("html").animate({
        "scrollTop":"0"
      },500);
  })

 // $.cookie('name','dumplings', {domain:'qq.com'})










 /*封装列表渲染
 port_id, 请求的接口
 //list_number 第几页
 con_class  内容的容器类名
 page_class  分页的盒子类名
 prevclass,nextclass 上一页下一页的类名
 */
 
 function listfun(port_id,con_class,page_class,prevclass,nextclass){
   //当前选中的第几个数字
   var tab = 0;
   var port_page_number=1;
   ////分页按钮数量
   var number = 0;
   //初次渲page列表和内容
   ajax("get",port.artic,port_id+"/p/1/s/8/type/1",function(date,mm,ss){
     var detalength=ss.date.length;  
     //// 生成按钮数量
     var str = "";
     
     ////列表每次渲染的新闻条数
     var newsnumber = 8
 
     //假设请求过的数据为100条
     var test_bumber = ss.total;
     number = Math.ceil(test_bumber / newsnumber);
 
     //生成分页数量
     for (var i = 1; i < number + 1; i++) {
       str += "<li>" + i + "</li>"
     }
      //console.log(str)
      $(".press_page_list_box "+page_class).html(str);
      //默认渲染第一个
      $(page_class+" li").eq(0).addClass("tab-naext_active");
      //渲染内容
      list_con_con(1);
      //请求数据内容
      
     //上一页
 
     $(".footer_press_box>"+prevclass).click(function(){
       //console.log("点击了")
       //console.log(tab,port_page_number,"enen00");
      tab--;
      port_page_number--;
      // if(mm<=0){
      //   $(this).hide().siblings("span").show();
      //   mm=0;
      //   tab=1;
      // }
      if(tab<=0){
       $(this).hide().siblings("span").show();
       tab=0;
       port_page_number=1;
      }else{
       $(this).show();
      }
       $(page_class+">li").eq(tab).addClass("tab-naext_active").siblings("li").removeClass("tab-naext_active")
       list_con_con(port_page_number);
     })
   //下一页
     $(".footer_press_box>"+nextclass).click(function(){
       //选中类名的下标
       //console.log(tab,port_page_number,"enen00");
       //console.log("点击了")
  
         tab++;
        port_page_number++;
      // //console.log(mm,number,"2589363")
       if(tab>=number-1){
         $(this).hide().siblings("span").show();
         //mm=number-1;
         tab=number-1;
         port_page_number=number
       }else{
         $(this).show();
       }
       //console.log(tab,port_page_number,"enen")
       $(page_class+">li").eq(tab).addClass("tab-naext_active").siblings("li").removeClass("tab-naext_active");
       list_con_con(port_page_number); 
     })
  
   
 
 
 
 
 
     }) 
 
     function  list_con_con(list_number){
       ajax("get",port.artic,port_id+"/p/"+list_number+"/s/8/type/1",function(date,mm,ss){
         //内容
         //console.log(ss)
         var detalength=ss.date.length;
 
         ////分页按钮数量
         var number = 0        
         ////列表每次渲染的新闻条数
         var newsnumber = 8
         //假设请求过的数据为100条
         var test_bumber = ss.total;
         number = Math.ceil(test_bumber / newsnumber);
           var str2="";
          for(var i=0;i<detalength;i++){
            str2+=`<li class="list-gror-con">
             <a href="./explore_deta.html?tab=解决方案&id=${date[i].id}">
               <div class="list-gror-con-back-img"><img src="${imgapi+date[i].articleimage}" alt=""></div>
               <div class="soly-title-ico soly-title-ico0 list-gror-con-ico"> </div>
               <p class="list-gror-con-title">${date[i].title}</p>
             </a>
             </li>`
          }
          $(con_class+">ul").html(str2)
        })
     }
 }

























 //初始化菜单栏
 ajax("get",port.getcolum,1,function(date){
  //console.log(date,666666)
  $(".navbar-brand").attr("href",date[0].children[0].url)
   var date=date[0].children;
   //循环更改父级url
   var date2=date.slice(1);
   //console.log(date2,"吱吱吱自己");
   var strnav="";
   for(var i=0;i<date2.length;i++){
     var strchilnav="";
     var strcon=date2[i].children;
     for(var j=0;j<strcon.length;j++){
       strchilnav+=`
       <li><a class="nav-drop-down" href="${strcon[j].url}">${strcon[j].name}</a></li>
       `
     };
     strnav+=`
     <li class="nav_down_one  nav_down_one${i+1}">
       <a href="${date2[i].url}"
         class="tab ">${date2[i].name}</a>
       <div class="nav-box-tab">
         <ul class="aboutus_skip">
           ${strchilnav}
           </ul>  
       </div>
     </li> 
     `;
   }
   $(".navbar-left").html(strnav);
 
   //底部
   var date3=date.slice(4);
   //console.log(date3,"吱吱吱自己44");
   var strfooternav="";
   for(var i=0;i<date3.length;i++){
     var strchilnav="";
     var strcon=date3[i].children;
     for(var j=0;j<strcon.length;j++){
       strchilnav+=`
       <span><a href="${strcon[j].url}">${strcon[j].name}</a></span>
       `
     };
     strfooternav+=`
     <div class="footer_list_nav${i+1}">
       <span class="title_one"><a href="${date3[i].url}">${date3[i].name}</a> </span>
       ${strchilnav}
     </div>
     `;
   }
   strfooternav+=`<div class="options-box2">
    <span class="title_one"><a href="">订阅我们</a></span>
    <span><a href="#">第一时间获得力同的最新动态</a></span>

    <div class="email" data-toggle="modal" data-target="#myModal"><input placeholder="&nbsp; Email" type="text" /><span class="qs">></span></div>
  </div>`;



   $(".options-box1").html(strfooternav)
   
 
 //kaishi
   $(function () {
     <!-- //console.log($(".test"), 1111) -->
     $(document).ready(function () {
       $(document).off('click.bs.dropdown.data-api');
     });
     $(document).ready(function () {
       dropdownOpen();//调用
     });
     /**
      * 鼠标划过就展开子菜单，免得需要点击才能展开
      */
     function dropdownOpen() {
 
       var $dropdownLi = $('li.dropdown');
 
       $dropdownLi.mouseover(function () {
         $(".test").addClass('.mm');
       }).mouseout(function () {
         $(".test").removeClass('.mm');
       });
     }
 
   })
 
 
 })









