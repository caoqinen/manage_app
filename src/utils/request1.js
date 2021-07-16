import axios from 'axios';
import store from "@/store";
import {
  ElMessage
} from 'element-plus'
// import Nprogress from "nprogress"
// import 'nprogress/nprogress.css'
axios.interceptors.request.use(
  config => {
    //Nprogress.start()
    if (config.headers['Resource-Id'] !== '934ca5d4-2c7d-4ae4-86d3-055063eace16' && config.headers['Resource-Id'] !== '7f44fe17-8648-460c-b961-ad7ff6448506' && config.headers['Resource-Id'] !== '98dbaef4-b76a-477a-b2cb-9066b8c3daf7') store.commit("setLoading", true);
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = sessionStorage.getItem('token');
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
      // Nprogress.start().done()
      store.commit("setLoading", false);
      // console.log(response.data);
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
// const baseUrl1 = "/api1";
const baseUrl1 = "/api";




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

export const supplementary_list = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "0a33a1da-a461-4ce8-ae99-0f3e5d50268e"
  },
  data: params
})




export const edit_supplementary_list = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "52be233a-950f-429b-bedc-7deb29d429af"
  },
  data: params
})



export const columnList = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "a52e91ff-137e-4186-abce-fb85d475d211"
  },
  data: params
})


export const columnSelectList = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "7ce4f6b0-76ae-4b3f-95b8-898eca26cebf"
  },
  data: params
})


export const editColumn = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "f5abcc1e-e21a-4ff9-8136-280086c97c1e"
  },
  data: params
})


export const uploadCol = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "2ef21c9d-dfa8-4370-9aa8-ab912f7fba88"
  },
  data: params
})


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




export const editCircle = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "ac2bd379-436a-4a47-a8ea-e1ccbd154ab0"
  },
  data: params
})


export const uploadFile = (params) => axios({
  url: baseUrl1 + "/file/circle/insert",
  method: "post",
  headers: {
    'Content-Type': 'multipart/form-data',
    "Resource-Id": "f859b248-0ce5-4e28-abf6-a3fd6205bfba",
  },
  data: params
})


export const shareCount = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "934ca5d4-2c7d-4ae4-86d3-055063eace16"
  },
  data: params
})


export const redCount = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "7f44fe17-8648-460c-b961-ad7ff6448506"
  },
  data: params
})



export const getVipType = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "21ea2335-3a76-4618-ace7-171af542077f"
  },
  data: params
})


export const openVip = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "650cd736-f32e-447e-b471-5c6620977562"
  },
  data: params
})


export const getCircleDetail = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "838179f3-7103-4f8b-adc1-06321c597cd9"
  },
  data: params
})


export const getAppActive = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "38b0f772-ba44-41ad-80ba-ad3cc0a2a6ab"
  },
  data: params
})


/**
 * 查看个人邀请记录
 * @param{ daysAgo } 前n天
 * @param{ daysNow } 到今天
 * @param{ start } 开始
 * @param{ length } 条数
 * @param{ userId } 当前用户lineid  不传默认所有
 */
export const getInvitation_list = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "22953ec1-86d7-493e-9b9c-f7d47ddeaee8"
  },
  data: params
})

export const getInvitation = (params) => axios({
  url: baseUrl1 + "/center/resources",
  method: "post",
  headers: {
    'Content-Type': 'application/json',
    "Resource-Id": "98dbaef4-b76a-477a-b2cb-9066b8c3daf7"
  },
  data: params
})