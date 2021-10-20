import Index from "@/pages/Index";
import MainLayout from "@/layouts/MainLayout";
import BlankLayout from "@/layouts/BlankLayout";
import MainIntroduce from "@/pages/MainIntroduce";
import OtherIntroduce from "@/pages/OtherIntroduce";
import ArticlePage from "@/pages/ArticlePage";
import NewsInform from "@/pages/NewsInform";
import BBSPage from "@/pages/bbs/BBSPage";
import BBSBoardPage from "@/pages/bbs/BBSBoardPage";
import PostPage from "@/pages/bbs/PostPage";
import PhotosTeacher from "@/pages/PhotosTeacher";
import IWaterfallList from "@/pages/IWaterfallList";
import UserInfoPage from "@/pages/UserInfoPage";
import NotFound from "@/components/NotFound";
import BBSList from "@/components/bbs/BBSList";

const options = {
  mode: 'history',
  routes: [
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
      name: "主页",
      meta: {
        name: "主页"
      },
      children: [
        {
          path: "/aboutUs",
          name: "关于我们",
          meta: {
            name: "关于我们",
            parent: "aboutUs",
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
          path: "/bbs",
          component: BBSPage,
          name: "论坛",
          meta: {
            name: "论坛",
            parent: "bbs",
          },
          redirect: "bbs/b/home",
          children: [
            {
              path: "b",
              component: BBSBoardPage,
              name: "主题",
              meta: {
                name: "主题",
                invisible: true
              },
              redirect: "b/home",
              children: [
                {
                  name:"所有板块",
                  path:"home",
                  component: BBSList,
                  meta: {
                    name: "所有板块",
                    invisible: true
                  },
                },
              ]
            },
            {
              path: "p",
              component: BlankLayout,
              name: "帖子s",
              meta: {
                name: "帖子s",
                invisible: true,
                inBreadcrumb: true
              },
              children: [
                {
                  path: ":post_id",
                  name: "帖子",
                  component: PostPage,
                  meta: {
                    name: "帖子",
                    invisible: true
                  },
                }
              ]
            },
          ],

        },
        {
          path: "/photos",
          component: BlankLayout,
          meta: {
            name: "照片墙",
            parent: "photos"
          },
          redirect:"photos/waterfall",
          children:[
            {
              name:"指导老师",
              path:"teacher",
              component:PhotosTeacher,
              meta: {
                name: "指导老师",
                invisible:true,
              },
            },
            {
              name:"风采展示",
              path:"waterfall",
              component: IWaterfallList,
              meta: {
                name: "风采展示",
                invisible:true,
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
}

export default options
