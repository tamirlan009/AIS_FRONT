import store from "@/store";
import {openStreetMap} from "@/api";
import {defaultApiInstance} from "@/api";

export const get = {
    getMapAddress(lat, lng){
        const url = 'reverse'
        return openStreetMap.get(url, {params:{format:'jsonv2', lat:lat, lon:lng}})
    },
    getCurrentUser(){
        const url = 'get/user'
        return defaultApiInstance.get(url, {headers:{'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userData')).access}})
    },
    getAllTasks(page, value){
        const url = 'get/task'
        return defaultApiInstance.get(url, {headers:{'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userData')).access},
            params:{page: page, value: value}})
    },
    getCountTask(){
        const url = 'get/counttask/'
        return defaultApiInstance.get(url, {headers:{'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userData')).access}})
    },
    getCategory(){
        const url = 'get/category/'
        return defaultApiInstance.get(url, {headers:{'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userData')).access}})
    },
    getRelatedUser(){
        const url = 'get/related_user'
        return defaultApiInstance.get(url, {headers:{'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userData')).access}})
    },
    getCurrentTask(id){
        const url = 'get/task/'+id
        return defaultApiInstance.get(url, {headers:{'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userData')).access}})
    },
    getDetectedList(){
        const url = 'get/detection/list'
        return defaultApiInstance.get(url, {headers:{'Authorization':'Bearer '+ JSON.parse(localStorage.getItem('userData')).access}})
    }

}

export const post = {
    getToken(username, password){
        const url = 'token/'
        const data = {username, password}
        return defaultApiInstance.post(url, data)
    },
    createOneTask(category, description, latitude, longitude, address, executor, leadTime, images){
        const url = 'post/create/task/'
        const form = new FormData();
        form.append('category', category)
        form.append('description', description)
        form.append('latitude', latitude)
        form.append('longitude', longitude)
        form.append('address', address)
        form.append('executor', executor)
        form.append('leadTime', leadTime)
        for(const image in images){
            form.append('images', images[image])
        }

        return defaultApiInstance.post(url, form, {
            headers:{'Authorization':'Bearer '+JSON.parse(localStorage.getItem('userData')).access, 'Content-Type': 'multipart/form-data'}
        })
    },

    createAnswer(taskId, description, images){
        const url = 'post/create/answer/'
        const form = new FormData();
        form.append('task', taskId)
        form.append('description', description)
        for(const image in images){
            form.append('images', images[image])
        }

        return defaultApiInstance.post(url, form, {
            headers:{'Authorization':'Bearer '+JSON.parse(localStorage.getItem('userData')).access, 'Content-Type': 'multipart/form-data'}
        })
    },

    runDetection(description, date, video){

        const url = 'post/rundetection'
        const form = new FormData();
        form.append('description', description)
        form.append('date', date)
        form.append('video', video, video.name)
        return defaultApiInstance.post(url, form, {
            headers:{'Authorization':'Bearer '+JSON.parse(localStorage.getItem('userData')).access},
            onUploadProgress:function (progressEvent){
                store.state.runDetection.uploadProgress=parseInt(
                    Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 )
                )
            }
        })
    }
}

export const put = {
    updateTask(id, data){
        const url = 'put/update/task/' + id
        return defaultApiInstance.put(url, data, {
            headers:{'Authorization':'Bearer '+JSON.parse(localStorage.getItem('userData')).access}
        })
    }
}












