import Main from './Message'
import Vuetify from 'vuetify/lib';

// 实现一个全局message https://blog.csdn.net/weixin_44188300/article/details/104383933
// https://www.vue-js.com/topic/5fa10a424590fe0031e592ce
// 继承自Vuetify的VSnackbar
// 通过extend实现继承，$mount()方法手动挂载到变量
let instance = null
const Message = {
    install(Vue){
        if (typeof window !== 'undefined' && window.Vue) {
            Vue = window.Vue
        }

        if (!instance){
            let MessageConstructor = Vue.extend(Main)
            instance = new MessageConstructor()
            instance.$vuetify = new Vuetify().framework
            instance.$mount()
            document.body.appendChild(instance.$el)
        }

        Vue.prototype.$message = {
            info(message, options = {}) {
                options = Object.assign(options,{
                    color: "#2196F3"
                })
                instance.msg(message, options)
            },
            success(message, options = {}) {
                options = Object.assign(options,{
                    color: "#4CAF50"
                })
                instance.msg(message, options)
            },
            error(message, options = {}) {
                options = Object.assign(options,{
                    color: "#F44336"
                })
                instance.msg(message, options)
            },
            warning(message, options = {}) {
                options = Object.assign(options,{
                    color: "#FFA726"
                })
                instance.msg(message, options)
            }
        }
    }
}


export default Message
