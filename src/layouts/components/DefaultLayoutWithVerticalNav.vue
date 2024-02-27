<script setup>
import Footer from '@/layouts/components/Footer.vue'
import NavItems from '@/layouts/components/NavItems.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import itsecLogo from '@images/itsec-logo.svg?raw'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import LanguageSelector from './LanguageSelector.vue'

const search = ref("");
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line" />
        </IconBtn>

        <!-- 👉 Search -->
        <div
          class="d-flex align-center cursor-pointer"
          style="user-select: none;"
        >
          <!-- 👉 Search Trigger button -->
          
            <v-text-field
              v-model="search"
              color="primary"
              placeholder="Search"
              variant="underlined"
              size="30"
            />
            <IconBtn>
              <VIcon icon="ri-search-line" />
            </IconBtn>
        </div>

        <VSpacer />

        <RouterLink  class="mx-3" to="tables">
          <IconBtn>
          <VIcon icon="ri-notification-2-line" />
          <v-badge
          color="error"
          content="2"
          class="small-badge"
        ></v-badge>
          </IconBtn>
        </RouterLink>

        <IconBtn class="mx-3">
          <VIcon icon="ri-mail-line" />
          <v-badge
          color="primary"
          content="7"
          class="small-badge"
        ></v-badge>
        </IconBtn>

        <LanguageSelector class="mx-4" />
        <!--
        <NavbarThemeSwitcher class="me-2" />
        -->

        <UserProfile class="ml-3" />
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink
        to="/"
        class="app-logo app-title-wrapper"
      >

        <!-- eslint-disable vue/no-v-html -->
        <div
          class="d-flex"
          v-html="itsecLogo"
        />
        <!-- eslint-enable -->
      </RouterLink>

      <IconBtn
        class="d-block d-lg-none"
        @click="toggleIsOverlayNavActive(false)"
      >
        <VIcon icon="ri-close-line" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss">
a {
  color: inherit;
}
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
.small-badge span {
  font-size: 0.6em;
  width: 1.6em;
  height: 1.6em;
  min-width: inherit;
  bottom: -100% !important;
  left: 0 !important;
}
</style>
