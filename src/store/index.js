import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: [],
    nowSongs: [],
    audioMessage: null,
    currentPage: 1
  },
  mutations: {
    songsUpdate (state, newData) {
      state.songs = newData
      state.nowSongs = []
      state.currentPage = 1
      if (state.songs.length >= 10) {
        for (let i = 0; i < 10; i++) {
          state.nowSongs.push(state.songs[i])
        }
      } else {
        for (let i = 0; i < state.songs.length; i++) {
          state.nowSongs.push(state.songs[i])
        }
      }
    },
    audioMessageUpdate (state, newData) {
      state.audioMessage = newData
    },
    computedNowSongs (state, val) {
      state.nowSongs = []
      if (val - state.currentPage > 0) {
        if (state.songs.length - val * 10 >= 0) {
          for (let i = (val - 1) * 10; i < val * 10; i++) {
            state.nowSongs.push(state.songs[i])
          }
        } else {
          for (let i = (val - 1) * 10; i < (state.songs.length - (val - 1) * 10) + (val - 1) * 10; i++) {
            state.nowSongs.push(state.songs[i])
          }
        }
        state.currentPage = val
      } else if (val - state.currentPage < 0) {
        for (let i = (val - 1) * 10; i < val * 10; i++) {
          state.nowSongs.push(state.songs[i])
        }
        state.currentPage = val
      }
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
    },
    showNowSongs: state => {
      return state.nowSongs
    },
    showSongs: state => {
      return state.songs
    }
  },
  modules: {
  }
})
