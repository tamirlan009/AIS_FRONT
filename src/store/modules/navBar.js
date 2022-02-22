import {get} from '@/api/apiRoutes'

export const navBar = {
    namespaced: true,
    state: () => ({
        currentUser: null,
    }),
    mutations:{
        setCurrentUser(state, value){
            state.currentUser = value;
        },
    },
    actions:{
        async getCurrentUser({commit}){
            return await get.getCurrentUser().then((res)=>{
                commit('setCurrentUser', res.data)
            })
        },
    },
}