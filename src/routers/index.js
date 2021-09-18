import Vue from "vue";
import Index from "@/pages/Index";
import VueRouter from 'vue-router';
import NewsInform from "@/pages/NewsInform";
import MainLayout from "@/layouts/MainLayout";
import ArticlePage from "@/pages/ArticlePage";
import BlankLayout from "@/layouts/BlankLayout";
import MainIntroduce from "@/pages/MainIntroduce";
import PhotosTeacher from "@/pages/PhotosTeacher";
import OtherIntroduce from "@/pages/OtherIntroduce";
import IWaterfallList from "@/pages/IWaterfallList";
import UserInfoPage from "@/pages/UserInfoPage";
import NotFound from "@/components/NotFound";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

export const routes = [
    {
        path: "/index",
        component: Index,
        meta: {
            name: "主页"
        },
    }, {
        path: "/",
        component: MainLayout,
        redirect: "/index",
        meta: {
            name: "主页"
        },
        children: [
            {
                path: "/aboutUs",
                name: "关于我们",
                meta: {
                    name: "关于我们",
                    parent: "aboutUs"
                },
                redirect:"aboutUs/oc",
                component: BlankLayout,
                children:[
                    {
                        name:"Oracle Club",
                        path:"oc",
                        component:MainIntroduce,
                        meta: {
                            name: "Oracle Club"
                        },
                    },
                    {
                        name:"方向介绍",
                        path:"other",
                        component: OtherIntroduce,
                        meta: {
                            name: "方向介绍"
                        },
                    }
                ]
            },
            {
                path: "/news",
                component: BlankLayout,
                name: "通知公告",
                meta: {
                    name: "通知公告",
                    parent: "news"
                },
                redirect:"news/latest",
                children:[
                    {
                        name:"最新消息",
                        path:"latest",
                        component:ArticlePage,
                        meta: {
                            name: "最新消息"
                        },
                    },
                    {
                        name:"公告",
                        path:"inform",
                        component: NewsInform,
                        meta: {
                            name: "公告"
                        },
                    },
                    {
                        name: "文章",
                        path: ":id",
                        component: ArticlePage,
                        meta:{
                            name: "文章",
                            invisible:true,
                        }
                    }
                ]
            },
            {
                path: "/outstanding",
                component: BlankLayout,
                name: "杰出展示",
                meta: {
                    name: "杰出展示",
                    parent: "outstanding"
                },
            },
            {
                path: "/photos",
                component: BlankLayout,
                meta: {
                    name: "照片墙",
                    parent: "photos"
                },
                redirect:"photos/teacher",
                children:[
                    {
                        name:"指导老师",
                        path:"teacher",
                        component:PhotosTeacher,
                        meta: {
                            name: "指导老师"
                        },
                    },
                    {
                        name:"风采展示",
                        path:"waterfall",
                        component: IWaterfallList,
                        meta: {
                            name: "风采展示"
                        },
                    }
                ]
            },
            {
                path: "/user",
                component: BlankLayout,
                redirect: "/user/info",
                meta: {
                    name: "个人中心",
                    invisible:true,
                },
                children: [
                    {
                        path: "info",
                        component: UserInfoPage,
                        name: "个人中心",
                        meta: {
                            name: "个人中心",
                        },
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    }
]
export default new VueRouter({
    mode: 'history',
    routes: routes
})



