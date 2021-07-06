import {setAppOptions} from "@/utils/routeUtil";

function bootstrap({router, store}) {
    // 设置应用配置
    setAppOptions({router, store})

}


export default bootstrap