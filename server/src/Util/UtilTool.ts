export class UtilTool{
    // Create page listing per page 10 records per page
    public createPageList(itemsArr:any,page:number){
        page=page-1;
        var start =(page*10)-1;
        if(start==-1||start<-1){
            start=0;
        }
        var items=itemsArr.reverse();
        var output=[];
        for(var i=start; i<items.length; i++){
            if(output.length==10){
                break;
            }
            output.push(items[i]);
        }
        var pageLim=items.length/10;
        if(items.length<10){
            pageLim=1;
        }
        var checkDec=pageLim%1;
        if(checkDec!=0){
            pageLim=this.calculateLimit(pageLim);
        }
        var result={
            "total":items.length,
            "limit":pageLim,
            "output":output
            };
        return result;
    }
    private calculateLimit(page: number): number {
        var sum=1;
        var num=1;
        var cal=false;
        while(!cal){
            sum=num-page;
            if(1>sum&&sum>=0.1){
                break;
            }
            num++;
        }
        return num;
    }
    public getDate(){
        const date=new Date();
        const currentDate=  date.getMonth()+ "/" + (date.getDate()) + "/" + date.getFullYear();
        return currentDate;
    }
}