import {get} from "@/api/apiRoutes";

export const taskCard = {
    namespaced: true,
    state: () => ({
        data:null,
        markerLatLng: {
            lat:null,
            lng:null
        },
        imgGrid: {
            'lg:col-6': false,
        },

    }),
    mutations:{
        setData(state, value){
            state.markerLatLng.lat = value.latitude;
            state.markerLatLng.lng = value.longitude;
            if(value.images.length>1){
                  state.imgGrid["lg:col-6"]=true
            }else {
                state.imgGrid["lg:col-6"]=false
            }
            state.data = value
        },
    },
    actions:{
        async getCurrentTask({commit},{id}){
            return await get.getCurrentTask(id).then((res)=>{
                commit('setData', res.data)
            })
        },


    },
}