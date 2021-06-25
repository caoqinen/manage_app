const state = {
  breakList: [],
}


const mutations = {
  changeBreakList(state, data) {
    // console.log(data);
    state.breakList = data
    // console.log(state.breakList);
  },

}


const actions = {
  // 列表请求
  breakListActions(context, options) {
    let path = options.path;
    let text = options.name;
    let obj = {
      text,
      disabled: false,
      href: path,
    }
    //如果有相同的说明已经去过，就不再数组中添加
    let bool = state.breakList.some((item) => item.text == obj.text)
    if (!bool) {
      state.breakList.push(obj)
      context.commit("changeBreakList", state.breakList)
    }
  }
}


const getters = {
  breakList(state) {
    return state.breakList
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
