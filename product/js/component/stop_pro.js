//渲染列表


ajax("get",port.artic,"136/p/1/s/10/type/2",function(date){
  console.log(date,66)
  var str="";
  for(var i=0;i<date.length;i++){
    str+=`
    <div class="stop-item">
      <p class="stop-item-title"> 
        ${date[i].title}
      </p>
      <div class="stop-item-tab">
        ${date[i].articlecontent}

      </div>
  </div>
    `
  }
  $('.stop-box-con').html(str)


})
