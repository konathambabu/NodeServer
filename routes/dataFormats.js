var express=require('express');
var router= express.Router();

router.get('/get-req-querystring',function(req, res, next){

    var name=req.query.name;
    var age=req.query.age;

    res.send('respone Name:'+name +' ..... Age: '+age);
});

router.post('/post-req-body', function(req,res,next){
    var name=req.body.name;
    var age=req.body.age;

    res.send('post req name :'+name +'- Age:'+age)
});

router.post('/post-req-pathparams/:name/:age', function(req,res,next){
var name=req.params.name;
var age= req.params.age;
res.send(name+' .............. '+age);
})

router.post('/post-req-headers', function(req,res,next){
    var name=req.headers.name;
    var age= req.headers.age;
    res.send(name+' ........test...... '+age);
    })

module.exports=router;