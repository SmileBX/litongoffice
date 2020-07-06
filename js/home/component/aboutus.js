(function(){
  var abo_swiper0;
  var abo_swiper1;
  var abo_swiper3;
//渲染头部nav
 // navlist()
//
 
  //判断进入那个页面
      var tab=getQueryString("tab")
      console.log(tab)

          Introduction() ;//公司简介
 
          development()  ;//发展历程
         
          distribution() ;//公司分布

          qualification();//荣耀资质

          responsibility(); //社会责任
       
      if(tab){
        
        $(".abo_box_taber>li").eq(tab).addClass("taber_title_on").siblings().removeClass("taber_title_on");
        $(".abo_taber_content .abo_taber_box").eq(tab).show().siblings(".abo_taber_box").hide()
      

     
      }else{
		 
        //直接进入调取
        Introduction()
        $(".abo_box_taber>li").eq(0).addClass("taber_title_on").siblings().removeClass("taber_title_on");
        $(".abo_taber_content .abo_taber_box").eq(0).show().siblings(".abo_taber_box").hide()
      }




 
  // <!-- 资质荣耀taber切换 -->
  $(function(){
    $(".glory_title li").off("click").on("click",function(){
      var index = $(this).index();
      qualification ();
      $(this).addClass("glory_active").siblings().removeClass("glory_active");
      $(".glory_content .glory_content_box").eq(index).addClass("active").siblings().removeClass("active");
    });


  })
//







 

//首先调取关于力同banenr
  ajax("get",port.getcolum,"4",function(date){
      //console.log(date,"首页logo")
      var strlogo=` <img class="banner-img" src="${imgapi+date[0].smallimages}" alt="">`
      $(".abo_banner").html(strlogo)
      //列表
      let taberlist=date[0].children;
      let stritem="";
     console.log(taberlist,"孩子")
      for(var i=0;i<taberlist.length;i++){
       stritem+=`<li>${taberlist[i].name}</li>`
      }
      $(".abo_box_taber").html(stritem)
      //第一个默认选中
     $(".abo_box_taber li").eq(tab).addClass("taber_title_on")
      //最后一个没有右边的线
      $(".abo_box_taber li").eq(taberlist.length-1).addClass("taber_title_on_line")
     
     
     
      // <!-- 关于力同taber切换 -->   
        $(".abo_box_taber li").off("click").on("click",function(){
          var index = $(this).index();
		  console.log(index,"kkkkkkkkkk") 
          switch(index){
            case 0:
            Introduction();
            　　　　break;       
            　　case 1:
            development ()
            　　　　break; 
            　　case 2:        
            distribution()
            　　　　break;  
            　　case 3:        
            qualification()
            　　　　break; 
            case 4:
            responsibility()  ;
            　break;    
            default:        
            　　　　break;
          }   ;   
          $(".abo_box_taber li").eq(index).addClass("taber_title_on").siblings().removeClass("taber_title_on");
          $(".abo_taber_content .abo_taber_box ").eq(index).show().siblings(".abo_taber_content .abo_taber_box ").hide()
        });
   



      //发明专利下的taber切换
     let aptitude=taberlist[3].children
   //  //console.log(aptitude,66)
     var straptitude="";
      for(var i=0;i<aptitude.length;i++){
        straptitude+=`<li><span>${aptitude[i].name}</span></li>`
      }
      $(".aptitude_taber").html(straptitude);
      //taner切换
      $(".aptitude_taber li").eq(0).find("span").addClass("glory_active");
      $(".aptitude_taber li").eq(aptitude.length-1).addClass("line_none");

    //  $(".aptitude_taber li").eq(0).addClass("line_box");

     
      
     $(".aptitude_taber li").off("click").on("click",function(){
      // //console.log(112)
       var index = $(this).index();
       qualification ();
       $(".aptitude_taber li").find("span").removeClass("glory_active");
        $(".aptitude_taber li").eq(index).find("span").addClass("glory_active");
        $(".glory_content .glory_content_box").eq(index).show().siblings(".glory_content .glory_content_box  ").hide()
      });



    // taberone(".aptitude_taber li","glory_active",".glory_content .glory_content_box  ")
  })  





//公司简介接口0
function Introduction(){

    
    //关于力同文章介绍
      ajax("get",port.artic,"12/p/1/s/10/type/2",function(date){
       console.log(date,22233)
       var bannerimg=string_arr(date[0].attachfiles)
        //渲染banenr图片
        var strbanner="";
        for(var i=0;i<bannerimg.length; i++) {
          strbanner+=`<div class="swiper-slide"><img class="res_banner_img" src="${imgapi+bannerimg[i]}" alt=""></div> `   
    }

      $("#abo_swiper0 .swiper-wrapper").html(strbanner)
      //实例化banner图
      //关于力同banner轮播
     // //console.log(abo_swiper0,"调用前")
      if(abo_swiper0 !=undefined){
        abo_swiper0.destroy();
       // //console.log("清楚了")
      }
      abo_swiper0=swiperbanner("abo_swiper0","#abo_swiper0")


      let data = [];
      date[0].articlecontent.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
        data.push(capture);
      });
      // console.log(data,"11111111111");
      data.map(item=>{
        // console.log(item,"111111111111111111111")
        let str = imgapi+item
        date[0].articlecontent = date[0].articlecontent.replace(item, str)
      })
       //渲染文字
      $(".abo_essay_con").html(date[0].articlecontent)
      

      })
}

//发展历程简介接口1
function development (){
  ajax("get",port.artic,"27/p/1/s/20/type/2",function(date){

    // 获取背景图
  var str="";
  var strtime="";
  var strimg='';
// //console.log(str)
  for(var i=0;i<date.length;i++){
   str+=`
   <div class="content_box2">            
     <p>${date[i].title}</p> 
     <div class="timer-p">${date[i].articlecontent}</div>   
   </div>
   `;
   strtime+=`
   <div class="swiper-slide">
    <div class="swiper_line_img_number">${date[i].title}</div>
   <div class="swiper_line_img">
     <img src="./img/abo/swiper_line.png" alt="">
   </div>
   </div>  
   `;
 }
 // //时间的具体内容
 $(".abo_taber-content_line").html(str)
 $(".content_box_line #swiper_line .swiper-wrapper").html(strtime);
 var swiper_line= new Swiper('#swiper_line', {
  //cssMode: true,是否可以滑动
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 5,
  spaceBetween: 0,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

 $(".content_box_line .swiper-wrapper .swiper-slide").eq(2).find("img").attr("src","./img/abo/swiper_line_active.png")
 $(".content_box_line .swiper-wrapper .swiper-slide").eq(2).find(".swiper_line_img_number").addClass("content_box_line_text")
 $(".abo_taber-content_line .content_box2").eq(2).show();
  //滚动切换
  $("#swiper_line .swiper-slide").click(function(){
    //console.log()
    var index=$(this).index()
    $(".content_box_line .swiper-wrapper .swiper-slide").find("img").attr("src","./img/abo/swiper_line.png")
    $(".content_box_line .swiper-wrapper .swiper-slide").find(".swiper_line_img_number").removeClass("content_box_line_text")
    $(".abo_taber-content_line .content_box2").hide();


    $(".content_box_line .swiper-wrapper .swiper-slide").eq(index).find("img").attr("src","./img/abo/swiper_line_active.png")
    $(".content_box_line .swiper-wrapper .swiper-slide").eq(index).find(".swiper_line_img_number").addClass("content_box_line_text")
    $(".abo_taber-content_line .content_box2").eq(index).show()

  })





 
  })



}





//公司分布接口03
function distribution(){
  ajax("get",port.artic,"28/p/1/s/10/type/2",function(date){
   console.log(date,"banner图")
    var str="";
    var strtitle="";
    for(var i=0; i<date.length;i++){
      str+=`
      <div class="add_${i} smaill-box">
        <img src="./img/abo/map-ico/0101.gif" alt="">
            <div class="map_nav_news1">
              <img src="./img/abo/map-ico/map_ico_box.png" alt="">
              <div class="map_text_box">
                  <div class="map_text_box_con">${date[i].articlecontent}</div>
                  <p class="map_text_box_name">${date[i].name}</p>
                </div>
            </div>
      </div>
      `
      strtitle+=`
      <div>
        ${date[i].articlecontent}
      </div>
      `
 
    }


    $(".map_nav").html(str);
    //2020-7-6暂时隐藏美国
    $(".map_nav").children('.add_1').css('display','none')
    //end
    $(".map-smil-box-img").html(strtitle);

   // //小图处理
   // var winwidth=$(window).width()
   // var indeximg=$(this).index()
   // if(winwidth < 1200){
   //   var ptext="<p>"+strtitle[indeximg]+"</p>";
  //
   // $(".map-smil-box-img").html(ptext)
   // }else{
   //   $(".map-smil-box-img").hide()
   // }




  // $('.map_nav>.smaill-box').click(function(){
  //   var winwidth=$(window).width()
  //   var indeximg=$(this).index()
  //   if(winwidth < 1200){
  //     var ptext="<p>"+strtitle[indeximg]+"</p>";
  //    // //console.log(ptext);
  //   $(".map-smil-box-img").html(ptext)
  //   }else{
  //     $(".map-smil-box-img").hide()
  //   }
  // })
  // 


  })
}






//资质荣耀接口04
function qualification (){
  ajax("get",port.artic,"129/p/1/s/10/type/2",function(date){
   // //console.log(date,777777)
    var strbanner="";

    for(var i=0;i<date.length;i++){
      strbanner+=`<div class="swiper-slide">
        <div class="swiper-img-box0">
          <img class="res_banner_img" src="${imgapi+date[i].articleimage}" alt="">
        </div>
        <div class="swiper-text-box0"><p class="swiper-text-box0-title">${date[i].title}</p>
              <div class="abo_swipe1_swiper_text-box">
                ${date[i].articlecontent} </div></div></div> `; 
    }
//公司资质banner和实例化
if(abo_swiper1 !=undefined){
  abo_swiper1.destroy();
 // //console.log("清楚了11")
}
  $("#abo_swiper1 .swiper-wrapper").html(strbanner);
  abo_swiper1=swiperbanner("abo_swiper1","#abo_swiper1")

})
//底部放大
swiperbanner_footer("abo_swiper2","#abo_swiper2","145")






  //行业荣誉证书
  ajax("get",port.artic,"131/p/1/s/10/type/2",function(date){
    //console.log(date,7777771111)
    var strbanner="";
    for(var i=0;i<date.length;i++){
      strbanner+=`<div class="swiper-slide">
        <div class="swiper-img-box0">
          <img class="res_banner_img" src="${imgapi+date[i].articleimage}" alt="">
        </div>
        <div class="swiper-text-box0"><p class="swiper-text-box0-title">${date[i].title}</p>
              <div class="abo_swipe1_swiper_text-box">
                ${date[i].articlecontent} </div></div></div> `;


    }
//公司资质banner和实例化
if(abo_swiper3 !=undefined){
  abo_swiper3.destroy();
  //console.log("清楚了33")
}
  $("#abo_swiper3 .swiper-wrapper").html(strbanner);
  abo_swiper3=swiperbanner("abo_swiper3","#abo_swiper3")
  })


  //底部放大
  swiperbanner_footer("abo_swiper4","#abo_swiper4","146")

}













//社会责任接口05
function  responsibility(){
  //社会责任
  ajax("get",port.artic,"30/p/1/s/10/type/2",function(date){
   // //console.log(date,"社会责任")
    var strbanner="";
    var strrightbanner="";
    for(var i=0;i<date.length;i++){
      strbanner+=`
      <div class="duty_box_con">
        <div>
          <img src="${imgapi+date[i].articleimage}" alt="">
        </div>
        <div class="text-boxp">
          ${date[i].articlecontent}
        </div>
      </div>`;
      strrightbanner+=`
      <li><img src="${imgapi+date[i].articleimage}" alt=""></li>
      `
    }
    $(".duty_box").html(strbanner);
    $(".duty_title-box .duty_title").html(strrightbanner);
//默认选中第一个
    $(".duty_box .duty_box_con").eq(0).addClass("active");
    $(".duty_title-box .duty_title li").eq(0).addClass("duty_title_active") ;
    var title_length=date.length;
   // //console.log(title_length,2222)
  // <!-- 社会责任 -->
  $(function(){

     taberone(".duty_title>li","duty_title_active",".duty_box .duty_box_con")

     var mmindex= 0;
     //上下按键
     $(".down-ico").click(function(){
      //var mmindex=  $(".duty_title").find("li .duty_title_active").index()  
      mmindex++;
      if(mmindex==title_length){
        mmindex=0
      }
      $(".duty_title>li").eq(mmindex).addClass("duty_title_active").siblings().removeClass("duty_title_active");
      $(".duty_box .duty_box_con").eq(mmindex).show().siblings().hide();

     })
     $(".up-ico").click(function(){
       mmindex--;
       if(mmindex==-1){
         mmindex=title_length-1;
       }
      // //console.log( mmindex)
       $(".duty_title>li").eq(mmindex).addClass("duty_title_active").siblings().removeClass("duty_title_active");
       $(".duty_box .duty_box_con").eq(mmindex).show().siblings().hide();
 
      })


  });



  })

}













  
  


})()