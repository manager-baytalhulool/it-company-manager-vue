import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
/* layouts */
import AuthLayout from '@/layouts/AuthLayout.vue'
import MasterLayout from '@/layouts/MasterLayout.vue'
/* stores */
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'

/* views */
/* auth */
import LoginView from '@/views/auth/LoginView.vue'

import HomeView from '@/views/HomeView.vue'
import BackupsView from '@/views/backups/BackupsView.vue'
import AccountHeadsView from '@/views/account-heads/AccountHeadsView.vue'
import AccountHeadView from '@/views/account-heads/AccountHeadView.vue'
import AccountsView from '@/views/accounts/AccountsView.vue'
import AccountFormView from '@/views/accounts/AccountFormView.vue'
import CurrenciesView from '@/views/currencies/CurrenciesView.vue'
import ProjectsView from '@/views/projects/ProjectsView.vue'
import RepositoriesView from '@/views/repositories/RepositoriesView.vue'
import InvoicesView from '@/views/invoices/InvoicesView.vue'
import ReceiptsView from '@/views/receipts/ReceiptsView.vue'

let isInitiated: boolean = false

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,

      children: [
        {
          path: 'login',
          component: LoginView,
          meta: {
            layout: 'auth',
          },
        },
        // {
        //   path: 'register',
        //   component: RegisterView,
        //   meta: {
        //     layout: 'auth'
        //   }
        // },
        // {
        //   path: 'forgot-password',
        //   component: ForgotPasswordView,
        //   meta: {
        //     layout: 'auth'
        //   }
        // },
        // {
        //   path: 'reset-password/:token',
        //   component: ResetPasswordView,
        //   meta: {
        //     layout: 'auth'
        //   }
        // }
      ],
    },
    {
      path: '/',
      component: MasterLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'home.index',
          component: HomeView,
        },
        {
          path: 'account-heads',
          children: [
            {
              path: '',
              name: 'account-heads.index',
              component: AccountHeadsView,
            },
            {
              path: ':id',
              name: 'account-heads.show',
              component: AccountHeadView,
            },
          ],
        },
        {
          path: 'accounts',
          children: [
            {
              path: '',
              name: 'accounts.index',
              component: AccountsView,
            },

            {
              path: 'create',
              name: 'accounts.create',
              component: AccountFormView,
            },
            {
              path: ':id/edit',
              name: 'accounts.edit',
              component: AccountFormView,
            },
            // {
            //   path: 'create',
            //   name: 'accounts.create',
            //   component: InvoiceFormView,
            // },
            // {
            //   path: ':id',
            //   name: 'accounts.show',
            //   component: InvoiceView,
            // },
            // {
            //   path: ':id/edit',
            //   name: 'accounts.edit',
            //   component: InvoiceFormView,
            // },
          ],
        },
        {
          path: 'backups',
          name: 'backups.index',
          component: BackupsView,
        },

        {
          path: 'currencies',
          name: 'currencies.index',
          component: CurrenciesView,
        },

        {

          path: 'projects',
          name: 'projects.index',
          component: ProjectsView,
        },

        {
          path: 'repositories',
          name: 'repositories.index',
          component: RepositoriesView,
        },

        {
          path: 'invoices',
          name: 'invoices.index',
          component: InvoicesView,
        },

        {
          path: 'receipts',
          name: 'receipts.index',
          component: ReceiptsView,
        },
      ],
    },
  ],
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
  const appStore = useAppStore()
  const authStore = useAuthStore()

  if (!isInitiated) {
    await authStore.getUser()
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      // appStore.setAppLoading(false)
      next(`/auth/login`)
    } else {
      // appStore.setAppLoading(false)
      next()
    }
  } else {
    // appStore.setAppLoading(false)
    next()
  }

  if (!isInitiated) {
    appStore.setAppLoading(false)
    isInitiated = true
  }
})

export default router
