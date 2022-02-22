import {get} from "@/api/apiRoutes";

export const getUser = {
    namespaced: true,
    state: ()=>({
        user: JSON.parse(localStorage.getItem('user')) || null
    }),
    mutations:{
        setUser(state, value){
            state.user = value;
            localStorage.setItem('user', JSON.stringify(value))
        },
        deleteUser(state){
            state.user = null;
            localStorage.removeItem('user');
        },
    },
    getters:{
        userCanCreate(state){
            return state.user.is_company_employee
        },
        userCanAnswer(state){
            return state.user.is_contractor
        },
        userIsSuperUser(state){
            return state.user.is_superuser
        }
    },
    actions:{
        async getCurrentUser({commit}){
            return await get.getCurrentUser().then((res)=>{
                commit('setUser', res.data)
            })
        },
    }
}