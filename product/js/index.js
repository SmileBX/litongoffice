(function(){







//渲染列表
  ajax("get",port.getcolum,7,function(date){

    //console.log(date,333)
  })


  //轮播图请求数据
  ajax("get",port.banner,117,function(date){
    //console.log(date,333)
    var str="";
    for(var i=0;i<date.length;i++){
      str+=`
      <div class="swiper-slide"><img class="banner-img" src="${imgapi+date[i].bannerimage}" alt=""></div>      
      `
    }
    $("#swiper1 .swiper-wrapper").html(str);
    //实例化banner图
    swiperbanner("swiper1","#swiper1")
  })

//视频播放
  //点击图片播放视频
  ajax("get",port.artic,"118/p/1/s/10/type/2",function(date){
    var date=date;
   // console.log(date)
    //渲染图片
    $(".video-img-box-left img").attr("src",imgapi+date[0].articleimage);
    $(".video-img-box-right img").attr("src",imgapi+date[1].articleimage);
  
  
    $('.video-img-box div').click(function(){
    var index=$(this).index();
  
     // console.log(date[index].attachfiles,121)
      var src=date[index].attachfiles;
      //console.log(src);
      $("#myModal video").attr("src",imgapi+src)
      $("#myModal video")[0].play()  ;  
  })
})
//核心芯片
productlist(119,".kernel-box-list0");
//明星终端
productlist(121,".kernel-box-list1");
//功放产品
productlist(122,".kernel-box-list2");

//<!-- 12 -->

function productlist( id,dateclass){

  ajax("get",port.product,id+"/p/1/s/5",function(date){
    console.log(date,66612)
    var str='';
    for(var i=0;i<date.length;i++){
       str+=`
      <li class="kernel-box-list-box">
        <a href="./chip_deta.html?id=${date[i].id}&sign=0">
          <div class="kernel-box-list-box-img"><img src="${imgapi+date[i].articleimage}" alt=""></div>
          <p>${date[i].title}</p>
          <p>${date[i].name}</p>
        </a>
      </li>   
      `
    }
    //console.log(str,"neirogn ")
    $(dateclass).html(str);
  })
}


//中间图片
ajax("get",port.banner,"120",function(date){
  //console.log(date)
  var str=`
  <a href="${date[0].banner_url}">
    <img src="${imgapi+date[0].bannerimage}" alt="">
  </a>
  `;
  $(".research-nav-box").html(str)
})


//底部导航
ajax("get",port.banner,"123",function(date){
  var str="";
  console.log(date,030)
  for(var i=0;i<date.length;i++){
    str+=`
    <li class="">
      <a href="${date[i].banner_url}" class="footer-list-box">
        <div class="footer-list-line"></div>
        <div class="footer-list-img footer-list-img0">
          <img src="${imgapi+date[i].bannerimage}" alt="">
        </div>
        <div>
          <p>${date[i].name}</p>
          <span>了解更多</span>
        </div>
      </a>
    </li>
    `
  }
  $(".footer-nav-box ul").html(str)
})







































})()