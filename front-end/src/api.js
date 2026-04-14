import axios from "axios";

const api = axios.create({baseURL: "https://localpro-iedn.onrender.com"});
// const api = axios.create({baseURL: "http://localhost:3000"});

api.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if(token){
        req.headers.authorization = token;
    }
    return req;
})

api.interceptors.response.use((res=>res),err=>{
    console.log("err",err.response.status)
    if(err.response.status === 401){
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(err);
})

export default api;
