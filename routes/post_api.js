const express=require('express');
const jwt=require('jsonwebtoken');
const router=express.Router();
const authVerify=require('./verifyToken');
const Post=require('../model/Post');

router.get('/',authVerify,(req,res)=>
{
    const id=req.user; //to grab the _id from the auth_token available in the req. header (which will be returned by the authVerify)
    res.json({"msg":"ALERT !!! PRIVATE DATA!"})
})

router.get('/getData',(req,res)=>
{
    Post.find()
    .then((data)=>
    {
        if(data.length==0)
        {
            res.json({'msg':"NO DATA"});
        }
        else
        {
            res.json({'data':data , 'msg':"GOT IT"});
        }
    })
    .catch(err=>
        {
            res.json({'msg':"NO DATA"})
        });
});

router.post('/postData',(req,res)=>
{
    let postData=new Post(req.body);
    postData.save()
    .then((response)=>
    {
        res.json({'msg':"saved"})
    })
    .catch((err)=>
    {
        res.json({'msg':"err"})
    })
});

router.put('/update/:id',(req,res)=>
{
    const id=req.params.id;
    Post.updateOne({_id:id},{type:req.body.type})
    .then(data=>
        {
            if(data.n ==0)
            {
                res.json({"msg":"nothing",'data':data})
            }
            else
            {
                res.json({"msg":"updated",'data':data})
            }
        })
    .catch(err=>
        {
            res.json({'msg':"err",'err':err})
        })
})

router.delete('/delete/:id',(req,res)=>
{
    const id=req.params.id;
    Post.findById(id)
    .then(data=>
        {
            if(!data) 
            {
                res.json({'msg':"nothing to delete",'data':data})
            }
            else
            {
                data.deleteOne(()=>
                {
                    res.json({'msg':"deleted one",'data':data})
                })
            }
        })
    .catch(err=>
        {
            res.json({'msg':'err','err':err});
        })
})

module.exports = router;