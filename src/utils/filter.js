import Vue from 'vue'
import moment from 'moment'

Vue.filter('moment', function(dataStr, pattern = 'yyyy-MM-DD HH:mm:ss') {
    if (!dataStr){
        return
    }
    if (typeof dataStr === "number"){
        if (moment().diff(moment(dataStr), 'days') >= 25)
            return moment(dataStr).format(pattern)
        return moment(dataStr).fromNow()
    }
    return dataStr
})

Vue.filter('urlImage',function (data){
    if (!data){
        return require('@/assets/placeholder.jpg')
    }
    if (data.startsWith('http')){
        return data
    }
    return `/${data}`
})
