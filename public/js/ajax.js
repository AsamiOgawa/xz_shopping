//专门负责发送ajax请求的函数
//type: 请求类型, 包括get或post
//url: 要请求的服务器端接口地址
//data: 要发送到服务器端的参数值
function ajax(type,url,data){
  return new Promise(resolve=>{
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4){
        var result=JSON.parse(xhr.responseText);
        resolve(result);
      }
    }
    if(type=="get"&&data!==undefined){
      url+=`?${data}`
    }
    xhr.open(type,url,true);
    xhr.send();
  })
}