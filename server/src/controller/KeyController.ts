const key=require('../model/key');
const random = require('random-string-generator');
import { Response, Request, response } from "express";
export class KeyController{

    constructor(){
        new key();
        new random();
    }
    async authoriseKey(key:string){
        
    }
    async addKey(req:Request,res:Response){
        const key=req.body.key;
        const perm=req.body.permision;
        try{
            const add=this.createKey(key,perm);
            if(add){
                res.status(200).send("created "+key);
            }
        }catch(err){
            res.status(500).send(err);
        }
    }

    async generateKey(req:Request,res:Response){
        const key=random(15);
        const perm=req.body.permision;
        try{
            const add=this.createKey(key,perm);
            if(add){
                res.status(200).send("created "+key);
            }
        }catch(err){
            res.status(500).send(err);
        }

    }
    async createKey(keyS:string,permision:boolean){
        var output="";
        try{
            const addKey=new key({key:keyS,adminPermision:permision});
            await addKey.save();
            if(addKey){
                output=keyS;
            }

        }catch(err){

        }
        return keyS;
    }


}