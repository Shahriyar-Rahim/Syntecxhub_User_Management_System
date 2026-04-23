import axios from "axios";

const axiosInstaance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/users',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
});

axiosInstaance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
});

export default axiosInstaance;