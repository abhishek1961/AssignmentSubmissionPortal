import React,{useState,useEffect} from 'react'
import Dashboard from './Dashboard'

import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth/helper/authapicall'
import {getSubmissionI,getSubmissionS} from './helper/apicall'
import {API} from '../backenduri'



function StudentSubmissions(){

    const [values,setValues]=useState({
        submissions:[],
        error:'',
    })

    const {submissions,error}=values


    const user=isAuthenticated()
   const loadSubmission=()=>{
        getSubmissionS(user.userId,user.token).then(
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

    useEffect(()=>{
        loadSubmission()
    },[])

    const errorMessage=()=>{
        return(
          <div className='alert alert-danger' style={{display:error ? '':'none'}}>
          {error}
        </div>
        )
      }

    return(
        <Dashboard title='Student Panel'>
            {errorMessage()}
        <h4 className='text-center'>Past Submissions</h4>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assignment Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Submitted On(Data-Time)</th>
                    <th scope="col">Assignment File</th>
                    <th scope="col">Submitted File</th>
                    <th scope="col">Grade</th>                                     
                    

                    </tr>
                </thead>
                <tbody>
                {submissions.map((submission,index)=>{
                    return(
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{submission.assignment.name}</td>
                        <td>{submission.assignment.subject.name}</td>
                        <td>{submission.assignment.createdBy.name}</td>
                        <td>{new Date(submission.onTime).toLocaleString('en-GB', { timeZone: 'Asia/Calcutta' })}</td>
                        <td><a href={API+'/get-file/'+submission.assignment.filname} target='_blank'>
                            View Assignment
                            </a>
                        </td>
                        <td><a href={API+'/get-file/'+submission.filname} target='_blank'>
                            View Submission
                            </a>
                        </td>
                        <td>{submission.grade}</td>
                        

                        </tr>
                        )
                })}
                </tbody>
            </table>
        </Dashboard>
    )
}

export default StudentSubmissions