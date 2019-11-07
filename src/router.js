import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/index.vue'),
    },
    {
      path: '/block',
      name: 'block',
      component: () => import('./views/block.vue'),
      meta: {
        title: 'Blocks',
        CNtitle: '區塊'
      },
      redirect: { name: 'blocksPage' },
      children: [
        {
          path: 'blocksPage',
          name: 'blocksPage',
          component: () => import('./views/blocksPage.vue'),
        },
        {
          path: 'blockDetail/:blockid',
          name: 'blockDetail',
          component: () => import('./views/blockDetail.vue'),
          meta: {
            title: 'Block Information',
            CNtitle: '區塊信息'
          }
        },
      ]
    },
    {
      path: '/transtion',
      name: 'transtion',
      component: () => import('./views/transtion.vue'),
      meta: {
        title: 'Transactions',
        CNtitle: '交易'
      },
      redirect: { name: 'transactionsPage', },
      children: [
        {
          path: 'transactionsPage',
          name: 'transactionsPage',
          component: () => import('./views/transactionsPage.vue'),
        },
        {
          path: 'transactionsDetail/:blockid',
          name: 'transactionsDetail',
          component: () => import('./views/transactionsDetail.vue'),
          meta: {
            title: "Tx Info",
            CNtitle: '交易信息'
          }
        },
      ]
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/account.vue'),
      meta: {
        title: 'Accounts',
        CNtitle: '账户'
      },
      // redirect:{name: 'address',},
      children: [
        {
          path: 'address/:blockid',
          name: 'address',
          component: () => import('./views/address.vue'),
          meta: {
            title: 'Address',
            CNtitle: '地址'
          }
        },
      ]
    },
    {
      path: '/tokens',
      name: 'tokens',
      component: () => import('./views/tokens.vue'),
      meta: {
        title: 'Token',
        CNtitle: '代幣'
      }
    },
    {
      path: '/tokens',
      name: 'token',
      component: () => import('./views/token.vue'),
      meta: {
        title: 'ERC-20 TokenTracker',
        CNtitle: 'ERC-20 令牌跟蹤器'
      },
      children: [
        {
          path: 'tokenDetail/:blockid',
          name: 'tokenDetail',
          component: () => import('./views/tokenDetail.vue'),
          meta: {
            title: ''
          },
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue'),
      meta: {
        title: 'Login',
        CNtitle: '登錄'
      },
    },
    { path: '*', component: () => import('./views/NotFound.vue'), },
  ]
})
