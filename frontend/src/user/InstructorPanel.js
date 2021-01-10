import React,{useState,useEffect} from 'react'
import Dashboard from './Dashboard'

import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth/helper/authapicall'



function InstructorPanel(){
    return(
        <Dashboard title='Instructor Panel'>
        <h2 className='text-center'>Instructor Panel of Kraftshala’s Submission Portal</h2>
        </Dashboard>
    )
}

export default InstructorPanel