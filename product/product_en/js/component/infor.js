//获得背景图
ajax("get",port.banner,139,function(date){
  //console.log(date)

  $(".box").css("background","url("+imgapi+date[0].bannerimage+")no-repeat")
  $('.box').css('background-size','100% ');
  if (screen.width < 768) {
    $(".box").css("background","url()")
    $(".box").css("background-color","#dbe2ff");
    $(".register-hint").css("color","#555");
  }
})
//提交数据
ajax("get",port.getcolum,116,function(date){
  var date=date[0].children;
 // console.log(date)
  var str="<option value='Please select product category'>Please select product category</option>";
  for(var i=0;i<date.length;i++){
    str+=`
    <option value="${date[i].name}">${date[i].name}</option>
    `
  }
  $(".form-control").html(str);
})
//点击提交数据
$(".but-box button").click(function(){
  console.log("点击了")
  //获得分类
  var fenlei=$(".form-control").find("option:selected").val();
  //姓名
  var name=$(".name-box input").val();
  //性别
  var sex=$('.sex-box input[name="sex"]:checked').val();
  //电话
  var phone=$(".phone-box input").val();
  //邮箱-
  var email=$(".email-box input").val();
  //公司
  var company1=$(".company-box input").val();
  //国家
  var region=$(".region-box input").val();
  //内容
  var for_con=$(".for-con .form-control").val();

  console.log(fenlei,name,sex,phone,email,company1,region,for_con)
  if(fenlei=="Please select product category"){
    $(".hint-con").html("Please select product category")
    $(".hint-con").css("color","red");
    
  }else{
    if(name=="" || sex=="" || phone=="" || email=="" || company1=="" || region=="" ||for_con==""){
      $(".hint-con").html("Enter complete information");
      $(".hint-con").css("color","red");
    }else{
      var str=`user_name/${name}/tel/${phone}/emali/${email}/
      sex/${sex}/company/${company1}/Country/${region}/
      classify/${fenlei}/liuyan/${for_con}
      `
      ajaxleave("get",str,function(date){
        console.log(date,"leave a message")
        if(date.msg=="Message Success"){
          $(".hint-con").html("Message Success");
          $(".hint-con").css("color","green");    
          $(".reg-msg-box input").val("");  
        }else{
          $(".hint-con").html("Message failed");
          $(".hint-con").css("color","red"); 
        }

      })


    }



  }


})