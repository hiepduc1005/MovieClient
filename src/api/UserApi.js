import axios from './axiosCustomize.js'

const getAuthenticatedUser = (token) => {
    return axios.get("api/v1/user/me",{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export {getAuthenticatedUser}