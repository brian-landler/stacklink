import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

// Interceptor will send the JWT token if one exists in localStorage

api.interceptors.request.use((config) => { 
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`        
    }
    return config
})

export default api