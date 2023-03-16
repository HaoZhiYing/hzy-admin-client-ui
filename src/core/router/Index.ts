import { createRouter, createWebHashHistory, Router, useRouter as appRouter, useRoute as appRoute } from 'vue-router'
import defaultRouters from '@/core/router/DefaultRouters';
import { genDynamicRouters } from '@/core/router/DynamicRouters';
import Tools from '@/core/utils/Tools';
//菜单数据
import menuTreeList from "@/core/mock/MenuData";
import AppStore from '../store/AppStore';
import { getAuthorityByRouteMeta } from '@/utils/Authority';
import AppConsts from '@/utils/AppConsts';

const router = createRouter({
  history: createWebHashHistory(),
  routes: defaultRouters,
  scrollBehavior: () => ({ top: 0 }),//to, from, savedPosition
});

//监听路由
router.beforeEach((to, from, next) => {
  // console.log('路由拦截器=>', to, from, router.getRoutes());
  var appStore = AppStore();

  appStore.setLoading(true);
  if (Tools.checkPageWhiteList(to.fullPath)) {
    return next();
  }

  //动态路由
  var hasRoute = genDynamicRouters(menuTreeList);
  if (!hasRoute) {
    //
    console.log('router-cmd', router.getRoutes(), router.options.routes, to.fullPath);
    //如果初次add路由需要一下代码重新加载
    return next(to.fullPath);
  }

  next();

});

router.afterEach(() => {
  var appStore = AppStore();
  appStore.setLoading(false);
});

export default router;

/**
 * 注册路由
 * @returns 
 */
export function registerRouter(): Router {
  return router;
}

/**
 * 使用路由
 * @returns 
 */
export function useRouter() {
  return appRouter();
}

/**
 * 使用路由
 * @returns 
 */
export function useRoute() {
  return appRoute();
}
