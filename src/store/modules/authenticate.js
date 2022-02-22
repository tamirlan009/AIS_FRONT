import {post} from "@/api/apiRoutes"


export const authenticate = {
    namespaced: true,
    state: () => ({
        userData:  JSON.parse(localStorage.getItem('userData')) || null,
        // token : localStorage.getItem('token') || null,
        errorAuth: false
    }),
    mutations:{

        setUser(state, value){
            state.userData = value;
            localStorage.setItem('userData', JSON.stringify(value))
        },
        deleteUser(state){
            state.userData = null;
            localStorage.removeItem('userData');
        },
        setAuth(state, value){
            state.errorAuth=value
        }
    },
    getters:{
        userCanCreate(state){
            if (state.userData){
                return state.userData.user.is_company_employee
            }
            else return false

        },
        userCanAnswer(state){
            if (state.userData){
                return state.userData.user.is_contractor
            }
            else return false

        },
        userIsSuperUser(state){
            if (state.userData){
                return state.userData.user.is_superuser
            }
            else return false

        }
    },
    actions:{
        login({commit}, {username, password}){
            commit('deleteUser');
            return post.getToken(username, password).then(res=>{
                commit('setUser', res.data);
            })
        },
        logout({commit}){
            commit('deleteUser');
        },
    },
}