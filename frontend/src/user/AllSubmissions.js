import React,{useState,useEffect} from 'react'
import Dashboard from './Dashboard'

import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth/helper/authapicall'
import {getSubmissionI,updateGrade} from './helper/apicall'
// import submission from '../../../backend/models/submission'
import {API} from '../backenduri'
import { Modal,Button } from 'react-bootstrap';


function AllSubmissions(){

    
    const [values,setValues]=useState({
        submissions:[],
        error:'',
        submission:'',
        success:'',
        loading:false,
        grade:''
    })

    

    //modal var
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const {submissions,error,grade,submission,success,loading}=values

    const user=isAuthenticated()
   const loadSubmission=()=>{
        getSubmissionI(user.userId,user.token).then(
            data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({...values,error:'',submissions:data.submissions})
                }
            }
        )
    }

    // 

    const openSub=(submission)=>{console.log(submission)
        setValues({...values,submission:submission})
        setShow(true)
    }

    const handleChange=name=>event=>{

        setValues({...values,[name]:event.target.value})
        

    }

    const submitSol=()=>{
        console.log(grade)
        if(grade>10 || grade<0){
            setValues({...values,error:'plese select value in between 0 to 10'})

        }
        
       else{
        updateGrade(user.userId,user.token,{id:submission,grade}).then(data=>{
            if(data.error){
                setValues({...values,submission:'',error:data.error})
            }
            else{
                setValues({...values,submission:'',success:data.message})
                
            }
            console.log(data)
            setShow(false)
        })
       }
        
       
    }

    const closeSub=()=>{
        setValues({...values,submission:'',formData:''})
        setShow(false)
    }

    const viewUploadModal = () => {
        return (
           
               <>

                    <Modal  show={show} onHide={handleClose}>
                            <Modal.Header >
                            <Modal.Title>Rate Submission out of 10</Modal.Title>
                            </Modal.Header>
                            
                            <Modal.Body>
                               
                            <form>
                            <div className="form-group">
                                <input
                                    onChange={handleChange("grade")}                                 
                                    className=" mb-3 wd-25cent"
                                    type="number"
                                    name="grade"
                                    placeholder="Add grde"
                                    min="0" max="10" 
                                    
                                />
                                </div>    
                            </form>   

                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={closeSub}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={submitSol}>
                                Upload Submission
                            </Button>
                        
                            </Modal.Footer>
                           
                        </Modal>
            </>
           
           
                
        )
    }
    // 

    useEffect(()=>{
        loadSubmission()
    },[success])

    const  submittedSub=()=>{
        return(
            <>
            <h4 className='text-center'>Submissions by students</h4>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Submitted By</th>
                    <th scope="col">Submitted On(Data-Time)</th>
                    <th scope="col">Assignment File</th>
                    <th scope="col">Submitted File</th>                    
                    <th scope="col" >Grade</th>
                    <th scope="col" >Action</th>

                    </tr>
                </thead>
                <tbody>
                {submissions.map((submission,index)=>{
                    return(
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{submission.assignment.name}</td>
                        <td>{submission.assignment.subject.name}</td>
                        <td>{submission.submittedBy.name}</td>
                        <td>{new Date(submission.onTime).toLocaleString('en-GB', { timeZone: 'Asia/Calcutta' })}</td>
                        <td>
                            <a href={API+'/get-file/'+submission.assignment.filname} target='_blank'>View Assignment</a>
                        </td>
                        <td>
                        <a href={API+'/get-file/'+submission.filname} target='_blank'>View Submission</a>
                         </td>
                        <td>{submission.grade}</td>
                        <td>
                        <Button  className='btn-success ml-3' onClick={()=>openSub(submission._id)}>Update</Button>
                        </td>

                        </tr>
                        )
                })}
                </tbody>
            </table>
            </>
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
            {submittedSub()}
            {viewUploadModal()}
        </Dashboard>
    )
}

export default AllSubmissions