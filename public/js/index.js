ajax("get","/index").then(result=>{
  console.log(result);
  var [p1, p2, p3]=result;
  //1. 取出result数组中第一个商品对象
  //2. 将商品对象的每个属性，拼接到页面中一个商品的HTML片段中置顶位置。
  var html=`<div class="card border-0 flex-md-row box-shadow h-md-250">
    <div class="card-body d-flex flex-column align-items-start">
      <h5 class="d-inline-block mb-2">${p1.title}</h5>
      <h6 class="mb-5">
        <a class="text-dark" href="javascript:;">${p1.details}</a>
      </h6>
      <span class="text-primary">¥${p1.price.toFixed(2)}</span>
      <a class="btn btn-primary" href="${p1.href}">查看详情</a>
    </div>
    <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="${p1.pic}" data-holder-rendered="true">
  </div>`
  //3. 将拼好的HTML片段一股脑的放入<div id="p1">的内容中
  document.getElementById("p1").innerHTML=html;

  var html=`<div class="card border-0 flex-md-row box-shadow h-md-250">
    <div class="card-body d-flex flex-column align-items-start">
      <h5 class="d-inline-block mb-2">${p2.title}</h5>
      <h6 class="mb-5">
        <a class="text-dark" href="javascript:;">${p2.details}</a>
      </h6>
      <span class="text-primary">¥${p2.price.toFixed(2)}</span>
      <a class="btn btn-primary" href="${p2.href}">查看详情</a>
    </div>
    <img class="card-img-right flex-auto d-none d-md-block mt-5" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="${p2.pic}" data-holder-rendered="true">
  </div>`;
  document.getElementById("p2").innerHTML=html;

  var html=`<div class="card border-0 flex-md-row box-shadow h-md-250">
    <div class="card-body d-flex flex-column align-items-start">
      <h5 class="d-inline-block mb-3">${p3.title}</h5>
      <span class="text-primary">¥${p3.price.toFixed(2)}</span>
      <a class="btn btn-primary" href="${p3.href}">查看详情</a>
    </div>
    <img class="card-img-right flex-auto d-none d-md-block mt-5" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="${p3.pic}" data-holder-rendered="true">
  </div>`;
  document.getElementById("p3").innerHTML=html;

  //1. 从result中截取出后三个商品
  var others=result.slice(3);
  console.log(others);
  //2. 定义一个空的html
  var html=``;
  //3. 遍历others数组中每个商品对象
  for(var p of others){
    //每遍历一个商品就向html中添加一段HTML片段，并用当前商品对象p中每个属性，填充html片段中置顶位置
    html+=`<div class="col-md-4 p-0 pl-2">
      <div class="card border-0 text-center">
        <img class="card-img-top" src="${p.pic}" alt="Card image cap">
        <div class="card-body p-0 pr-1 pl-1">
          <span class="d-inline-block">${p.title}</span>
          <span class="text-primary small">¥${p.price.toFixed(2)}</span>
          <a class="btn btn-sm btn-primary" href="${p.href}">查看详情</a>
        </div>
      </div>
    </div>`;
  }
  console.log(html);
  //将拼好的HTML片段填充回id为others的div中
  document.getElementById("others").innerHTML=html;
})