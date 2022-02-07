import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: [],
    audioMessage: null
  },
  mutations: {
    songsUpdate (state, newData) {
      state.songs = newData
    },
    audioMessageUpdate (state, newData) {
      state.audioMessage = newData
    }
  },
  actions: {
  },
  getters: {
    showAudioMessage (state) {
      if (state.audioMessage) {
        return state.audioMessage
      } else {
        return { id: null }
      }
    }
  },
  modules: {
  }
})
