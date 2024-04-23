import axios from "axios";


const getToken = () => localStorage.getItem("token") || false;

const fetchRequest = axios.create({
    headers: {
        "content-type": "application/json"
    }
})

fetchRequest.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) config.headers['Authorization'] = 'Bearer ' + token;
        return config;
    },
    error => Promise.reject(error)
)

fetchRequest.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        window.location = '/login';
    }
});

export default fetchRequest;