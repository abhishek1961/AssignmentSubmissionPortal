import React,{useState,useEffect} from 'react'

import {Link,Redirect} from 'react-router-dom'

import {authenticate, signin,isAuthenticated} from './helper/authapicall'

function Signin(){
    const [values,setValues]=useState({
        
        email:'',
        password:'',        
        error:'',
        success:false,
        loading:false,
        didRedirect:false
    })

    const {email,password,error,success,loading,didRedirect}=values

    const handleChange=name=>event=>{
      if(name=='subjects'){
        let subjects = Array.from(event.target.selectedOptions, option => option.value);
        setValues({...values,error:false,subjects:subjects})
      }
      else{
        setValues({...values,error:false,[name]:event.target.value})
      }
      
      // console.log(values)
    }

    const onSubmit=event=>{
      event.preventDefault()
      setValues({...values,error:false,loading:true})
      
      signin({email,password})
      .then(data=>{
        if(data.error){
          setValues({...values,error:data.error,success:false})
        }
        else{
           
         
          authenticate(data,()=>{
            setValues({...values,email:"",password:"",error:"",success:true})
            setTimeout(()=>{setValues({...values,didRedirect:true})},500)
            

          })
        }
      })
      .catch(console.log('error in sign in'))
    }

   const performRedirect=()=>{
       if(didRedirect){console.log(didRedirect)
           if(isAuthenticated().role==1){
               return <Redirect to='/instructor-dashboard'/>
           }
           else if(isAuthenticated().role==0){
            return <Redirect to='/student-dashboard'/>
           }
           else{console.log('nahi mila')
            return <Redirect to='/'/>
            
           }
       }
   }

    useEffect(()=>{
        if(isAuthenticated()){console.log(isAuthenticated())
            setValues({...values,didRedirect:true})
        }
      
  },[])

    function signupForm(){
        return(
            <div className="row">
            <div className="col-12 text-left">
              <form>                
                <div className="form-group my-2">
                  <label className="text-light">Email</label>
                  <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
                </div>
    
                <div className="form-group my-2">
                  <label className="text-light">Password</label>
                  <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
                </div>

                
               
                

                <button className="btn btn-success btn-block w-100" onClick={onSubmit}>Submit</button>
              </form>
            </div>
          </div>
        )
    }

    const successMessage=()=>{
      return(
        <div className='alert alert-success' style={{display:success ? '':'none'}}>
        Sucessfully sign in        
      </div>
      )
    }

    const errorMessage=()=>{
      return(
        <div className='alert alert-danger' style={{display:error ? '':'none'}}>
        {error}
      </div>
      )
    }

    return(
        <div className='background-dark'>
          <div className='pt-5 container'>
          <h3 className="text-light text-center mb-4">Sign In</h3>
            {successMessage()}
            {errorMessage()}
            {signupForm()}
            {performRedirect()}
            <Link className='float-right' to='/signup'>Signup</Link>
          </div>
        </div>
    )
}

export default Signin