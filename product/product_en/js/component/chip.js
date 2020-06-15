//获取当前路径
var type=getQueryString("type");
var tab=getQueryString("tab")
//console.log(type,tab,"类型和选择")
//类型接口
var typenumber;
//数字接口
var tabnumber;
//中间变量
var tabvariable;
//修改title的内容
var title;

var numberlist=[
  [89,90,91],
  [92,93,94,164,165],
  [95,96,97,98,99],
  [106,107,108],
  [135]
]
//console.log(numberlist[0][0],6363636)

//芯片chip 
//通讯commun
//射频功放 radio
//--终端  terminal
//系统system
// 其他 other
switch(type){
  case "chip" :
         //console.log("芯片chip")
         typenumber=83;
         tabvariable=numberlist[0]
         tabnumber=tabvariable[tab];
         title="chip"
  　　　　break; 
  case "radio":
         //console.log("射频功放")
         typenumber=84;
         tabvariable=numberlist[1]
         tabnumber=tabvariable[tab];
         title="RF power amplifier";
　　　　  break;      
  case "commun":
         //console.log("通讯")
         typenumber=85;
         tabvariable=numberlist[2]
         tabnumber=tabvariable[tab];
         title="commumication";
  　　　　break; 

  case "system":        
         //console.log("系统system")
         typenumber=88;
         tabvariable=numberlist[3]
         tabnumber=tabvariable[tab];
         title="Systems&Equipment";
  　　　　break;  
  case "other":        
         //console.log("其他")
         typenumber=134;
         tabvariable=numberlist[4]
         tabnumber=tabvariable[tab];
         title="another accessory";
  　　　　break; 
  default:        
  　　　　break;
}   ;  


$("title").html(title);
//当前选中第几项
var indexnumber=tab;





//列表框架
ajax("get",port.getcolum,typenumber,function(date){
//console.log(date,6611)
//banner图
var banner=date[0].smallimages;


banner= string_arr(banner)

var strbanner="";
for(var i=0;i<banner.length;i++){
  strbanner+=`
  <div class="swiper-slide"><img class="banner-img" src="${imgapi+banner[i]}" alt=""></div>
  `
}
//console.log(strbanner,"banner");
$("#swiper2 .swiper-wrapper").html(strbanner);
swiperbanner("swiper2","#swiper2")
//实例化banner图

//面包屑导航
$(".title-bread").html(date[0].name);
$(".box-left-title").html(date[0].name);


//列表
var date=date[0].children;
var str="";
for(var i=0;i<date.length;i++){ str+=` <li>
  <div class="radio-box"></div><span>${date[i].name}</span> </li>
  `
  }

  $(".box-left-radio").html(str);
  $(".box-left-radio>li").eq(tab).find("div").addClass("radio-box-active");
  $(".box-left-radio>li").eq(tab).addClass("text-active");
  //请求数据
  $(".box-left-radio>li").click(function(){
  var index=$(this).index();
  $(".box-left-radio>li").find("div").removeClass("radio-box-active");
  $(".box-left-radio>li").eq(index).find("div").addClass("radio-box-active");
  $(".box-left-radio>li").eq(index).addClass("text-active").siblings().removeClass("text-active");
  indexnumber=index;
  //重置数量
  pagenumbe=1;
  pagenumbetuijian=1;
  //分页总量
  pagetotal=1;
  pagetotaltuijain=1;
  //显示上一页下一页
  $(".list-switch1 span").show();
  $(".list-switch2 span").show();

  //再次发起ajax请求
    tabnumber=tabvariable[index];
    listfun(tabnumber,pagenumbe,indexnumber);
    listtuijianfun(tabnumber,pagenumbetuijian,indexnumber);
  })
  
  })


  //渲染列表
  //当前分页
  var pagenumbe=1;
  var pagenumbetuijian=1;
  //分页总量
  var pagetotal=1;
  var pagetotaltuijain=1;


  listfun(tabnumber,pagenumbe,indexnumber);
  function listfun(portid,page,act){
  ajaxlistdeta("get",port.productlst,portid+"/p/"+page+"/s/8",function(date){
 //console.log(date,65236777)
 $(".list-box-title").html(date.column.name)
 // //console.log(tabvariable[tab],tabnumber,"哈哈")
  pagetotal=date.pages;
  //页面太少不显示



  var date=date.date;

  var str="";
  for(var i=0;i<date.length;i++){ str+=` <li>
    <a href="./chip_deta.html?id=${date[i].id}&faid=${typenumber}&ac=${act}">
      <div class="list-box-img">
        <img src="${imgapi+date[i].articleimage}" alt="" title="${date[i].title}">
      </div>
      <div class="list-box-type">
        <p>${date[i].name}</p>
        <p>${date[i].abstract}</p>
      </div>
    </a>
    </li>
    `
    }
    $(".list-box-con1").html(str);
    })
    }

    //点击上一页下一页切换
    $(".list-switch1 .prev").click(function(){
    pagenumbe--;
    if(pagenumbe==0){
      $(this).hide();
      pagenumbe=1;
    }
    $(this).siblings('span').show();

    listfun(tabnumber,pagenumbe);

    })
    $(".list-switch1 .next").click(function(){
    pagenumbe++;
    if(pagenumbe>pagetotal){
      //console.log("最后一页了")
      pagenumbe=pagetotal;
      $(this).hide();
    };
    $(this).siblings('span').show();
    listfun(tabnumber,pagenumbe);
    })


    //推荐列表
    listtuijianfun(tabnumber,pagenumbetuijian,indexnumber);
    function listtuijianfun(portid,page,act){
      ajaxlistdeta("get",port.productlst,portid+"/p/"+page+"/s/4/tuijian/2",function(date){
      //console.log(date,652361)
      //console.log(tabvariable[tab],tabnumber,"哈哈")
      pagetotaltuijain=date.pages;
      //页面太少不显示
      var date=date.date;
    
      var str="";
      for(var i=0;i<date.length;i++){ str+=` <li>
        <a href="./chip_deta.html?id=${date[i].id}&faid=${typenumber}&ac=${act}">
          <div class="list-box-img">
            <img src="${imgapi+date[i].articleimage}" alt="" title="${date[i].title}">
          </div>
          <div class="list-box-type">
            <p>${date[i].name}</p>
            <p>${date[i].abstract}</p>
          </div>
        </a>
        </li>
        `
        }
        $(".list-box-con2").html(str);
        })
        }

        //tuijian点击上一页下一页切换
        $(".list-switch2 .prev").click(function(){
          pagenumbetuijian--;
        if(pagenumbetuijian==0){
          $(this).hide();
          pagenumbetuijian=1;
        }
        $(this).siblings('span').show();
    
        listtuijianfun(tabnumber,pagenumbetuijian);
    
        })
        $(".list-switch2 .next").click(function(){
          pagenumbetuijian++;
        if(pagenumbetuijian>pagetotaltuijain){
          //console.log("最后一页了")
          pagenumbetuijian=pagetotaltuijain;
          $(this).hide();
        };
        $(this).siblings('span').show();
        listtuijianfun(tabnumber,pagenumbetuijian);
        })
    
















