import {
  columnList
} from "@/utils/request"
import {
  ElMessage
} from 'element-plus'



const state = {
  columnList: [],
  columnListCount: "",
  overlay: false
}


const mutations = {

  changeColumnList(state, data) {
    state.columnList = data
  },

  changeColumnListCount(state, data) {
    state.columnListCount = data
  },

  changeOverlay(state, data) {
    state.overlay = data
  }
}


const actions = {
  // 列表请求
  columnListActions(context, params) {
    columnList(params).then(res => {
      // console.log(res);
      if (res.result.code.code === "0000") {
        if (res.rep.title.length <= 0) {
          ElMessage.warning('暂无查询内容')
          return
        }
        res.rep.title.forEach(item => {
          let year = item.dateTime.slice(0, 4)
          let mouth = item.dateTime.slice(4, 6)
          let day = item.dateTime.slice(6, 8)
          let hour = item.dateTime.slice(8, 10)
          let minute = item.dateTime.slice(10, 12)
          item.dateTime = `${year}-${mouth}-${day} ${hour}:${minute}`

          //加一个字段用于展示  lineDesc 编辑时用
          item.lineDesc1 = item.lineDesc.length > 10 ? `${item.lineDesc.slice(0, 10)}...` : item.lineDesc
        })
        context.commit("changeColumnList", res.rep.title)
        context.commit("changeColumnListCount", res.rep.titleCount[0])
      }

    })
  },


  // 改变加载框状态
  changeStatus(context) {
    context.commit("changeOverlay", true)
  }

}


const getters = {
  columnList: state => state.columnList,
  columnListCount: state => state.columnListCount,
  overlay: state => state.overlay
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}