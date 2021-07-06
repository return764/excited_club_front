import Vue from 'vue'
import moment from 'moment'

Vue.filter('moment', function(dataStr, pattern = 'yyyy-MM-DD HH:mm:ss') {
    if (!dataStr){
        return
    }
    if (typeof dataStr === "number"){
        return moment(dataStr).format(pattern)
    }
    return dataStr
})
