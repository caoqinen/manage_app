// 状态
export const state = {
  isLoading: false,
  tagsList: [],
  collapse: true //true default open

} //请求加载状态


// 修改状态
export const mutations = {
  setLoading(state, data) {
    state.isLoading = data
  },
  delTagsItem(state, data) {
    state
      .tagsList
      .splice(data.index, 1);
  },
  setTagsItem(state, data) {
    state
      .tagsList
      .push(data)
  },
  clearTags(state) {
    state.tagsList = []
  },
  closeTagsOther(state, data) {
    state.tagsList = data;
  },
  closeCurrentTag(state, data) {
    for (let i = 0, len = state.tagsList.length; i < len; i++) {
      const item = state.tagsList[i];
      if (item.path === data.$route.fullPath) {
        if (i < len - 1) {
          data
            .$router
            .push(state.tagsList[i + 1].path);
        } else if (i > 0) {
          data
            .$router
            .push(state.tagsList[i - 1].path);
        } else {
          data
            .$router
            .push("/");
        }
        state
          .tagsList
          .splice(i, 1);
        break;
      }
    }
  },
  // 侧边栏折叠
  hadndleCollapse(state, data) {
    state.collapse = data;
  }
};


// 给组件提供数据的
export const getters = {}