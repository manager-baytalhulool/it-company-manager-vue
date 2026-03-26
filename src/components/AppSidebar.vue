<script setup lang="ts">
import AppSidebarItem from '@/components/AppSidebarItem.vue'
import AppFeatherIcon from './AppFeatherIcon.vue'
const appName = import.meta.env.VITE_APP_NAME
</script>

<template>
  <nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
      <RouterLink class="sidebar-brand" to="">
        <span class="align-middle">{{ appName }}</span>
      </RouterLink>

      <ul class="sidebar-nav">
        <li class="sidebar-header">Pages</li>

        <!-- active -->
        <!-- <li class="sidebar-item">
          <RouterLink class="sidebar-link" to="/">
            <i class="align-middle" data-feather="sliders"></i>
            <span class="align-middle">Dashboard</span>
          </RouterLink>
        </li> -->

        <AppSidebarItem icon="sliders" text="Dashboard" url="/" />

        <!-- <li class="sidebar-item">
          <a
            data-bs-target="#accounts"
            data-bs-toggle="collapse"
            class="sidebar-link collapsed"
            aria-expanded="false"
          >
            <AppFeatherIcon icon="book-open" />
            <span class="align-middle">Accounts</span>
          </a>
          <ul
            id="accounts"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar"
            style=""
          >
            <li class="sidebar-item">
              <RouterLink class="sidebar-link" to="/accounts/account-heads"
                >Account Heads</RouterLink
              >
            </li>
            <li class="sidebar-item">
              <RouterLink class="sidebar-link" to="/accounts/trial-balance"
                >Trial Balance</RouterLink
              >
            </li>
          </ul>
        </li> -->

        <AppSidebarItem icon="database" text="Accounts" url="/accounts" />

        <AppSidebarItem icon="book" text="Account Heads" url="/account-heads" />

        <AppSidebarItem icon="hard-drive" text="Backups" url="/backups" />

        <AppSidebarItem icon="dollar-sign" text="Currencies" url="/currencies" />

        <AppSidebarItem icon="box" text="Projects" url="/projects" />

        <AppSidebarItem icon="box" text="Products" url="/products" />

        <AppSidebarItem icon="minus-circle" text="Expenses" url="/expenses" />

        <AppSidebarItem icon="credit-card" text="Loans" url="/loans" />

        <AppSidebarItem icon="git-merge" text="Repositories" url="/repositories" />

        <AppSidebarItem icon="paperclip" text="Invoices" url="/invoices" />

        <AppSidebarItem icon="book-open" text="Receipts" url="/receipts" />

        <!-- <li class="sidebar-item">
          <a href="#auth" data-bs-toggle="collapse" class="sidebar-link collapsed">
            <i class="align-middle" data-feather="users"></i>
            <span class="align-middle">Reports</span>
          </a>
          <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li class="sidebar-item">
              <a class="sidebar-link" href="{{ url('reports/monthly') }}">Monthly sales</a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="{{ url('reports/bi-monthly') }}">Bimonthly sales</a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="{{ url('reports/monthly-receipts') }}"
                >Monthly receipts</a
              >
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="{{ url('reports/bi-monthly-receipts') }}"
                >Bimonthly Receipts</a
              >
            </li>
          </ul>
        </li> -->

        <li class="sidebar-item">
          <a href="#reports" data-bs-toggle="collapse" class="sidebar-link collapsed">
            <AppFeatherIcon icon="users" />
            <span class="align-middle">Reports</span>
          </a>
          <ul
            id="reports"
            class="sidebar-dropdown list-unstyled collapse"
            data-bs-parent="#sidebar"
          >
            <AppSidebarItem text="Monthly sales" url="/reports/monthly-sales" />
            <AppSidebarItem text="Bimonthly sales" url="/reports/bi-monthly-sales" />
            <AppSidebarItem text="Monthly receipts" url="/reports/monthly-receipts" />
            <AppSidebarItem text="Bimonthly Receipts" url="/reports/bi-monthly-receipts" />
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
