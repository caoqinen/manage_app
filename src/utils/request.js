import axios from 'axios';
import store from "@/store";
import {
  ElMessage
} from 'element-plus'
axios.interceptors.request.use(
  config => {
    store.commit("setLoading", true);
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    console.log(error);
    store.commit("setLoading", false);
    return Promise.reject();
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      store.commit("setLoading", false);
      console.log(response.data);
      return response.data;
    } else if (response.status == 200) {
      store.commit("setLoading", false);
      ElMessage.success(response.data.result.code.massage)
      Promise.reject();
    }
  },
  error => {
    console.log(error);
    store.commit("setLoading", false);
    ElMessage.error('请联系管理员')
    return Promise.reject();
  }
);


// const baseUrl = "/api";
const baseUrl1 = "/api";


/**
 * 登陆
 *  user":"developer",
 *  password":"saluoweiya"
 * @param{ user }用户名
 * @param{ password }密码
 */

export const adminLogin = (params) => axios({
  url: baseUrl1 + "/auth/token/user",
  method: "post",
  headers: {
    'Content-Type': 'application/json'
  },
  data: params
})

export const getUserInfo = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "fb8e7383-91dc-45b9-94f9-fb2bb31d1648"
  },
  data: params
})

export const menuList = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "8e1e5c1c-193d-4f2b-9f38-3a7682b95d2b"
  },
  data: params
})
//用户补充查询接口
export const supplementary_list = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "0a33a1da-a461-4ce8-ae99-0f3e5d50268e"
  },
  data: params
})



// 用户补充查询 修改接口
export const edit_supplementary_list = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "52be233a-950f-429b-bedc-7deb29d429af"
  },
  data: params
})


//栏目 请求从这开始
export const columnList = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "a52e91ff-137e-4186-abce-fb85d475d211"
  },
  data: params
})

// titleid 的下拉列表
export const columnSelectList = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "7ce4f6b0-76ae-4b3f-95b8-898eca26cebf"
  },
  data: params
})

//栏目删除
export const editColumn = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "f5abcc1e-e21a-4ff9-8136-280086c97c1e"
  },
  data: params
})

// 新增栏目
export const uploadCol = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "2ef21c9d-dfa8-4370-9aa8-ab912f7fba88"
  },
  data: params
})

// 栏目上传背景
export const uploadImg = (params) => axios({
  url: baseUrl1 + "/file/title/updateFileIdByLineId",
  method: "post",
  headers: {
    "Resource-Id": "2ef21c9d-dfa8-4370-9aa8-ab912f7fba88"
  },
  data: params
})


export const publicList = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "f859b248-0ce5-4e28-abf6-a3fd6205bfba"
  },
  data: params
})

export const selectList = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "a52e91ff-137e-4186-abce-fb85d475d211"
  },
  data: params
})



//圈子更新 删除接口
export const editCircle = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "ac2bd379-436a-4a47-a8ea-e1ccbd154ab0"
  },
  data: params
})

//文件上传
export const uploadFile = (params) => axios({
  url: baseUrl1 + "/file/circle/insert",
  method: "post",
  headers: {
    'Content-Type': 'multipart/form-data',
    "Resource-Id": "f859b248-0ce5-4e28-abf6-a3fd6205bfba",
  },
  data: params
})