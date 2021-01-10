import {API} from '../../backenduri'



//get pdf file

/*
*Instructor's call
*/
//get instructor's subject
export const getSubjects=(userId,token)=>{
    return fetch(`${API}/getSubjects/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization: `${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

// create assignment
export const createAssignment=(userId,token,assignment)=>{
    return fetch(`${API}/assignment/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            Authorization: `${token}`
        },
        body:assignment
    })
    .then(response=>{return response.json()})
    .catch(err=>console.log(err))
}

//get instructor assignment
export const getInstructorAssign=(userId,token)=>{
    return fetch(`${API}/assignment-instructor/get/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization: `${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//get submisson on Instructor's assignments
export const getSubmissionI=(userId,token)=>{
    return fetch(`${API}/submissions-instructor/get/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization: `${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

/*
*Student's call
*/

//upcoming assign
export const getUpcomingAssign=(userId,token)=>{
    return fetch(`${API}/assignment/get-upcoming/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization: `${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

//submitted assignment
export const getSubmissionS=(userId,token)=>{
    return fetch(`${API}/submission-student/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization: `${token}`
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}


// create assignment
export const uploadSubmission=(userId,token,data)=>{
    return fetch(`${API}/submission/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            Authorization: `${token}`
        },
        body:data
    })
    .then(response=>{return response.json()})
    .catch(err=>console.log(err))
}

export const updateGrade=(userId,token,data)=>{
    return fetch(`${API}/update-grade/${userId}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization: `${token}`
        },
        body:JSON.stringify(data)
    })
    .then(response=>{return response.json()})
    .catch(err=>console.log(err))
}