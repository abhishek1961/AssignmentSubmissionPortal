import React,{useState,useEffect} from 'react'
import {isAuthenticated,signout} from '../auth/helper/authapicall'
import {Link,withRouter} from 'react-router-dom'

function currentTab(history,path){
    if(history.location.pathname===path){
        return {color:"#gray"}
    }
    else{
        return {color:"black"}
    }
}

function Dashboard({title='Dashboard',children,history}){
    return(
        <div className=''>
         <nav className="navbar  navbar-light bg-dark p-3">
         <Link className='navbar-brand text-white' to='/'>{title}</Link>

            {/* <a className="navbar-brand" href="#">{title}</a> */}
           
            <div className="float-right" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                {isAuthenticated() &&(
                    <li className='nav-item float-right'>
                         <span  className='nav-link text-white'
                         onClick={()=>{
                             signout(()=>{
                                 history.push('/')
                             })
                         }} >Signout</span>
                    </li>
                )}
                </div>
            </div>
        </nav>
        <div className='d-flex'>
            <div className='wd-15cent'>
            <ul className='nav nav-tabs bg-light ht-full right-boxS'>
                 
                
                {isAuthenticated() && isAuthenticated().role===0 && (
                     <li className='nav-item'>
                        <Link style={currentTab(history,'/student-dashboard/upcoming-submissions')} className='nav-link' to='/student-dashboard/upcoming-submissions'>upcoming Submissions</Link>
                        <Link style={currentTab(history,'/student-dashboard/submitted-submissions')} className='nav-link' to='/student-dashboard/submitted-submissions'>Submitted Submission</Link>
                     
                 </li>
                )}
                 {isAuthenticated() && isAuthenticated().role===1 && (
                     <li className='nav-item'>                         
                        <Link style={currentTab(history,'/instructor-dashboard/assignments')} className='nav-link' to='/instructor-dashboard/assignments'>Assignments</Link>
                        <Link style={currentTab(history,'/instructor-dashboard/submissions')} className='nav-link' to='/instructor-dashboard/submissions'>Submissions</Link>
                     
                 </li>
                 )}
                 
                
                 
             </ul>
            </div>
            <div className='wd-85cent pt-5'>
                {children}
            </div>
        </div>
        </div>
    )
}

export default withRouter(Dashboard)