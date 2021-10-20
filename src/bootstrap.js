import {loadRoutes, setAppOptions} from "@/utils/routeUtil";
import {loadInterceptors} from "@/utils/request";
import interceptors from "@/utils/interceptors";

function bootstrap({router, store, message}) {
    // 设置应用配置
    setAppOptions({router, store})

    loadInterceptors(interceptors,{message})

    loadRoutes()
}


export default bootstrap
