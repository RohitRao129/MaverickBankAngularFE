import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  async Update(fullname:string,email :string,phonenumber:string,pan:string, address:string,pincode:string,dob:Date){

    const url = 'http://localhost:6767/user/update';
    const data = { 
                  "username":phonenumber,
                  "fullname":fullname,
                  "email":email,
                  "pan":pan,
                  "phonenumber":phonenumber,
                  "address":address,
                  "pincode":pincode,
                  "dob":dob
                };
    // Specifying headers in the config object
    const config = { 'content-type': 'application/json' ,
    Authorization: `Bearer ${localStorage.getItem('jwt')}`};
  
     return await axios.put(url,data, {headers: config})  ;
         
    }
  
    async chkUsername(username:string){
      const url = 'http://localhost:6767/check/username';
      const data = { 
                   "username":username
                  };
      // Specifying headers in the config object
      const config = { 'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    };
  
      return await axios.post(url,data, {headers: config})  ;
    }

    async LoadData(username :string){

      const url = 'http://localhost:6767/user/get';
      const data = { 
                    "username":username
                  };
      // Specifying headers in the config object
      const config = { 'content-type': 'application/json' ,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    };
    
       return await axios.post(url,data, {headers: config})  ;
           
      }
    
      async getEmployeeNAdmin(count:number,role:string){
        const url ="http://localhost:6767/user/getAll";
        const data ={
          "count" : count,
          "role" : role
        }
  
        const config = { 'content-type': 'application/json' ,
            Authorization: `Bearer ${localStorage.getItem('jwt')}` 
        };
  
        return  await axios.post(url,data,{headers:config});
      }

      async UpdateRole(username:any,role:any){
          const url ="http://localhost:6767/user/updateRole";
          const data ={
            "username" : username,
            "role" : role
          }
    
          const config = { 'content-type': 'application/json' ,
              Authorization: `Bearer ${localStorage.getItem('jwt')}` 
          };
    
          return  await axios.put(url,data,{headers:config});
      }

      async DeleteUser(username:any){
        const url ="http://localhost:6767/user/delete/adminOrEmployee";
          const data ={
            "username" : username
          }
    
          const config = { 'content-type': 'application/json' ,
              Authorization: `Bearer ${localStorage.getItem('jwt')}` 
          };
    
          return  await axios.post(url,data,{headers:config});
      }
}
