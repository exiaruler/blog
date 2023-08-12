import * as express from 'express';
const router=express.Router();
const verifyProject=require('./middleware/verifyProject');
const verifyLogin=require('./middleware/verifyLogin');

router.get('/get-prime',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    try{
        fetch("https://www.woolworths.com.au/apis/ui/product/275807/Stores?IncludeInStockStoreOnly=false&Max=5&Latitude=-33.8902408&Longitude=151.0122172", {
        method: "GET"
        })
        .then((response) => response.json())
        .then((result) => {
        console.log(result);
        resp.send(result);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
        }catch(err){
        resp.send(err);
        }
});
router.get('/get-woolies',(req: express.Request, resp: express.Response, next: express.NextFunction)=>{
    try{
        fetch("https://www.woolworths.com.au/apis/ui/settings", {
        method: "GET"
        })
        .then((response) => response.json())
        .then((result) => {
        console.log(express.response);
        resp.send(result);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
        }catch(err){
        resp.send(err);
        }
});

module.exports = router;