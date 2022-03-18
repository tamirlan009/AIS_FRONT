import {get} from "@/api/apiRoutes";

export const detectedResult = {
    namespaced: true,
    state: ()=>({
        data: null,
    }),
    mutations:{
        setData(state, value){
            console.log(value)
            state.data = value;
        },
        deleteData(state, value){
            state.data = state.data.filter(d => d.id !== value)
        }
    },
    actions:{
        async getDetectResult({commit}){
            return await get.getDetectedList().then((res)=>{
                commit('setData', res.data)
            })
        }
    }
}