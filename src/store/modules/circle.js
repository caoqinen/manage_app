import {
  publicList
} from "@/utils/request.js"
import {
  ElMessage
} from 'element-plus'
const state = {
  publicList: {},
  publicListCount: ""
}


const mutations = {
  changePublicList(state, data) {
    state.publicList = data
  },

  changePublicListCount(state, data) {
    state.publicListCount = data
  }

}


const actions = {
  // 列表请求
  publicListActions(context, params) {

    publicList(params).then((res) => {
      if (res.result.code.code === "0000") {
        if (res.rep.circle.length <= 0) {
          ElMessage.warning('暂无查询内容')
          return
        } else {
          res.rep.circle.forEach(item => {
            let year = item.dateTime.slice(0, 4)
            let mouth = item.dateTime.slice(4, 6)
            let day = item.dateTime.slice(6, 8)
            let hour = item.dateTime.slice(8, 10)
            let minute = item.dateTime.slice(10, 12)
            item.dateTime = `${year}-${mouth}-${day} ${hour}:${minute}`
            //加一个字段用于展示  lineDesc 编辑时用
            item.lineDesc1 = item.lineDesc.length > 10 ? `${item.lineDesc.slice(0, 10)}...` : item.lineDesc
          })
          context.commit("changePublicList", res.rep)
          context.commit("changePublicListCount", res.rep.circleCount[0])
        }
      }
    })
  },


}


const getters = {
  publicList(state) {
    return state.publicList
  },

  publicListCount(state) {
    return state.publicListCount
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}