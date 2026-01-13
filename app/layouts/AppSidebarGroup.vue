<script setup lang="ts">
import { LayoutDashboard, Users, Package, History, LogOut } from 'lucide-vue-next'
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Tableau de bord',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Projets',
    url: '/projects',
    icon: LayoutDashboard,
  },
  {
    title: 'Collaborateurs',
    url: '/team',
    icon: Users,
  },
  {
    title: 'Stock matériel',
    url: '/materials',
    icon: Package,
  },
  {
    title: 'Historique',
    url: '/history',
    icon: History,
  },
]
</script>

<template>
  <div>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton as-child>
                <NuxtLink :to="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton as-child>
            <button class="flex w-full cursor-pointer items-center gap-2">
              <LogOut class="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </div>
</template>
