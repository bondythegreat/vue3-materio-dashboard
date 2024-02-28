<script setup>
import Map from "@/components/Map.vue";
</script>

<template>
  <VCard class="position-relative">
    <Map />
  </VCard>
</template>

<style lang="scss">
.v-card .trophy {
  position: absolute;
  inline-size: 5.188rem;
  inset-block-end: 1.25rem;
  inset-inline-end: 1.25rem;
}
</style>
