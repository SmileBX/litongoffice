//获取当前路径
//var type=getQueryString("type");
var tab=getQueryString("tab")
//类型接口
//var typenumber;
//数字接口
var tabnumber;
//中间变量
var tabvariable;

var numberlist=[
  [109,110,111,112],
  [113,114,115],
  [102],
  [103],
  [104],
  [105],
]

tabnumber=numberlist[tab][0];


switch(tab){
  case "0" :
         //console.log("芯片chip")
         //typenumber=83;
         //tabvariable=numberlist[0];
         //tabnumber=tabvariable[0];
  　　　　break; 
  case "1":
        // console.log("射频功放")
        // typenumber=84;
        // tabvariable=numberlist[1]
        // tabnumber=tabvariable[0];
　　　　  break;      
  case "2":
        // console.log("通讯")
         //typenumber=85;
         //tabvariable=numberlist[2]
         //tabnumber=tabvariable[tab];
  　　　　break; 

  case "3":        
         //console.log("系统system")
        // typenumber=88;
         //tabvariable=numberlist[3]
        // tabnumber=tabvariable[tab];
  　　　　break;  
  case "4":        
         //console.log("其他")
        // typenumber=134;
        // tabvariable=numberlist[4]
         //tabnumber=tabvariable[tab];
  　　　　break; 
  case "5":        
        // console.log("其他")
         //typenumber=134;
        // tabvariable=numberlist[4]
         //tabnumber=tabvariable[tab];
　　　　  break; 
  default:        
  　　　　break;
}   ;  










//选中第几个,需要作为参数传到详情
var act=tab;

var typenumber=86



//请求banner和列表
 ajax("get",port.getcolum,86,function(date){
   //console.log(date,66666)
   var banner=date[0].smallimages;
banner= string_arr(banner)

var strbanner="";
for(var i=0;i<banner.length;i++){
  strbanner+=`
  <div class="swiper-slide"><img class="banner-img" src="${imgapi+banner[i]}" alt=""></div>
  `
}
//console.log(strbanner,"banner");
$("#swiper3 .swiper-wrapper").html(strbanner);
swiperbanner("swiper3","#swiper3")





//面包屑导航
$(".title-bread").html(date[0].name); 

   var date=date[0].children;
   //console.log(date,6611)
   var str="";
   //console.log(undefined==false)
   for(var i=0;i<date.length;i++){     
     str+=`
     <li class="box-left-radio-item">
      <div class="box-left-radio-item-title">
        <div class="radio-box"></div><span class="">${date[i].name}</span>      
      </div>
      <ul class="child-item-list">
      </ul>
    </li>
     `
     }
     $(".box-left-radio").html(str)
     for(var i=0;i<2;i++){
       var str2='';
       for(var j=0;j<date[i].children.length;j++){
        str2+=`
        <li class="mm"><span class="radio-box-smill"></span> ${date[i].children[j].name}</li>
        `
       }
     //  console.log(str2,666555)
      $(".box-left-radio .box-left-radio-item").eq(i).find("ul").html(str2);
     }
     //默认选中
    // console.log(tab,99, )
     $(".box-left-radio .box-left-radio-item").eq(tab).children("div").addClass("text-active");
     $(".box-left-radio .box-left-radio-item").eq(tab).children("div").children("div").addClass("radio-box-active");
     $(".box-left-radio .box-left-radio-item").eq(tab).children("ul").children("li.mm").eq(0).children("span.radio-box-smill").addClass("radio-box-smill-active");
    
     

     //小项的选择切换
     $(".child-item-list>li").click(function(){
      //console.log(111)
      var findex= $(this).parent().parent().index();
      //console.log(findex)
      //清楚所有样式
      $(".box-left-radio .box-left-radio-item").children("div.box-left-radio-item-title").removeClass("text-active");
      $(".box-left-radio .box-left-radio-item").children("div.box-left-radio-item-title").children("div").removeClass("radio-box-active");
      $(".box-left-radio .box-left-radio-item").children("ul").children("li.mm").children("span.radio-box-smill").removeClass("radio-box-smill-active");
      //父级下标
   
    
     $(this).find("span").addClass("radio-box-smill-active");
     $(this).parent().siblings("div.box-left-radio-item-title").addClass("text-active")
     $(this).parent().siblings("div.box-left-radio-item-title").find("div.radio-box").addClass("radio-box-active")

       var index=$(this).index();
     // console.log(findex,index,3366)
        tabnumber=numberlist[findex][index];
        //重置数量
        pagenumbe=1;
        pagenumbetuijian=1;
        //分页总量
        pagetotal=1;
        pagetotaltuijain=1;
        //显示上一页下一页
        $(".list-switch1 span").show();
        $(".list-switch2 span").show();
        listfun(tabnumber,pagenumbe);
        listtuijianfun(tabnumber,pagenumbetuijian);
      })



     //请求数据
     $(".box-left-radio-item-title").click(function(){
     var index=$(this).parent().index();
     act=index;
   // console.log(index,66)
    // var findex= $(this).parent().index();
    // console.log(findex,"父级")


    //清楚所有样式
    $(".box-left-radio .box-left-radio-item").children("div.box-left-radio-item-title").removeClass("text-active");
    $(".box-left-radio .box-left-radio-item").children("div.box-left-radio-item-title").children("div").removeClass("radio-box-active");
    $(".box-left-radio .box-left-radio-item").children("ul").children("li.mm").children("span.radio-box-smill").removeClass("radio-box-smill-active");

        //添加选中的样式
    $(".box-left-radio .box-left-radio-item").eq(index).children("div").addClass("text-active");
    $(".box-left-radio .box-left-radio-item").eq(index).children("div").children("div").addClass("radio-box-active");
    $(".box-left-radio .box-left-radio-item").eq(index).children("ul").children("li.mm").eq(0).children("span.radio-box-smill").addClass("radio-box-smill-active");
      //再次发起ajax请求
     tabnumber=numberlist[index][0];
     //重置数量
     pagenumbe=1;
     pagenumbetuijian=1;
     //分页总量
     pagetotal=1;
     pagetotaltuijain=1;
     //显示上一页下一页
     $(".list-switch1 span").show();
     $(".list-switch2 span").show();
     listfun(tabnumber,pagenumbe,act);
     listtuijianfun(tabnumber,pagenumbetuijian,act);
     })

    });






    //渲染列表
    //当前分页
    var pagenumbe=1;
    var pagenumbetuijian=1;
    //分页总量
    var pagetotal=1;
    var pagetotaltuijain=1;
  


listfun(tabnumber,pagenumbe,act);
function listfun(portid,page,nct){
  ajaxlistdeta("get",port.productlst,portid+"/p/"+page+"/s/8",function(date){
   // console.log(date,65236)
      //渲染面包屑导航
     var strtitle=`
     <span>${date.f_column.name}</span><span class="smail-gl-d">></span><span class="text-active">${date.column.name}</span>  
     `
    $(".list-box-title").html(strtitle);
    pagetotal=date.pages;
    //页面太少不显示
    var date=date.date;
    var str="";
    for(var i=0;i<date.length;i++){ str+=` <li>
      <a href="./chip_deta.html?id=${date[i].id}&faid=${typenumber}&ac=${nct}">
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
listtuijianfun(tabnumber,pagenumbetuijian,act);
function listtuijianfun(portid,page,nct){
  ajaxlistdeta("get",port.productlst,portid+"/p/"+page+"/s/4/tuijian/2",function(date){
  //console.log(date,652361)
  //console.log(tabvariable[tab],tabnumber,"哈哈")
  pagetotaltuijain=date.pages;
  //页面太少不显示
  var date=date.date;

  var str="";
  for(var i=0;i<date.length;i++){ str+=` <li>
    
    <a href="./chip_deta.html?id=${date[i].id}&faid=${typenumber}&ac=${nct}">
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