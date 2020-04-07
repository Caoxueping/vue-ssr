import Vue from "vue";
import Router from "vue-router";
import Index from "@/view/index"
import Detail from "@/view/detail"

Vue.use(Router);

//导出工厂函数
// 每个用户之间是独立的实例，避免相互污染
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: "/", component: Index},
            { path: "/detail", component: Detail}
        ]
    });
}