import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    name:'张三'
}
const mutations = {
    changeName(state) {
        state.name = '曹操'
    },
    changeNameById(state,payload){
        state.name = payload.name;
    }
}




export default new Vuex.Store({
    state,
    mutations

})