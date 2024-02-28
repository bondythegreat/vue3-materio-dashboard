<script setup>
defineProps({
  item: Object,
})
</script>

<template>
  <VCard class="weather-item-card">
    <VCardItem class="text-center px-2">
      <VIcon 
        :icon="item.icon"
        size="40"
        class="d-block mx-auto mb-2"
      />
      <small>{{ item.label }}</small>
      <h3
        class="text-h6"
        v-html="item.value"
      />
    </VCardItem>
  </VCard>
</template>

<style lang="scss">
.weather-item-card {
  background-color: rgba(255,255,255,0.02);
}
</style>
