$(".nav-input-box .nav-input1").focus();
//点击搜索
$(".nav-input-box .nav-search").click(function(){

  var msg=$(".nav-input1").val();
  list(msg) ;
  $(".nav-input1").val("");

})
//回车搜索
$(document).keydown(function(event){
             if(event.keyCode==13){
              var msg=$(".nav-input1").val();
              console.log(msg,22)
              list(msg) ;
              $(".nav-input1").val("");
      }

})


function list(name){
 
  ajaxlist("get",port.product,name+"/p/1/s/1000",function(date){
    $(".list-box-con1").html("");
    console.log(date)
    if(date.msg=="查询信息不存在"){
      console.log("没有哈哈")
      str=`
      <p>查询信息不存在</p>
      `
      $(".list-box-con1").html(str)
    }else{
      var date=date.date;
      var str="";
    for(var i=0;i<date.length;i++){
      str+=`
      <li>
        <a href="./chip_deta.html?id=${date[i].id}&sign=0">
          <div class="list-box-img">
            <img src="${imgapi+date[i].articleimage}" alt="${date[i].name}">
          </div>
          <div class="list-box-type">
            <p>${date[i].name}</p>
            <p>${date[i].abstract}</p>
          </div>
        </a>
      
      </li>
      `
    };
    $(".list-box-con1").html(str)
    


    }
  })


 

}