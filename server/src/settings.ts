import { UserController } from "./controller/UserController";
import mongoose from 'mongoose';
require('dotenv').config();

// server settings 
export class Settings {
user=new UserController();
// contains dev and test cloud links
mongoConnection=[
{
   "name":"dev",
   "connection":"mongodb+srv://admin:123@cluster0.l6cgy.mongodb.net/blog?retryWrites=true&w=majority",
   "adminUser":{
      "username":"user",
      "password":"adminSamuel123"
   }
},
{
   "name":"test",
   "connection":"mongodb+srv://admin:123@cluster0.l6cgy.mongodb.net/blog-test?retryWrites=true&w=majority",
   "adminUser":{
      "username":"admintest",
      "password":"adminTest123"
   }
}
];
// live key if it exists in env file
liveKey = process.env.MONGO_KEY;
liveAdmin=process.env.ADMIN_USER;
livePass=process.env.ADMIN_PASSWORD;

// server env 
port=process.env.PORT_HOST;
apikey=process.env.API_KEY;
jwttoken=process.env.TOKEN_SECRET;

// change connection
changeConnection(param:String){
   var response="does not exist";
   for(var i=0; i<this.mongoConnection.length; i++){
      if(this.mongoConnection[i].name==param){
         response=this.connectMongo(this.mongoConnection[i]);
         
      }
   }
   return response
}
// connect to cloud
connectMongo(connectionJson:any,start:boolean=false){
   const user=connectionJson.adminUser.username;
   const pass=connectionJson.adminUser.password;
   if(start){
      mongoose.connect(connectionJson.connection, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true});
      mongoose.connection.on('open', () => {
         console.info("connect to "+connectionJson.name);
         console.info('Connected to Mongo.');
         console.info('http://localhost:8000/');
         // add admin user 
         this.user.addAdminUser(user,pass);
      });
      mongoose.connection.on('error', (err: any) => {
         console.error(err);
      });
   }else
   {
      mongoose.connection.close();
      mongoose.connect(connectionJson.connection, { useNewUrlParser: true, useFindAndModify: false,useUnifiedTopology: true});
      mongoose.connection.on('open', () => {
         console.info("connect to "+connectionJson.name);
         console.info('Connected to Mongo.');
         console.info('http://localhost:8000/');
         // add admin user 
         //this.user.addAdminUser(user,pass);
      });
      mongoose.connection.on('error', (err: any) => {
         console.error(err);
      });
      setTimeout(()=>{this.user.addAdminUser(user,pass)},10000);
      //debugger;

   }
   return "connected to "+connectionJson.name;
}

 // server startup
 startup(){
   // connect to live if deployed else connect to dev or test
   if(this.liveKey!=""||this.liveKey!=undefined){
      var connection:any={
         "name":"live",
         "connection":this.liveKey,
         "adminUser":{
            "username":this.liveAdmin,
            "password":this.livePass
         }
      };
      this.mongoConnection.push(connection);
      this.connectMongo(connection,true);
   }
   else{
      this.connectMongo(this.mongoConnection[0],true);
   }
 }
}