import {get} from "@/api/apiRoutes";

export const detectedResultList = {
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

        async getDetailedDetected({commit}, {id}){
            return await get.getDetailedDetected(id).then((res)=>{
                commit('setData', res.data)
            })
        }
    }
}