import {post} from "@/api/apiRoutes"


export const authenticate = {
    namespaced: true,
    state: () => ({
        userData:  JSON.parse(localStorage.getItem('userData')) || null,
    }),
    mutations:{
        setUser(state, value){
            state.userData = value;
            localStorage.setItem('userData', JSON.stringify(value))
        },
        deleteUser(state){
            state.userData = null;
            localStorage.removeItem('userData');
        }
    },
    getters:{
        isAuthenticated(state){
            return !!state.userData
        },
        userCanCreate(state){
            if (state.userData){
                return state.userData.user.is_creator
            }
            else return false

        },
        userCanAnswer(state){
            if (state.userData){
                return state.userData.user.is_executor
            }
            else return false
        },
        userCanView(state){
            if (state.userData){
                return state.userData.user.is_superuser || state.userData.user.is_creator
            }
            else return false
        },
        isSuperUser(state){
            if (state.userData){
                return !!state.userData.user.is_superuser;
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