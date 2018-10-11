import {LOGIN,LOGOUT,CHANGETOPATH} from './mutation-types.js'
export default {
    [LOGIN](state) {
        state.logined =true;
    },
    [LOGOUT](state) {
        state.logined =false;
    },
    [CHANGETOPATH](state,Path){
        state.toPath =Path
    }
}