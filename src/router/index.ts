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
import ProjectFormView from '@/views/projects/ProjectFormView.vue'
import RepositoriesView from '@/views/repositories/RepositoriesView.vue'
import RepositoryFormView from '@/views/repositories/RepositoryFormView.vue'
import InvoicesView from '@/views/invoices/InvoicesView.vue'
import ReceiptsView from '@/views/receipts/ReceiptsView.vue'
import InvoiceFormView from '@/views/invoices/InvoiceFormView.vue'
import ReceiptFormView from '@/views/receipts/ReceiptFormView.vue'
import AccountView from '@/views/accounts/AccountView.vue'
import ProjectView from '@/views/projects/ProjectView.vue'
import RepositoryView from '@/views/repositories/RepositoryView.vue'
import ReceiptView from '@/views/receipts/ReceiptView.vue'

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
            {
              path: ':id',
              name: 'accounts.show',
              component: AccountView,
            },
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
          children: [
            {
              path: '',
              name: 'projects.index',
              component: ProjectsView,
            },
            {
              path: 'create',
              name: 'projects.create',
              component: ProjectFormView,
            },
            {
              path: ':id/edit',
              name: 'projects.edit',
              component: ProjectFormView,
            },
            {
              path: ':id',
              name: 'projects.show',
              component: ProjectView,
            },
          ],
        },

        {
          path: 'repositories',
          children: [
            {
              path: '',
              name: 'repositories.index',
              component: RepositoriesView,
            },
            {
              path: 'create',
              name: 'repositories.create',
              component: RepositoryFormView,
            },
            {
              path: ':id/edit',
              name: 'repositories.edit',
              component: RepositoryFormView,
            },
            {
              path: ':id/',
              name: 'repositories.show',
              component: RepositoryView,
            },
          ],
        },


        {
          path: 'invoices',
          children: [
            {
              path: '',
              name: 'invoices.index',
              component: InvoicesView,
            },
            {
              path: 'create',
              name: 'invoices.create',
              component: InvoiceFormView,
            },
            {
              path: ':id/edit',
              name: 'invoices.edit',
              component: InvoiceFormView,
            },
          ],
        },

        {
          path: 'receipts',
          children: [
            {
              path: '',
              name: 'receipts.index',
              component: ReceiptsView,
            },
            {
              path: 'create',
              name: 'receipts.create',
              component: ReceiptFormView,
            },
            {
              path: ':id/edit',
              name: 'receipts.edit',
              component: ReceiptFormView,
            },
            {
              path: ':id',
              name: 'receipts.show',
              component: ReceiptView,
            },
          ],
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
