import {get} from "@/api/apiRoutes";

export const tasksView = {
    namespaced: true,
    state: () => ({
        countTask:null,
        result: null,
    }),
    mutations:{
        setResult(state, value){
            state.result = value;
        },
        setCountTask(state, value){
            state.countTask = value
        }
    },
    actions:{
        async getCurrentUser({commit}){
            return await get.getAllTasks().then((res)=>{
                commit('setResult', res.data.results)
                commit('setCountTask', res.data.count)
            })
        },
    },
}