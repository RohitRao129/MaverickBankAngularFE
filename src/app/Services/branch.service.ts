import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor() { }

  async getBranches(count: number){

    const url ="http://localhost:6767/branch/get";
    const data ={
      "count" : count
    }

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  
  async searchBranches(data: any){

    const url ="http://localhost:6767/branch/get";

    const config = { 'content-type': 'application/json' ,
        Authorization: `Bearer ${localStorage.getItem('jwt')}` 
    };

    return  await axios.post(url,data,{headers:config});

  }

  async addBranch(data : any){
      const url ="http://localhost:6767/branch/add";
      const config = { 'content-type': 'application/json' ,
      Authorization: `Bearer ${localStorage.getItem('jwt')}` 
  };
  return  await axios.post(url,data,{headers:config});
  }

  async deleteBranch(data:any){
    const url ="http://localhost:6767/branch/remove";
    const config ={
      'content-type':'application/json',
      Authorization : `Bearer ${localStorage.getItem('jwt')}`
    };

    return await axios.post(url, data,{headers:config});
  }
  
}
