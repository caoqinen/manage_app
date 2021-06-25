import {
  menuList
} from "@/utils/request.js"

const state = {
  List: [],
}


const mutations = {
  changemenuList(state, data) {
    // console.log(data);
    state.List = data
  },

}


const actions = {
  // 列表请求
  menuListActions(context) {
    menuList({
      grantId: "7fc3d1b6-bca5-4f0e-b0b7-ede3ad0b53c4",
    }).then((res) => {
      if (res.result.code.code === "0000") {
        let leftMenu = res.rep.menu;
        // console.log(leftMenu);
        context.commit("changemenuList", leftMenu)
      }
    });
  }



}


const getters = {
  List(state) {
    return state.List
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}