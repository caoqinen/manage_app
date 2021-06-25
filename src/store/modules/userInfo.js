const state = {
  username: "",
}


const mutations = {
  changeUsername(state, data) {
    state.username = data
  }
}


const actions = {
  getUsername(context) {
    let username = localStorage.getItem('username')
    context.commit("changeUsername", username)
  }
}


const getters = {
  username(state) {
    return state.username
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
