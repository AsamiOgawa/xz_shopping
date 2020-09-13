//获得地址栏中查询字符串中lid参数的值
var lid=location.search.split("=")[1];
console.log(lid);
//向/details接口发送get请求同时携带参数lid
ajax("get","/details",`lid=${lid}`)
.then(result=>{
   console.log(result);
   //从result中解构出product、specs、pics
   var {product,specs,pics}=result;
   /*先填充右上角详细信息部分*/ 
   var firstH6=document.querySelector("#details>h6:nth-child(1)");
   firstH6.innerHTML=product.title;
   firstH6.nextElementSibling //下一个h6
          .firstElementChild  //下一个h6下的a
          .innerHTML=product.subtitle;
   //查找作为#details下的第三个孩子的div
   var div=document.querySelector("#details>div:nth-child(3)");
   div.firstElementChild
      .children[1]
      .innerHTML=`¥${product.price.toFixed(2)}`;
   div.children[1]
      .children[1]
      .innerHTML=product.promise;

   /*填充右侧规格列表: */
   var html=``;
   for(var sp of specs){
      html+=`<a class="btn btn-sm btn-outline-secondary ${sp.lid==lid?'active':''}" href="product_details.html?lid=${sp.lid}">${sp.spec}</a>`
   }
   document.querySelector("#details>div:nth-child(5)>div:nth-child(2)").innerHTML=html;

   /*填充下方的商品配置的详情*/
   var html=`<li class="float-left mb-2"><a class="text-muted small" href="#">商品名称：${product.lname}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">系统：${product.os}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">内存容量：${product.memory}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">分辨率：${product.resolution}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">显卡型号：${product.vedio_card}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">处理器：${product.cpu}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">显存容量：${product.video_memory}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">分类：${product.category}</a></li>
   <li class="float-left mb-2"><a class="text-muted small" href="#">硬盘容量:${product.disk}</a></li>`;
   document.querySelector("#params>div>div>div>ul")
           .innerHTML=html;

   document.querySelector("#params>div>div")
           .children[5]
           .innerHTML=product.details;

   /**********实现放大镜效果************/
   /*下方小图片列表的显示和移动*/
   var html=``;
   for(var p of pics){
      html+=`<li class="float-left p-1">
         <img src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}">
      </li>`
   }
   var LIWIDTH=62;
   var div=document.querySelector("#preview>div>div:last-child");
   var ulImgs=div.getElementsByTagName("ul")[0];
   ulImgs.innerHTML=html;
   ulImgs.style.width=LIWIDTH*pics.length+"px";

   var times=0; //记录ul左移的次数
   var btnLeft=div.firstElementChild;
   var btnRight=div.lastElementChild;
   //当图片总张数<=4张时，btnRight要添加禁用的样式
   // if(pics.length<=4){
   //    btnRight.className+=" disabled";
   // }
   console.log(btnLeft.classList); //HTML5 标准
   console.log(btnRight.classList); //HTML5 标准
   pics.length<=4&&//(btnRight.className+=" disabled");
                   btnRight.classList.add("disabled");
   //如果&&前条件成立，才有必要执行&&后的表达式
   //如果&&前条件不成立，则没必要执行&&后的表达式
   btnLeft.onclick=function(){
      if(times>0){
         times--;
         ulImgs.style.marginLeft=-times*LIWIDTH+"px";
         //只要能点一次左边按钮则右边按钮一定是启用的
         // btnRight.className=
         //    btnRight.className.replace("disabled","");
         btnRight.classList.remove("disabled");
         //如果本次点完左边按钮后，左移次数为0，则左边按钮禁用
         // if(times==0){
         //    btnLeft.className+=" disabled";
         // }
         times==0&&//(btnLeft.className+=" disabled");
                   btnLeft.classList.add("disabled");
      }
   }
   btnRight.onclick=function(){
      //右边按钮最多点击次数: 总图片数-4
      var max=pics.length-4;
      //只有右边按钮点击次数<最多点击次数时，才能点击
      if(times<max){
         times++;
         ulImgs.style.marginLeft=-times*LIWIDTH+"px";
         //只要能点一次右侧按钮，则左侧按钮一定启用的
         // btnLeft.className=
         //    btnLeft.className.replace("disabled","");
         btnLeft.classList.remove("disabled");
         //如果本次点完之后总图片张数-左移次数，刚好等于4，说明不能再左移，就要给右侧按钮加class disabled禁用
         // if(pics.length-times==4){
         //    btnRight.className+=" disabled";
         // }
         pics.length-times==4&&//(btnRight.className+=" disabled");
                     btnRight.classList.add("disabled")
      }
   }

   /*鼠标进入小图片，切换上方中图片*/
   //先查找中图片img元素和大图片div
   var mImg=document.querySelector("#preview>div>img");
   var divLg=document.getElementById("div-lg");
   //DOM 4步
   //1. 查找触发事件的元素
   //本例中: 因为多个平级的img都可鼠标进入，所以，应该用事件委托优化，所以事件应该只绑定在父元素上一份即可
   ulImgs
   //2. 绑定事件处理函数
   //本例中: 鼠标进入小图片，切换中图片，所以应该绑定mouseover事件
   .onmouseover=function(e){
      //1. e.target代替this
      var target=e.target;
      //2. 只允许img元素触发事件
      if(target.nodeName==="IMG"){
         //3. 查找要修改的元素
         //已经提前找到mImg了
         //4. 修改元素
         //本例中: 修改中图片的src属性为当前鼠标进入的小图片上提前缓存的对应的中图片的路径
         mImg.src=target.getAttribute("data-md");
         divLg.style.backgroundImage=`url(${target.getAttribute("data-lg")})`
      }
   }

   //先查找id为mask的半透明遮罩方块和上方id为super-mask的保护层div
   var sMask=document.getElementById("super-mask");
   var mask=document.getElementById("mask");

   /**************放大镜*******************/
   /*1. 鼠标进入最上层的保护层div，显示半透明遮罩方块，还要同时显示右侧大图片*/
   sMask.onmouseover=function(){
      mask.className=mask.className.replace("d-none","");
      divLg.className=divLg.className.replace("d-none","");
   }
   sMask.onmouseout=function(){
      mask.className+=" d-none";
      divLg.className+=" d-none";
   }
   /*2. 鼠标在中图片中移动，半透明方块跟随鼠标一同移动，且右侧大图片的背景位置随鼠标位置移动而移动*/
   sMask.onmousemove=function(e){
      var left=e.offsetX-88;
      var top=e.offsetY-88;
      if(left<0){left=0}else if(left>176){left=176};
      if(top<0){top=0}else if(top>176){top=176};
      mask.style.left=left+"px";
      mask.style.top=top+"px";
      divLg.style.backgroundPosition=`${-left*16/7}px ${-top*16/7}px`
   }
})