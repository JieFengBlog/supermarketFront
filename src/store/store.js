import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        userInfo:{
            loginStatus:false,
            checked:false
        }
    },

    getters:{

        getChecked:(state) => {
            return state.userInfo.checked;
        },

        getLoginStatus:(state) =>{
            return state.userInfo.loginStatus;
        }
    },

    mutations:{

        setChecked:(state,payload)=>{
            state.userInfo.checked = payload;
        },

        setLoginStatus:(state,payload)=>{
            state.userInfo.loginStatus = payload;
        }
    }

})
