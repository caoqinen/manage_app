import {
    supplementary_list
} from "@/utils/request"
import {
    ElMessage
} from 'element-plus'



const state = {
    supplementary_list: [],
    supplementary_listCount: "",
    overlay: false
}


const mutations = {

    changesupplementary_list(state, data) {
        state.supplementary_list = data
    },

    changesupplementary_listCount(state, data) {
        // console.log(data);
        state.supplementary_listCount = data
    },

    changeOverlay(state, data) {
        state.overlay = data
    }
}


const actions = {
    // 列表请求
    supplementary_listActions(context, params) {
        supplementary_list(params).then(res => {
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

                    //加一个字段用于展示  lineDesc 编辑时用
                    item.lineDesc1 = item.lineDesc.length > 10 ? `${item.lineDesc.slice(0, 10)}...` : item.lineDesc
                })
                context.commit("changesupplementary_list", res.rep.userAbout)
                context.commit("changesupplementary_listCount", res.rep.userAboutCount[0])


            }
        })
    },


    // 改变加载框状态
    changeStatus(context) {
        context.commit("changeOverlay", true)
    }

}


const getters = {
    supplementary_list: state => state.supplementary_list,
    supplementary_listCount: state => state.supplementary_listCount,
    overlay: state => state.overlay
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}