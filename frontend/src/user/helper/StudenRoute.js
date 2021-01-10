import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth/helper/authapicall'



// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function StudentRoute({ component:Component, ...rest }) {
   
    return (
      <Route
        {...rest}
        render={props =>
            isAuthenticated() && isAuthenticated().role===0 ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default StudentRoute