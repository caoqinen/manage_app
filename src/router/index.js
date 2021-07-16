import {
    createRouter,
    // createWebHistory,
    createWebHashHistory
} from "vue-router";
import Home from "../views/Home.vue";
import {
    ElMessage
} from 'element-plus'
const routes = [{
    path: '/',
    redirect: '/ed514176'
}, {
    path: "/",
    name: "Home",
    component: Home,
    children: [{
        path: "/ed514176",
        name: "ed514176",
        meta: {
            title: '系统首页'
        },
        component: () => import("@/views/Dashboard")
    }, {
        path: "/3a556362",
        name: "用户补充管理",
        meta: {
            title: '用户补充管理'
        },
        component: () => import('@/views/Supplementary_management')
    }, {
        path: "/c594e39d",
        name: "会员管理",
        meta: {
            title: '会员管理'
        },
        component: () => import('@/views/member')
    }, {
        path: "/d34481c6",
        name: "用户邀请管理",
        meta: {
            title: '用户邀请管理'
        },
        component: () => import('@/views/invitationManage')
    }, {
        path: "/45213e68",
        name: "栏目管理",
        meta: {
            title: '栏目管理'
        },
        component: () => import('@/views/column')
    }, {
        path: "/c7a25e76",
        name: "圈子管理",
        meta: {
            title: '圈子管理'
        },
        component: () => import('@/views/circle')
    }, {
        path: "/table",
        name: "basetable",
        meta: {
            title: '表格'
        },
        component: () => import("../views/BaseTable.vue")
    }, {
        path: "/charts",
        name: "basecharts",
        meta: {
            title: '图表'
        },
        component: () => import(
            /* webpackChunkName: "charts" */
            "../views/BaseCharts.vue")
    }, {
        path: "/form",
        name: "baseform",
        meta: {
            title: '表单'
        },
        component: () => import(
            /* webpackChunkName: "form" */
            "../views/BaseForm.vue")
    }, {
        path: "/tabs",
        name: "tabs",
        meta: {
            title: 'tab标签'
        },
        component: () => import(
            /* webpackChunkName: "tabs" */
            "../views/Tabs.vue")
    }, {
        path: "/donate",
        name: "donate",
        meta: {
            title: '鼓励作者'
        },
        component: () => import(
            /* webpackChunkName: "donate" */
            "../views/Donate.vue")
    }, {
        path: "/permission",
        name: "permission",
        meta: {
            title: '权限管理',
            permission: true
        },
        component: () => import(
            /* webpackChunkName: "permission" */
            "../views/Permission.vue")
    }, {
        path: "/i18n",
        name: "i18n",
        meta: {
            title: '国际化语言'
        },
        component: () => import(
            /* webpackChunkName: "i18n" */
            "../views/I18n.vue")
    }, {
        path: "/upload",
        name: "upload",
        meta: {
            title: '上传插件'
        },
        component: () => import(
            /* webpackChunkName: "upload" */
            "../views/Upload.vue")
    }, {
        path: "/icon",
        name: "icon",
        meta: {
            title: '自定义图标'
        },
        component: () => import(
            /* webpackChunkName: "icon" */
            "../views/Icon.vue")
    }, {
        path: '/404',
        name: '404',
        meta: {
            title: '找不到页面'
        },
        component: () => import( /* webpackChunkName: "404" */
            '../views/404.vue')
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import( /* webpackChunkName: "403" */
            '../views/403.vue')
    }]
}, {
    path: "/login",
    name: "Login",
    meta: {
        title: '登录'
    },
    component: () => import(
        /* webpackChunkName: "login" */
        "../views/Login.vue")
}];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // document.title = `${to.meta.title}`;
    const role = sessionStorage.getItem('user');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.title == "会员管理") {
        role === '377e9ed0-3a55-4cd6-aaf6-2cf1a2935613' ?
            next() :
            ElMessage.error('暂无权限,联系管理员开通');
    } else {
        next();
    }
});

export default router;