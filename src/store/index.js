import {
  createStore
} from 'vuex'


import actions from "./actions"

import {
  state,
  mutations,
  getters,
} from "./mutations"


import menuList from "./modules/menuList"
import supplementary from "./modules/supplementary_list"
import column from "./modules/column"
import columnSelect from "./modules/columnSelect"
import circle from "./modules/circle"
import selectList from "./modules/selectList"


export default createStore({
  state,
  mutations,
  getters,
  actions,
  modules: {
    menuList,
    supplementary,
    column,
    columnSelect,
    circle,
    selectList
  }
})