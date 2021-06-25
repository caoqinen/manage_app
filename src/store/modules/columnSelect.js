import {
  columnSelectList
} from "@/utils/request"





const state = {
  colSelectList: []
}


const mutations = {

  SetcolSelectList(state, data) {
    state.colSelectList = data
  },
}


const actions = {
  // 列表请求
  colListActions(context, params) {
    columnSelectList(params).then(res => {
      if (res.result.code.code === "0000") {
        let newArr = []
        res.rep.userAbout.forEach(item => {
          newArr.push({
            lineId: item.lineId,
            lineName: item.lineName
          })
        })
        res.rep.arr = newArr
        context.commit("SetcolSelectList", res.rep)
      }
    })
  },

}


const getters = {
  colSelectList: state => state.colSelectList
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}