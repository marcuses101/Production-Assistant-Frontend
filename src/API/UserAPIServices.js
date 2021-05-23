import {config} from '../config'
const {SERVER} = config

export const UserAPIServices = {
 async addUser({username,password}){
    const response = await fetch(`${SERVER}/user`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username,password})
    })
    const user = await response.json();
    console.log(user);
    if (!response.ok) throw new Error(user.error.message);
    return user;
  },
  async login({username,password}){
    const response = await fetch(`${SERVER}/user/login`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username,password})
    })
    const data = await response.json();
    if (!response.ok) throw data?.error?.message;
    return data;
  },
}

