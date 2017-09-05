import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
// import Profile from '@/components/Profile'
import Cuti from '@/components/Cuti'
import CutiPermintaan from '@/components/CutiPermintaan'
import CutiDiterima from '@/components/CutiDiterima'
import Aktif from '@/components/Aktif'
import AktifPermintaan from '@/components/AktifPermintaan'
import AktifDiterima from '@/components/AktifDiterima'
import BaakPm from '@/components/BaakPm'
import BaakPmNpm from '@/components/BaakPmNpm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'baak-pm',
          name: 'baakpm',
          component: BaakPm
        },
        {
          path: 'baak-pm/:npm',
          name: 'baak-pm',
          component: BaakPmNpm
        },
        // {
        //   path: 'profile',
        //   name: 'profile',
        //   component: Profile
        // },
        {
          path: 'cuti',
          name: 'cuti',
          component: Cuti,
          children: [
            {
              path: 'permintaan',
              name: 'permintaan-cuti',
              component: CutiPermintaan
            },
            {
              path: 'diterima',
              name: 'permintaan-diterima',
              component: CutiDiterima
            }
          ]
        },
        {
          path: 'aktif',
          name: 'aktif',
          component: Aktif,
          children: [
            {
              path: 'permintaan',
              name: 'permintaan-aktif',
              component: AktifPermintaan
            },
            {
              path: 'diterima',
              name: 'diterima-aktif',
              component: AktifDiterima
            }
          ]
        }
      ]
    }
  ]
})
