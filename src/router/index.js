import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
  // mode: 'history',
  // linkActiveClass: 'active',
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: '/',
      name: 'home',
      component: resolve => require(['../components/Home.vue'], resolve)
    },
    // {
    //   path: '/page1',
    //   name: 'page1',
    //   component: resolve => require(['../components/Page1.vue'], resolve)
    // },
    // {
    //   path: '/page2',
    //   name: 'page2',
    //   component: resolve => require(['../components/Page2.vue'], resolve)
    // },
    // {
    //   path: '/page3',
    //   name: 'page3',
    //   component: resolve => require(['../components/Page3.vue'], resolve)
    // },
  ]
})
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
export default router
