import router from "./index.js"
import store from "../store"

router.beforeEach((to, from, next) => {
    if (to.meta.isLogin) {
        // 需要登陆
        var token = store.state.loginModule.user.token;
        // console.log(token);
        if (token) {
            next();
        } else {
            next({
                path: "/login"
            })
        }
    } else {
        // 不需要登陆
        next();
    }
})
