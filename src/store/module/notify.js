
import axios from 'axios'
import loadMore from "../../assets/js/loadMore";

export default {
  state: {
    messages: [],
    messagesMain: [],
    API: 'http://notify-api.na4u.ru/api/notifyApi.php'
  },
  mutations: {
    setMessage(state, payload) {
      state.messages = payload
    },
    setMessageMain(state, payload) {
      state.messagesMain = payload
    },
    loadMessages(state, payload) {
      state.messagesMain = [...state.messagesMain, ...payload]
    }
  },
  actions: {
    setMessage({commit}, payload) {
      commit('setMessage', payload)
    },
    setMessageMain({commit}, payload) {
      commit('setMessageMain', payload)
    },
    loadMessages({commit, getters}) {
      let res = getters.getMessageFilter
      commit('loadMessages', loadMore(res))
    },
    getNotifyLazy({commit, dispatch}) {

      dispatch('setLoading', true)

      setTimeout(() => {
        dispatch('getNotify')
      }, 2000)
    },
    getNotify({commit, dispatch, state}) {

      dispatch('setLoading', true)

      axios
        .get(state.API)
        .then(response => {
          let res = response.data.notify,
            messages = [],
            messagesMain = [];

          // Filter
          for (let i = 0; i < res.length; i++) {
            if (res[i].main) messagesMain.push(res[i])
            else messages.push(res[i])
          }

          dispatch('setMessage', messages)
          dispatch('setMessageMain', messagesMain)

        })
        .catch(error => {
          dispatch('setError', 'Error: NetWork Error')
        })
        .finally(() => (dispatch('setLoading', false)))
    },
  },
  getters: {
    getMessage(state) {
      return state.messages
    },
    getMessageFilter(state) {
      return state.messages.filter(mes => {
        return mes.main === false
      })
    },
    getMessageMain(state) {
      return state.messagesMain
    },
  },
}