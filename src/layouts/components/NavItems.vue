<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
</script>

<template>
  <VerticalNavLink
    :item="{
      title: 'Dashboard',
      icon: 'ri-layout-masonry-fill',
      to: 'dashboard'
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Forms',
      icon: 'ri-layout-5-fill',
      to: 'form-layouts'
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Inbox',
      icon: 'ri-mail-fill',
      to: ''
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Stepper',
      icon: 'ri-layout-top-2-fill',
      to: ''
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'UI Elements',
      icon: 'ri-brush-fill',
      to: '',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Layout',
      icon: 'ri-table-fill',
      to: '',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Icons',
      icon: 'ri-draggable',
      to: '/icons',
    }"
  />

  <!-- 👉 layout -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Layout',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Subheaders',
      icon: 'ri-layout-4-line',
      to: '',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Builder',
      icon: 'ri-list-check',
      to: '',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'General',
      icon: 'ri-toggle-fill',
      to: '',
    }"
  />

  <!-- 👉 componentss -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Components',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: 'ri-table-2',
      to: 'tables'
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Maps',
      icon: 'ri-map-pin-2-fill',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'About',
      icon: 'ri-account-circle-line',
      href: 'https://bondan.senta.nu/',
      target: '_blank'
    }"
  />
</template>

<style lang="scss">
.layout-nav-type-vertical .layout-vertical-nav .nav-link {
  & > :first-child {
    border-radius: 0 4px 4px 0 !important;
  }
  & > .router-link-exact-active {
    background: #130d3d !important;
    
  }
}
</style>
