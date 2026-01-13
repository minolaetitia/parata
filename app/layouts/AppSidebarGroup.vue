<script setup lang="ts">
import { LayoutDashboard, Users, Package, History } from 'lucide-vue-next'
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
import UserProfile from '@/components/UserProfile.vue'

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
      <UserProfile />
    </SidebarFooter>
  </div>
</template>
