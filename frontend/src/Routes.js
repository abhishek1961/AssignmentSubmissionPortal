import React from 'react'
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import Signup from './auth/Signup'
import Signin from './auth/Signin'
// import Dashboard from './user/Dashboard'
import InstructorRoute from './user/helper/InstructorRoute'
import StudentPanel from './user/StudentPanel'
import InstructorPanel from './user/InstructorPanel'
import StudentRoute from './user/helper/StudenRoute'
import InstructorAssignments from './user/InstructorAssignments'
import AllSubmissions from './user/AllSubmissions'
import UpcomingAssignments from './user/UpcomingAssignments'
import StudentSubmissions from './user/StudentSubmissions'



function Routes(){

    return <Router>
        <Switch>
            <Route path='/' exact component={Signin} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/signup' exact component={Signup} />
            <InstructorRoute path='/instructor-dashboard' exact component={InstructorPanel} />
            <StudentRoute path='/student-dashboard' exact component={StudentPanel} />

            <InstructorRoute path='/instructor-dashboard/assignments' exact component={InstructorAssignments} />

            <InstructorRoute path='/instructor-dashboard/submissions' exact component={AllSubmissions} />

            <StudentRoute path='/student-dashboard/upcoming-submissions' exact component={UpcomingAssignments} />

            <StudentRoute path='/student-dashboard/submitted-submissions' exact component={StudentSubmissions} />



        </Switch>
    </Router>
}

export default Routes