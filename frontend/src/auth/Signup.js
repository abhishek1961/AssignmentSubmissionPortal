import React,{useState,useEffect} from 'react'

import {Link,Redirect} from 'react-router-dom'

import {getAllSubjects,signup,addSubjectapi} from './helper/authapicall'

function Signup(){
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        role:0,
        subjects:[],
        error:'',
        success:false,
        loading:false,
        allSubjects:[],
        addSub:'',
        didRedirect:false,
        flag:0
    })

    const {name,email,password,role,subjects,error,success,allSubjects,addSub,didRedirect,flag}=values

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
           
      signup({name,email,password,role,subjects})
      .then(data=>{
        if(data.error){
          setValues({...values,error:data.error,success:false})
        }
        else{
          setValues({...values,name:"",email:"",password:"",error:"",role:0,subjects:[],success:true})
          setTimeout(()=>{setValues({...values,didRedirect:true})},500)
        }
      })
      .catch(console.log('error in sign un'))
    }

    const performRedirect=()=>{
      if(didRedirect){
        return <Redirect to='/'/>
      }
  }

   const loadSub=()=>{
    getAllSubjects().then(data=>{ 
      setValues({...values,allSubjects:data.subjects})
    })
   }

    useEffect(()=>{
      //get subjects
     
        loadSub(getAllSubjects())
     
      
  },[flag])

  const addSubject=event=>{
    event.preventDefault()
    addSubjectapi({name:addSub}).then(
      data=>{console.log(data)
        if(data.error){
          setValues({...values,role:1,error:data.error})
        }
        else{
          setValues({...values,addSub:'',role:1,flag:!flag})
        }
      }
    )
  }

    function signupForm(){
        return(
            <div className="row">
            <div className="col-12 text-left">
              <form>
                <div className="form-group my-2">
                  <label className="text-light">Name</label>
                  <input className="form-control" onChange={handleChange("name")} type="text" value={name}/>
                </div>
                <div className="form-group my-2">
                  <label className="text-light">Email</label>
                  <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
                </div>
    
                <div className="form-group my-2">
                  <label className="text-light">Password</label>
                  <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
                </div>

                <div className="form-group my-2">
                  <label className="text-light">Signup as</label>                  
                  <select className="form-control" onChange={handleChange("role")} value={role}>                    
                    <option value="0">Student</option>
                    <option value="1">Instructor</option>
                  </select>
                </div>

                {(()=>{
                  if(role==1){
                    return (
                      <>
                      <div className="form-group my-2">
                  <label className="text-light">Subjects</label><br/>                  
                  <select className='w-100' name="subjects"  multiple onChange={handleChange("subjects")}>
                  {allSubjects.map((subject,index)=>{
                      return(
                        <option key={index} value={subject._id}>{subject.name}</option>
                      )
                    })}                 
                  </select>
                  <p className='text-danger'>Press and Hold Ctrl to select multiple</p>
                </div>
                <div className="form-group my-2 d-flex">
                <input className="form-control" placeholder='Add New Subject' type="text" value={addSub} onChange={handleChange('addSub')}/>
                <button className='btn btn-success ml-2'  onClick={addSubject}><i className="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                </>
                    )
                  }
                })()}
                

                <button className="btn btn-success btn-block w-100" onClick={onSubmit}>Submit</button>
              </form>
              <Link className="float-right" to='/signin'>signin</Link>
            </div>
          </div>
        )
    }

    const successMessage=()=>{
      return(
        <div className='alert alert-success' style={{display:success ? '':'none'}}>
        New account created successfully
        
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
          <h3 className="text-light text-center mb-4">Sign up</h3>
            {successMessage()}
            {errorMessage()}
            {signupForm()}
            {performRedirect()}
          </div>
        </div>
    )
}

export default Signup