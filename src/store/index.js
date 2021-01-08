import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import notify from "./module/notify";
import loading from "./module/loading";
import error from "./module/error";

export default new Vuex.Store({
  modules: {
    notify,
    loading,
    error
  }
})