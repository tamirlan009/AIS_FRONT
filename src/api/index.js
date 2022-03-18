import axios from "axios";
import store from "@/store";


const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': '',
}

const defaultUrl = 'http://127.0.0.1:8000/api/v1/'

export const defaultApiInstance = axios.create({
    baseURL: defaultUrl,
    headers: defaultHeaders
})


defaultApiInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    if(error.response.status === 401 && !store.getters["authenticate/isAuthenticated"]){
        localStorage.removeItem('userData')
    }
    if (error.response.status === 401 && store.getters["authenticate/isAuthenticated"]){
        localStorage.removeItem('userData')
        location.reload()
    }
    return Promise.reject(error);
});



const openStreetMapUrl = 'https://nominatim.openstreetmap.org/'

export const openStreetMap = axios.create({
    baseURL: openStreetMapUrl
})

