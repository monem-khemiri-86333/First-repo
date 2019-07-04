const express=require('express')
//open migration.js
db.serialize(()=>{
    db.run('DROP TABLE IF NOT EXISTS Series');
    db.run('CREATE TABLE Series(id INTEGER PRIMARY KEY,name TEXT ,description TEXT')

})
//create series.js in /api directory
//open series.js
const seriesRouter=express.Router()
const sqlite3=require('sqlite3')
const db=new sqlite3.Database(process.env.DATABASE||../migration.js)



seriesRouter.param('seriesId',(req,res,next,seriesId)=>{
    db.get('SELECT * FROM Series WHERE id=$seriesId',{$seriesId:seriesId},(err,row)=>{
        if(err){
          next(err)}  
        else if(row){
            req.series=row
            next()
        }
        else{
            res.status(404)send()
        }
    })
})
seriesRouter.get('/',(req,res,next)=>{
    db.all('SELECT * FROM Series',(err,rows)={
        if(err){
            next(err)
        }else{
            res.status(200).json({series:rows})
        }
    })
})
seriesRouter.get('/:seriesId',(req,res,next)=>{
   
        res.status(200).json({series:req.series})
    })
})

seriesRouter.post('/',(req,res,next)={
    const name=req.body.series.name;
    const description=req.body.series.description;
    if(!name||!description){
        res.status(400).send()
    }
    else{
        db.run('INSERT INTO Series(name,description) VALUES'+
        '($name,$descriptiion)',{$name:name,$description:description},(err){
            if(err){
                next(err)
            }
            else{
                db.get(`SELECT * FROM Series WHERE id=this.lastID`,(err,row){
                  res.status(201).json({series:row})  
                })
            }
        })
    }
})



module.exports=seriesRouter
//open api.js and write seriesRouter=require(./series.js)