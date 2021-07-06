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
            to: item.path
        }
        breadcrumbs.push(it)
    })
    return breadcrumbs
}

const getBaseChildrenRoute = (routes) => {
    const {router} = appOptions
    const {matched} = routes

    const matchedParent = _.filter(matched,(o)=>o.meta.parent !== undefined)
    const {children} = _.find(router.options.routes,(o)=>{
        return o.path === '/'
    })
    for (const i of children) {
        if (i?.meta?.parent === matchedParent[0]?.meta?.parent){
            const ls = []
            i.children?.forEach(({name,path,meta})=>{
                if (meta.invisible !== false){
                    ls.push({name,path})
                }
            })
            return ls
        }
    }
    return []
}



export {getBreadcrumbs,getBaseChildrenRoute,setAppOptions}