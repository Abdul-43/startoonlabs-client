import axios from "axios";

// let apiUrl = "http://localhost:8000/api"
let apiUrl = "https://startoon-labs-backend.vercel.app/api"

//SignUp function
const signup = async({data}) =>{
    try {
        let response = await axios.post(`${apiUrl}/signup`,data)
        return response.data.token
    } catch (error) {
        alert("try again later")       
    }
}

// Login Funtion
const login = async({data}) =>{
    try {
        let response = await axios.post(`${apiUrl}/login`,data)
        return response.data.token
    } catch (error) {
        alert("try again later")       
    }
}

//get user data
const getuserdata = async({token}) =>{
    try {
        let response = await axios.get(`${apiUrl}/get`,{
            headers:{
                "token":token 
            }
        })
        let details = response.data
        return details

    } catch (error) {
        alert("try again later")       
    }
}

export {signup, login, getuserdata}