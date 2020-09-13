const express=require("express");
var router=express.Router();
var pool=require("../pool");
router.get("/",(req,res)=>{
  var sql="SELECT * FROM `xz_index_product` where seq_recommended!=0 order by seq_recommended";
  pool.query(sql,[],(err,result)=>{
    // res.writeHead(200,{
    //   "Access-Control-Allow-Origin":"*"
    // });
    // res.write(JSON.stringify(result));
    // res.end();//发送
    res.send(result);
  })
})
module.exports=router;
//http://localhost:3000/index