import React,{useState,useEffect,useRef} from 'react'
import Dashboard from './Dashboard'

import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth/helper/authapicall'
import {getUpcomingAssign,uploadSubmission} from './helper/apicall'


import { Modal,Button } from 'react-bootstrap';
import {API} from '../backenduri'



function UpcomingAssignments(){
    const modalRef = useRef();
    const [values,setValues]=useState({
        assignments:[],
        error:'',
        assignment:'',
        filename:'',
        formData:'',
        success:'',
        loading:false,
    })

    //modal var
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const {assignments,error,filename,assignment,formData,success,loading}=values

    const user=isAuthenticated()
   const loadUpcomingAssignments=()=>{
    getUpcomingAssign(user.userId,user.token).then(
            data=>{console.log(data)
                if(data.error){
                    setValues({...values,error:data.error})
                }
                else{
                    setValues({...values,error:'',assignments:data.assignments})
                }
            }
        )
    }

    const openSub=(assignment,filename)=>{
        setValues({...values,assignment:assignment,filename:filename,formData:new FormData()})
        setShow(true)
    }

    const handleChange=name=>event=>{
        const value=name==='pdfFile'? event.target.files[0]: ''
        formData.set(name,value)
        formData.set('assignment',assignment)

        setValues({...values,[name]:value})
        

    }

    const submitSol=()=>{
        //upload file
        console.log(formData)
        uploadSubmission(user.userId,user.token,formData).then(data=>{
            if(data.error){
                setValues({...values,assignment:'',filename:'',formData:'',error:data.error})
            }
            else{
                setValues({...values,assignment:'',filename:'',formData:'',success:data.message})
                
            }
            console.log(data)
            setShow(false)
        })
        
       
    }

    const closeSub=()=>{
        setValues({...values,assignment:'',filename:'',formData:''})
        setShow(false)
    }

    const viewUploadModal = () => {
        return (
           
               <>

                    <Modal ref={modalRef} show={show} onHide={handleClose}>
                            <Modal.Header >
                            <Modal.Title>Submit your File</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                
                                <h5>Upload File</h5>

                                <form>
                                
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
                                </form>

                            </Modal.Body>
                            <Modal.Footer>
                            <Button ref={modalRef} variant="secondary" onClick={closeSub}>
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

    const showUpcoming=()=>{
        return(
            <>
                <h4 className='text-center'>Upcoming Assignments</h4>
                <table className="table">
           
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Assignment File</th>                  
                    <th>Action</th>
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
                        <td><Button  className='btn-success' onClick={()=>openSub(assignment._id,assignment.filname)}>view/submit</Button></td>

                        </tr>
                        )
                })}
                </tbody>
            </table>
            </>
        )
    }


    useEffect(()=>{
        loadUpcomingAssignments()
    },[])

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
        <Dashboard title='Student Panel'>
            {successMessage()}
            {errorMessage()}
            {viewUploadModal()}  
            {showUpcoming()}
           
            
        </Dashboard>
    )
}

export default UpcomingAssignments