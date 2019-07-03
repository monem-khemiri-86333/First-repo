artistRouter.delete('/:artistId',(req,res,next)=>{
    const sql=`UPDATE Artist SET is_currently_employed=0 WHERE id=${req.params.artistId}`;
    db.run(sql,(err)=>{
        if(err){
            next(err)
        }else{
            res.status(200)
        }
    })
})