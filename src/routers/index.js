import Vue from "vue";
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    // routes: [
    //     {
    //         path: "/",
    //         redirect: "/index"
    //     }, {
    //         path: "/index",
    //         component: Index,
    //         meta: {
    //             name: "主页"
    //         },
    //         children: [
    //             {
    //                 path: "",
    //                 name: "主页",
    //                 component: Main,
    //             }, {
    //                 path: "department",
    //                 component: DepartmentIntroduction,
    //                 name: "部门介绍",
    //                 meta: {
    //                     name: "部门介绍"
    //                 },
    //                 children: [
    //                     {
    //                         path: "post/:atc?",
    //                         component: Article,
    //                         meta: {
    //                             name: "正文"
    //                         }
    //                     }
    //                 ]
    //             }, {
    //                 path: "news",
    //                 component: News,
    //                 name: "通知公告",
    //                 meta: {
    //                     name: "通知公告"
    //                 },
    //                 children: [
    //                     {
    //                         path: "",
    //                         redirect: "new",
    //                     }, {
    //                         path: "new",
    //                         component: Article,
    //                         meta: {
    //                             name: "最新消息"
    //                         }
    //                     }, {
    //                         path: "list",
    //                         component: ArticleInfoList,
    //                         meta: {
    //                             name: "公告"
    //                         },
    //                     }, {
    //                         path: "list/:atc",
    //                         component: Article,
    //                         meta: {
    //                             name: "正文"
    //                         }
    //                     },
    //                 ]
    //             }, {
    //                 path: "outstanding",
    //                 component: Outstanding,
    //                 name: "杰出展示",
    //                 meta: {
    //                     name: "杰出展示"
    //                 },
    //             }, {
    //                 path: "photos",
    //                 component: Photos,
    //                 meta: {
    //                     name: "照片墙"
    //                 },
    //                 children: [
    //                     {
    //                         path: "",
    //                         name: "指导老师",
    //                         component: TeacherList,
    //                         meta: {
    //                             name: "指导老师"
    //                         }
    //                     }, {
    //                         path: "member",
    //                         name: "照片墙",
    //                         meta: {
    //                             name: "成员展示"
    //                         }
    //                     }, {
    //                         path: "list",
    //                         name: "风采展示",
    //                         component: WaterFallList,
    //                         props:{},
    //                         meta: {
    //                             name: "风采展示",
    //                             type: "waterfall"
    //                         }
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]
})



