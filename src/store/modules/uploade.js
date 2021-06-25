import {
  uploadFile
} from "@/util/request.js"

const state = {
  Boolup: false,
  overlay: false,
  successText: "",
  colorText: ""
}


const mutations = {
  //更改加载框
  changeoverlay(state, data) {
    state.overlay = data
  },

  changeSuccessText(state, data) {
    console.log(data);
    state.successText = data
  },
  changeColor(state, data) {
    state.colorText = data
  },
  changeBoolup(state, data) {
    state.Boolup = data
    setTimeout(() => (state.Boolup = false), 2000);
  }

}


const actions = {
  // 列表请求
  uploadActions(context, params) {
    uploadFile(params).then(res => {
      if (res.data.result.code.code === "0000") {
        //加载框消失
        context.commit("changeoverlay", false)
        //提示框
        context.commit("changeBoolup", true)
        context.commit("changeSuccessText", res.data.result.code.massage)
        context.commit("changeColor", 'success')
      } else {
        console.log(res);
        context.commit("changeoverlay", false)
        context.commit("changeBoolup", true)
        context.commit("changeSuccessText", '请联系管理人员')
        context.commit("changeColor", 'red lighten-2')
      }
    })
  },


  isoverlay(context) {
    context.commit("changeoverlay", true)
  }



}


const getters = {
  overlay(state) {
    return state.overlay
  },
  successText(state) {
    return state.successText
  },
  colorText(state) {
    return state.colorText
  },
  Boolup(state) {
    return state.Boolup
  }
}


export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
