import * as express from 'express';
const router=express.Router();
const verifyAccess="";
router.post('/get-amiami',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    console.log(req.body);
    try{
        fetch("https://api.amiami.com/api/v1.0/items?pagemax=50&pagecnt=10&lang=eng&s_keywords=nendoroid&s_sortkey=preowned&s_st_condition_flg=1", {
        method: "GET",
        headers:{
            "x-user-key":"amiami_dev",
            "sec-fetch-mode":"cors"
        }
        })
        .then((response) => response.json())
        .then((result) => {
        resp.send(result);
        })
        .catch((error:any) => {
        });
        }catch(err){
        resp.send(err);
        }
});
module.exports = router;