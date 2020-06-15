//获取banenr图
ajax("get",port.banner,167,function(date){
//console.log(date)
$(".banenr-box img").attr("src",imgapi+date[0].bannerimage)
})

//分页总量
var datelistnumber=1;
//从第几个截取
var activenumber=0;
//列表每次渲染的新闻条数
 var newsnumber =10;
 //第几个渲染类名
 var strnumber=0;
 //上次变量
 var strmsg="";

//储存所有数据
var strcon;
//渲染列表
listfun(strmsg,activenumber);
function listfun(msg,pagenu){

  //console.log(strmsg,"额鹅鹅鹅")

  ajax("get",port.quesion,"138/p/1/s/10000/class2/0/series/0/type/0/model2/0/"+msg,function(n,m,date){
    //console.log(date,111)
    var datelist=date.date;
    strcon=date.date;

 //假设请求过的数据为100条
     var test_bumber = date.date.length;
     datelistnumber = Math.ceil(test_bumber / newsnumber);
     //生成按钮
      var pagenumber="";
     for(var i=0;i<datelistnumber;i++){
      pagenumber+=`
      <li>${i+1}</li>
      `
     }
     $(".paging-list").html(pagenumber);
     //第一个加样式

     $(".paging-list li").eq(strnumber).addClass("paging-list-active").siblings("li").removeClass("paging-list-active");


//本次渲染的内容 
var strle=activenumber+10
var strcon2 = strcon.slice(activenumber,strle);
//console.log(strcon2,strcon, "哈哈")

    //渲染内容
    var str="";
    for(var i=0;i<strcon2.length;i++){
      str+=`
      <li>
        <div class="domn-serial"> <em> ${PrefixInteger(i+1,2)}</em><span>${strcon2[i].name}</span> </div>
        <div class="domn-name">
          <div><img src="" alt=""> ${strcon2[i].articlecontent}</div>
          <div>${ timestampToTime(strcon2[i].createtime)} </div>
          <div class="domn-ico">
            <a href="${imgapi+strcon2[i].attachfiles}">
              <img src="./img/xiazai.png" alt="">
            </a>
          </div>
        </div>
      </li>  
      `
    }
    $(".down-list-box").html(str)
    //渲染分页
   
  })
}
//点击上一页
$(".paging-box .prev").click(function(){
  activenumber=activenumber-10;
  strnumber--;
  if(activenumber<=0){
    activenumber=0
    strnumber=0;
  };
  listfun(strmsg,activenumber)
  $(".paging-list li").eq(strnumber).addClass("paging-list-active").siblings("li").removeClass("paging-list-active");

})

//点击下一页
$(".paging-box .next").click(function(){
  activenumber=activenumber+10;
  strnumber++;
  //console.log(activenumber,strcon.length,123)
  if(activenumber>=strcon.length){
    activenumber=activenumber-10;
    strnumber=datelistnumber-1;
  }


  //console.log(activenumber,"下一页")
  listfun(strmsg,activenumber);
  $(".paging-list li").eq(strnumber).addClass("paging-list-active").siblings("li").removeClass("paging-list-active");

})
//点击首页
$(".paging-box .paging-start").click(function(){
    activenumber=0;
    strnumber=0;
    //console.log("dianji")
  listfun(strmsg,activenumber)
  $(".paging-list li").eq(strnumber).addClass("paging-list-active").siblings("li").removeClass("paging-list-active");
})
$(".paging-box .paging-end").click(function(){
  
  activenumber=(datelistnumber-1)*10;
    strnumber=datelistnumber-1;

  listfun(strmsg,activenumber);
  $(".paging-list li").eq(strnumber).addClass("paging-list-active").siblings("li").removeClass("paging-list-active");

})



$(".title-domn-search input").click(function(){
  //回车搜索
$(document).keydown(function(event){
             if(event.keyCode==13){
              activenumber=0;
              strnumber=0;
              var msg=$(".title-domn-search input").val();
              //console.log(msg,22)
              strmsg="title/"+msg;
              listfun(strmsg,activenumber)
          
      };


})
//点击搜索
$(".title-domn-search .title-domn-search-box").click(function(){
  activenumber=0;
  strnumber=0;
  var msg=$(".title-domn-search input").val();
  //console.log(msg,22)
  strmsg="title/"+msg;
  listfun(strmsg,activenumber)
})



})