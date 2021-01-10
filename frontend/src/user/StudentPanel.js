import React,{useState,useEffect} from 'react'
import Dashboard from './Dashboard'

import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth/helper/authapicall'


function StudentPanel(){
    return(
        <Dashboard title='Student Panel'>
        <h2 className='text-center'>Student Panel of Kraftshala’s Submission Portal</h2>
        </Dashboard>
    )
}

export default StudentPanel