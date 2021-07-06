import {
  getInvitation_list
} from "@/utils/request"
import {
  ElMessage
} from 'element-plus'



const state = {
  getInvitation_list: [],
  getInvitation_listCount: "",
}


const mutations = {
  changegetInvitation_list(state, data) {
    state.getInvitation_list = data
  },
  changegetInvitation_listCount(state, data) {
    state.getInvitation_listCount = data
  },
}


const actions = {
  // 列表请求
  getInvitation_listActions(context, params) {
    getInvitation_list(params).then(res => {
      console.log(res);
      if (res.result.code.code === "0000") {
        if (res.rep.userAbout.length <= 0) {
          ElMessage.warning('暂无查询内容')
          return
        }
        res.rep.userAbout.forEach(item => {
          let year = item.dateTime.slice(0, 4)
          let mouth = item.dateTime.slice(4, 6)
          let day = item.dateTime.slice(6, 8)
          let hour = item.dateTime.slice(8, 10)
          let minute = item.dateTime.slice(10, 12)
          item.dateTime = `${year}-${mouth}-${day} ${hour}:${minute}`
        })
        context.commit("changegetInvitation_list", res.rep.userAbout)
        context.commit("changegetInvitation_listCount", res.rep.userAboutCount[0])
      }
    })
  },


}


const getters = {
  getInvitation_list: state => state.getInvitation_list,
  getInvitation_listCount: state => state.getInvitation_listCount,
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}