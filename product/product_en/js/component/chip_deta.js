//获得产品id
var id=getQueryString("id") 
//console.log(id);
//获得父级id
var faid=getQueryString("faid") ;
//获得选中下标
var ac=getQueryString("ac") ;
//区分类型
var type=getQueryString("type") ;
//详情页面做处理sign
var sign=getQueryString("sign") ;
//console.log(faid)
//主页面和搜索页面进来不渲染
if(faid=="null"){
 // faid=00;
 // ac=00
 $(".hidespan").hide()
}else{
  if(sign==0){
    $(".hidespan").hide();
    }else{
      //渲染左侧内容
    ajax("get",port.getcolum,faid,function(date){
     // //console.log(date,6611)
      var leftcon=date[0].children;
      var strlist="";
      for(var i=0;i<leftcon.length;i++){
        strlist+=`
        <li>
          <a href="${leftcon[i].url}">
        <div class="radio-box "></div><span class="text-active">${leftcon[i].name}</span>
      </a>
      </li>  
      `
      };
    $(".box-left-title").html(date[0].name);
      $(".box-left-radio").html(strlist);
      //详情二级面包屑导航
      var strcru=`
      <a href="${leftcon[ac].url}">
        ${leftcon[ac].name}
      </a>
      `;
      $(".name_cru1").html(strcru)
 
    
      //渲染面包屑导航
      var facrumbsurl=`
      <a href="${date[0].url}">${date[0].name}</a>
      `
      $(".facrumbs").html(facrumbsurl);
      $(".box-left-radio>li").eq(ac).find("div").addClass("radio-box-active");
      $(".box-left-radio>li").eq(ac).addClass("text-active");
      //渲染二级导航
    
    
      //banner图
      var banner=date[0].smallimages;
      banner= string_arr(banner)
      var strbanner="";
      for(var i=0;i<banner.length;i++){
        strbanner+=`
        <div class="swiper-slide"><img class="banner-img" src="${imgapi+banner[i]}" alt=""></div>
        `
      }
     // //console.log(strbanner,"banner");
      $("#swiper4 .swiper-wrapper").html(strbanner);
      swiperbanner("swiper4","#swiper4")
      //实例化banner图
    })
    
    }
}















if(type){
  type=type
}else{
  type=2;

}






ajax("get",port.arctidetial,id+"/type/"+type,function(num,supervisor,date){

  //console.log(date,"面包屑")
  //面包屑导航
  var datecrumbsname=date.date.name;
  $(".name_cru2").html(datecrumbsname);


  //说明书
  var attachfiles=date.date.attachfiles; 
  //console.log(attachfiles,'说明书')
  $(".down-box a").eq(0).attr("href",imgapi+attachfiles)
  //渲染右侧数据
  //功能
  var datefun=date.date.articlecontent;
  //颜色
  var color_box=date.color;
  //console.log(color_box,"颜色",date)
  //配置
  var config_box=date.date.guigecontent;

$(".fun-box").html(datefun);
$(".config-box").html(config_box);
var swiper8 = new Swiper('#swiper8', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  mousewheel: true,
});

//循环生成颜色

var strcolor="";
for(var i=0;i<color_box.length;i++){
  strcolor+=`
  <span style="background:${color_box[i].color_code}"></span>
  `
}
$(".color-box-con").html(strcolor);
var colorindex=0;
//第一次加载
var strstatr=string_arr(color_box[0].colorimages);
var strm1="";
var strm2="";
for (var i=0;i<strstatr.length;i++){
  strm1+=`
  <li><img src="${imgapi+strstatr[i]}" alt=""></li>
  `;
  strm2+=`
  <img src="${imgapi+strstatr[i]}" alt=""> `
}
$(".show-taber").html(strm1);
$(".show-box").html(strm2);
$(".show-box img").eq(0).show().siblings().hide();
//点击图片切换
$(".show-taber li").click(function(){
  var index=$(this).index();
  //console.log(index,3)
  $(".show-box img").eq(index).show().siblings().hide();
})


//点击颜色切换
$(".color-box-con span").click(function(){
  var index=$(this).index();
  var str="";
  var str2=""
  var colorbox=string_arr(color_box[index].colorimages) ;
  for(var i=0;i<colorbox.length;i++){
    str+=`
    <li><img src="${imgapi+colorbox[i]}" alt=""></li>
    `;
    str2+=`
    <img src="${imgapi+colorbox[i]}" alt="">
    `
  }
  $(".show-taber").html(str);
  $(".show-box").html(str2);
  $(".show-box img").eq(0).show().siblings().hide();
  //点击图片切换
$(".show-taber li").click(function(){
  var index=$(this).index();
 // //console.log(index,3)
  $(".show-box img").eq(index).show().siblings().hide();
})

});
//var a=[1,2]
//var b=a;
//console.log(a,b,"666哈哈")
//a.splice(0,1)
//console.log(a,b,"666哈哈2")



//产品配件渲染加分页
  var parts_list=date.peijian;
  var parts_list2=parts_list.slice(0);
  //当前页面
  pagenu=0;
  //总页
  pagesum=Math.ceil(parts_list.length/ 5)
  //console.log(pagesum,"总额也")
  //内容
  pagecon=parts_list2.splice(pagenu,5);

 //console.log(parts_list,"配偶间")
 //console.log(pagecon,"配偶间2")
  peijianfun(pagecon)
  //点击事件
  $(".recom-switch2 .prev").click(function(){
   // parts_list=date.peijian;
     parts_list2=parts_list.slice(0);
    pagenu=pagenu-5;
    if(pagenu<0){
      pagenu=0;
      $(this).hide().siblings().show();
    }
    pagecon=parts_list2.splice(pagenu,5);
    peijianfun(pagecon)
  })
  $(".recom-switch2 .next").click(function(){
    //parts_list=date.peijian;
   // //console.log(parts_list,1313)
    //var mm=pagenu;
 parts_list2=parts_list.slice(0);
    pagenu=pagenu+5;
    if(pagenu>=parts_list.length){
      pagenu=5*pagesum-5;
      $(this).hide().siblings().show();
    }
    //console.log(pagenu,"shulaing",parts_list)
    pagecon=parts_list2.splice(pagenu,5);
    peijianfun(pagecon)
  })



  


})
//配件
if(type==2){
  function peijianfun(con){
    var str="";
      for(var i=0;i<con.length;i++){
        str+=`
        <li>
          <a href="./chip_deta.html?id=${con[i].id}&faid=${faid}&ac=${ac}&type=1">
          <div class="list-box-img">
          
            <img src="${imgapi+con[i].articleimage}" alt="">
          </div>
          <div class="list-box-type">
            <p>${con[i].name}</p>
          </div>
        </a>
        </li>
        `
      }
  $(".list-box-con2").html(str)
  }

}else{
  $(".recom-box").hide();
  $(".date-box").addClass("mbtom");
  function peijianfun(n){

  }
}





