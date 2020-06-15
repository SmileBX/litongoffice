//封装api
var ltapi="http://t3.wanqichina.com/home/api/index";
var imgapi="http://t3.wanqichina.com";
var searchapi="http://t3.wanqichina.com/home/api/searchlst";
//var searchlistapi=http://x4.cnyujiu.com/home/api/indexsearch
var prodapi="http://t3.wanqichina.com/home/api/productmessages/";
//接口
var port={
  "peijian":"peijian",
  "quesion":"quesion",
  "caidan":"caidan",
  "link":"link",
  "product":"productlst",
  "artic":"artic",
  "banner":"banner",
  "getcolum":"getcolum",
  "arctidetial":"productdetails",
  "productlst":"productlst"
}
//19产品配件
//18问答类型
//17菜单类型
//16链接模板
//15产品模板列表
//14文章模板
//13图片模板
//"getcolum":"getcolum"
//"arctidetial":"arctidetial"
//getcolum获取某栏目所有下级且显示层级关系
//productlst 列表
//productmessages 留言

//语言类型
var lan="en";
//需要存取cookie   
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
    tabUrl = 'product_en/'+pramas
  }else{
   tabUrl = '../'+pramas
  }
  
  $(location).attr('href', tabUrl); 
  
})


function ajax(type,portname,number,callback){
  //var pageTotal = 0;
  $.ajax({
    "url":ltapi+portname+"/"+"lan/"+lan+"/"+"t/"+number,
    "type":type,
    dataType : "json",
    "success":function(date){
     // console.log(this.url,"hah")
      callback(date.date,date.supervisor,date)
    },
    "error":function(req){
        console.log(req,"错误");
    }
  });

}


//搜索ajax
function ajaxlist(type,portname,number,callback){
 // var pageTotal = 0;
  $.ajax({
    "url":ltapi+"search"+portname+"/"+"lan/"+lan+"/"+"t/"+number,
    "type":type,
    dataType : "json",
    "success":function(date){
      //console.log(this.url,"hah")
      callback(date)
    },
    "error":function(req){
        console.log(req,"错误");
    }
  });

}
//详情列表ajax
function ajaxlistdeta(type,portname,number,callback){
  // var pageTotal = 0;
   $.ajax({
     "url":ltapi+portname+"/"+"lan/"+lan+"/"+"t/"+number,
     "type":type,
     dataType : "json",
     "success":function(date){
      // console.log(this.url,"hah")
       callback(date)
     },
     "error":function(req){
         console.log(req,"错误");
     }
   });
 
 }
 //留言
function ajaxleave(type,portname,callback){
  // var pageTotal = 0;
   $.ajax({
     "url":prodapi+portname,
     "type":type,
     dataType : "json",
     "success":function(date){
     console.log(this.url,"hah22")
       callback(date)
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
     //播放速度
     loop: true,
     // 自动播放时间
     autoplay: {
       delay: 3000,
       stopOnLastSlide: false,
       disableOnInteraction: false,
     },
     // 如果需要分页器，即下面的小圆点
     pagination: {
       el: '.swiper-pagination',
     }

  })
  return name;
  }


  //获取url地址
  function getQueryString(name) {   
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if( r != null ) return decodeURI( r[2] ); return null;   
}

//补零
function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
 }





//头部列表渲染
ajax("get",port.getcolum,116,function(date){
  //console.log(date[0].children,123)
  var date=date[0].children;
 // console.log(date,"首页")
  var str=`<li class="nav_down_one pad-leaf-none"><a href="./index.html" class="nav-down-one">首页</a></li>`; 
  var str2=""; 
  for(var i=0;i<date.length;i++){
    str+=`
    <li class="nav_down_one ">
      <a class="nav-drop-down nav-down-one" href="${date[i].url}">${date[i].name}</a>
      <div class="nav-box-tab">
        <ul class="aboutus_skip">       
        </ul>
      </div>
    </li>
    `;
  };
  $(".nav-list-box").html(str)

  for(var i=0;i<date.length;i++){
   var str2="";
    var datelist=date[i].children;
  //  console.log(datelist,"哈哈")
    for(var j=0;j<datelist.length;j++){
      str2+=`
      <li><a class="nav-drop-down" href="${datelist[j].url}">${datelist[j].name}</a></li>     
      `
    }
    $(".nav-list-box .nav_down_one").eq(i+1).find("ul").html(str2);

  }
  $(".nav-list-box .nav_down_one").eq(2).find("nav-box-tab").addClass("nav-box-tab3")
})
$(".nav-input").click(function(){

  $(location).attr('href', "./search.html");
})

//底部链接
ajax("get",port.banner,"124",function(date){
 // console.log(date)
  var str="";
  for(var i=0;i<date.length;i++){
    str+=`
    <li><a href="${date[i].banner_url}">${date[i].name}</a></li>
    `
  }
  $(".footer-list-box-title").html(str);
  $(".footer-list-box-title li").eq(0).addClass("fo-list-one");
  $(".footer-list-box-title li").eq(date.length-1).addClass("fo-list-end");
})
//底部友情链接
ajax("get",port.banner,"166",function(date){
 //console.log(date,3212)
  var str="";
  for(var i=0;i<date.length;i++){
    str+=`
    <a href="${date[i].banner_url}"><img src="${imgapi+date[i].bannerimage}" alt=""></a>
    `
  }
$(".footer-con-ico").html(str)
})
