export const getBreadcrumbs = (routes) => {
    let breadcrumbs = [
        {
            text: "主页",
            disabled : false,
            to: "/index"
        }
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