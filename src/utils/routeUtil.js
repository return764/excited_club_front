import _ from "lodash"

//应用配置
let appOptions = {
    router: undefined,
    store: undefined
}

/**
 * 设置应用配置
 * @param options
 */
function setAppOptions(options) {
    const {router, store} = options
    appOptions.router = router
    appOptions.store = store
}


const getBreadcrumbs = (routes) => {
    let breadcrumbs = [
        // {
        //     text: "主页",
        //     disabled : false,
        //     to: "/index"
        // }
    ]
    const {matched} = routes
    matched.forEach(item => {
        const it = {
            text: item.meta.name,
            disabled : false,
            exact: true,
            to: item.path
        }
        breadcrumbs.push(it)
    })
    breadcrumbs[0].to = breadcrumbs[0].text === "主页" ? "/index" : breadcrumbs[0].to
    breadcrumbs[breadcrumbs.length - 1].disabled = true
    return breadcrumbs
}

const getBaseChildrenRoute = (routes) => {
    const {router} = appOptions
    const {matched} = routes

    //匹配的parent
    const matchedParent = _.filter(matched,(o)=>o.meta.parent !== undefined)
    // 找到index下的children
    const {children} = _.find(router.options.routes,(o)=>{
        return o.path === '/'
    })
    for (const i of children) {
        if (i?.meta?.parent === matchedParent[0]?.meta?.parent){
            const ls = []
            i.children?.forEach(({name,path,meta})=>{
                if (meta.invisible !== true){
                    ls.push({name,path})
                }
            })
            return ls
        }
    }
    return []
}

/**
 * 获取全路径
 * @param routes
 * @param parentPath
 */
function formatFullPath(routes, parentPath = ''){
    routes.forEach(route=>{
        let isFullPath = route.path.substring(0,1) === '/'
        route.fullPath = isFullPath ? route.path : (parentPath === '/' ? parentPath + route.path : parentPath + '/' + route.path)
        if (route.children){
            formatFullPath(route.children,route.fullPath)
        }
    })
}


export {getBreadcrumbs,getBaseChildrenRoute,setAppOptions,formatFullPath}
