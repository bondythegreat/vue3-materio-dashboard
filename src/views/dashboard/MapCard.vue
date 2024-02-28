<script setup>
import Map from "@/components/Map.vue";
</script>

<template>
  <VCard class="position-relative">
    <VCardItem class="position-absolute title VCard title-bg">
      <VCardTitle>Attack Map</VCardTitle>
      <small class="text-uppercase">Indonesia</small>
    </VCardItem>
    <Map />
  </VCard>
</template>

<style lang="scss">
.title {
  z-index: 10;
}
.title-bg {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0 0 20px 0;
}
</style>
