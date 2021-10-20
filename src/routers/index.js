import Vue from "vue";
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)


export function initRouter(){
  const options = require("./config").default
  return new VueRouter(options)
}



