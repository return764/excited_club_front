
const options = {
  mode: 'history',
  routes: [
    {
      path: "/index",
      component: () => import("@/pages/Index"),
      meta: {
        name: "主页"
      },
    }, {
      path: "/",
      component: () => import("@/layouts/MainLayout"),
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
          component: () => import("@/layouts/BlankLayout"),
          children:[
            {
              name:"Oracle Club",
              path:"oc",
              component:() => import("@/pages/MainIntroduce"),
              meta: {
                name: "Oracle Club"
              },
            },
            {
              name:"方向介绍",
              path:"other",
              component: () => import("@/pages/OtherIntroduce"),
              meta: {
                name: "方向介绍"
              },
            }
          ]
        },
        {
          path: "/news",
          component: () => import("@/layouts/BlankLayout"),
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
              component: () => import("@/pages/ArticlePage"),
              meta: {
                name: "最新消息"
              },
            },
            {
              name:"公告",
              path:"inform",
              component: () => import("@/pages/NewsInform"),
              meta: {
                name: "公告"
              },
            },
            {
              name: "文章",
              path: ":id",
              component: () => import("@/pages/ArticlePage"),
              meta:{
                name: "文章",
                invisible:true,
              }
            }
          ]
        },
        {
          path: "/bbs",
          component: () => import("@/pages/bbs/BBSPage"),
          name: "论坛",
          meta: {
            name: "论坛",
            parent: "bbs",
          },
          redirect: "bbs/b/home",
          children: [
            {
              path: "b",
              component: () => import("@/pages/bbs/BBSBoardPage"),
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
                  component: () => import("@/components/bbs/BBSList"),
                  meta: {
                    name: "所有板块",
                    invisible: true
                  },
                },
              ]
            },
            {
              path: "p",
              component: () => import("@/layouts/BlankLayout"),
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
                  component: () => import("@/pages/bbs/PostPage"),
                  meta: {
                    name: "帖子",
                    invisible: true
                  },
                }
              ]
            },
            {
              path: "u",
              component: () => import("@/pages/bbs/BBSUserCenterPage"),
              name: "用户",
              meta: {
                name: "用户",
                invisible: true,
                inBreadcrumb: true
              },
              children: [
                {
                  path: "myTopic",
                  name: "我的话题",
                  component: () => import("@/pages/bbs/MyTopic"),
                  meta: {
                    name: "我的话题",
                    invisible: true
                  }
                },
                {
                  path: "myReply",
                  name: "我的回复",
                  component: () => import("@/pages/bbs/MyReply"),
                  meta: {
                    name: "我的回复",
                    invisible: true
                  }
                },
                {
                  path: "replyMe",
                  name: "回复我的",
                  component: () => import("@/pages/bbs/ReplayMe"),
                  meta: {
                    name: "回复我的",
                    invisible: true
                  }
                }
              ]
            }
          ],

        },
        {
          path: "/photos",
          component: () => import("@/layouts/BlankLayout"),
          meta: {
            name: "照片墙",
            parent: "photos"
          },
          redirect:"photos/waterfall",
          children:[
            {
              name:"指导老师",
              path:"teacher",
              component: () => import("@/pages/PhotosTeacher"),
              meta: {
                name: "指导老师",
                invisible:true,
              },
            },
            {
              name:"风采展示",
              path:"waterfall",
              component: () => import("@/pages/IWaterfallList"),
              meta: {
                name: "风采展示",
                invisible:true,
              },
            }
          ]
        },
        {
          path: "/user",
          component:  () => import("@/layouts/BlankLayout"),
          redirect: "/user/info",
          meta: {
            name: "个人中心",
            invisible:true,
          },
          children: [
            {
              path: "info",
              component: () => import("@/pages/UserInfoPage"),
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
      component: () => import("@/components/NotFound")
    }
  ]
}

export default options
