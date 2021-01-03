import Vue from "vue";
import VueRouter from 'vue-router';
import Index from "@/pages/Index";
import NewsPage from "@/pages/NewsPage";
import OutstandingPage from "@/pages/OutstandingPage";
import PhotosPage from "@/pages/PhotosPage";
import AboutMePage from "@/pages/AboutMePage";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            redirect: "/index"
        }, {
            path: "/index",
            component: Index,
            meta: {
                name: "主页"
            },
        },{
            path: "/aboutme",
            component: AboutMePage,
            name: "关于我们",
            meta: {
                name: "关于我们"
            },
            children: [
                {
                    path: "post/:atc?",
                    // component: Article,
                    meta: {
                        name: "正文"
                    }
                }
            ]
        }, {
            path: "/news",
            component: NewsPage,
            name: "通知公告",
            meta: {
                name: "通知公告"
            },
            children: [
                {
                    path: "",
                    redirect: "new",
                }, {
                    path: "new",
                    // component: Article,
                    meta: {
                        name: "最新消息"
                    }
                }, {
                    path: "list",
                    // component: ArticleInfoList,
                    meta: {
                        name: "公告"
                    },
                }, {
                    path: "list/:atc",
                    // component: Article,
                    meta: {
                        name: "正文"
                    }
                },
            ]
        }, {
            path: "/outstanding",
            component: OutstandingPage,
            name: "杰出展示",
            meta: {
                name: "杰出展示"
            },
        }, {
            path: "/photos",
            component: PhotosPage,
            meta: {
                name: "照片墙"
            },
            children: [
                {
                    path: "",
                    name: "指导老师",
                    // component: TeacherList,
                    meta: {
                        name: "指导老师"
                    }
                }, {
                    path: "member",
                    name: "照片墙",
                    meta: {
                        name: "成员展示"
                    }
                }, {
                    path: "list",
                    name: "风采展示",
                    // component: WaterFallList,
                    props: {},
                    meta: {
                        name: "风采展示",
                        type: "waterfall"
                    }
                }
            ]
        }
    ]
})



