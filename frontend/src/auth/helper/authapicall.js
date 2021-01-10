import {API} from '../../backenduri'
import jwt_decode from "jwt-decode"

export const getAllSubjects=()=>{
    return fetch(`${API}/getAllSubjects`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }

    }).then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>{console.log(err)})
}

export const signup=(user)=>{
    return fetch(`${API}/signup`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{console.log(err)})
}

export  const signin= user =>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const authenticate=(data,next)=>{
    if(typeof window!=="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const isAuthenticated=()=>{
    if(typeof window=="undefined"){
        return false
    }
    if(localStorage.getItem("jwt")){
        let jwt_obj=JSON.parse(localStorage.getItem("jwt"));
        // let token=jwt_obj.token;
        let decoded = jwt_decode(jwt_obj.token);
        
        return {userId:decoded._id,role:decoded.role,name:jwt_obj.user.name,email:jwt_obj.user.email,token:jwt_obj.token}
        
    }else{
        return false
    }
}

export const signout=next=>{
    if(typeof window!=="undefined"){
        localStorage.removeItem("jwt")
        next()

    }
}

export const addSubjectapi=(data)=>{
    return fetch(`${API}/subject/create`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{console.log(err)})
}
