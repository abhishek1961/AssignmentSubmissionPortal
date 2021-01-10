import React,{useState,useEffect} from 'react'
import Dashboard from './Dashboard'

import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth/helper/authapicall'
import {getSubjects,createAssignment,getInstructorAssign} from './helper/apicall'
import { Modal,Button } from 'react-bootstrap';
import {API} from '../backenduri'




function InstructorAssignments(){

    const [values,setValues]=useState({
        subjects:[],
        name:'',
        subject:'',
        deadline:'',
        error:'',
        formData:{},
        success:'',
        loading:false,
        assignments:[]
    })

    const {name,subjects,deadline,subject,error,success,loading,formData,assignments}=values
    const user=isAuthenticated()

    const handleChange=name=>event=>{
        const value=name==='pdfFile'? event.target.files[0]: event.target.value
        
        if(name==='deadline'){
            var valueT=value+'T23:59:59+05:30'
            formData.set(name,valueT)
        }else{
            formData.set(name,value)
        }
        

        
        setValues({...values,[name]:value})

        

    }
    const onSubmit=event=>{
        event.preventDefault()
      setValues({...values,error:'',loading:true})
      createAssignment(user.userId,user.token,formData).then(data=>{
        if(data.error){
            setValues({...values,error:data.error,name:'',deadline:'',subject:'',loading:false})
          }
        else{
            setValues({...values,name:'',deadline:'',subject:'',loading:false,success:data.message    
        })
        }
      })
    }

    const loadSubject=()=>{
        getSubjects(user.userId,user.token).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{console.log(data.subjects)
                setValues({...values,subjects:data.subjects,formData:new FormData()})
                loadAssignments()
            }
        })

        

    }
    const loadAssignments=()=>{
        getInstructorAssign(user.userId,user.token).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,assignments:data.assignments})
                
            }
        })
    }
    useEffect(()=>{
        loadSubject()
       
        
    },[])

   const addAssignment=()=>{
    return(
        
        <form >
          <h4 className='text-center'>Add Assignment</h4>
          <div className="form-group">            
              <input
                onChange={handleChange("pdfFile")}
                className=" mb-3"
                type="file"
                name="pdfFile"
                accept="pdf"
                placeholder="upload PDF"
              />            
          </div>
          <div className="form-group">
            <input
              type='text'
              onChange={handleChange("name")}
              name="name"
              className="form-control mb-3"
              placeholder="Name"
              value={name}
            />
          </div>
          
         
         <div className="form-group">
            <input
              type="date"
              onChange={handleChange("deadline")}
              name="deadline"
              className="form-control mb-3"
              placeholder="Deadline"
              value={deadline}
            />
          </div>
        
          <div className="form-group">
            <select
              onChange={handleChange("subject")}
              className="form-control mb-3"
              placeholder="Subject"
            >
              <option>Select</option>
              {subjects &&
                subjects.map((subject,index)=>{
                  return(
                    <option key={index} value={subject._id}>{subject.name}</option>
                  )
                })
              }
              
            </select>
          </div>
         
          
          <Button type="submit" onClick={onSubmit} className="btn btn-success">
            Add Assignment
          </Button>
        </form>
    )

   }

   

   const assignmentList=()=>{
    return(
      <div>
        <h4 className='text-center'>Assignments List</h4>
        <table className="table">
           
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Assignment File</th>                  
                   
                    </tr>
                </thead>
                <tbody>
                {assignments.map((assignment,index)=>{
                    return(
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{assignment.name}</td>
                        <td>{assignment.subject.name}</td>
                        <td>{new Date(assignment.deadline).toLocaleString('en-GB', { timeZone: 'Asia/Calcutta' })}</td>
                        <td>
                          <a href={API+'/get-file/'+assignment.filname} target='_blank'>View Assignment</a>
                        </td>
                        

                        </tr>
                        )
                })}
                </tbody>
            </table>
      </div>
        
    )

   }

   const successMessage=()=>(
    <div className='alert alert-success' style={{display:success ? '':'none'}}>
        {success}</div>
        
  )
  const errorMessage=()=>{
    return(
      <div className='alert alert-danger' style={{display:error ? '':'none'}}>
      {error}
    </div>
    )
  }
    return(
        <Dashboard title='Instructor Panel'>
          {successMessage()}
          {errorMessage()}
         {addAssignment()}
         {assignmentList()}
        </Dashboard>
    )
}

export default InstructorAssignments