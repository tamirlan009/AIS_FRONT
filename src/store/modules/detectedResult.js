import {get} from "@/api/apiRoutes";

export const detectedResult = {
    namespaced: true,
    state: ()=>({
        data: null,
    }),
    mutations:{
        setData(state, value){
            state.data = value;
        },
    },
    actions:{
        async getDetectResult({commit}){
            return await get.getDetectedList().then((res)=>{
                commit('setData', res.data)
            })
        }
    }
}