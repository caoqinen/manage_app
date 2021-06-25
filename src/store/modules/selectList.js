import {
  selectList
} from "@/utils/request.js"

const state = {
  seleList: [],
  oldList: [],
  titlecount: "",
  bool: false,
  id1: ""
}


const mutations = {
  changeSeleList(state, data) {
    // console.log(data);
    state.seleList = data
  },

  changetitlecount(state, num) {
    state.titlecount = num
  },

  changebool(state, bool) {
    state.bool = bool
  },
  changeid(state, data) {
    let aa = state.oldList.find(item => {
      return item.lineName == data
    })
    state.id1 = aa.lineId
  },


  changeoldList(state, data) {
    state.oldList = data
  }

}


const actions = {
  // 列表请求
  selectListActions(context, params) {
    selectList(params).then(res => {
      if (res.result.code.code === "0000") {
        let newArr = []
        res.rep.title.forEach(item => {
          newArr.push({
            lable: item.lineName,
            lineId: item.lineId
          })
        })
        console.log(res);
        context.commit("changeSeleList", newArr)
        context.commit("changetitlecount", res.rep.titleCount[0])
        context.commit("changeoldList", res.rep.title)

      } else {
        context.commit("changebool", true)
      }
    })
  },

  getid(context, params) {
    // console.log(params);
    context.commit("changeid", params)
  }



}


const getters = {
  seleList(state) {
    return state.seleList
  },
  titlecount(state) {
    return state.titlecount
  },

  bool(state) {
    return state.bool
  },

  id1(state) {
    return state.id1
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}