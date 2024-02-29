<script setup>
import Map from "@/components/Map.vue";
import { useAttackMapStore } from '@/stores/attacksMap';

const store = useAttackMapStore()
const { getFinalAttackList } = store;
const attackList = ref(computed(() => getFinalAttackList()));
</script>

<template>
  <VCard class="position-relative">
    <VRow class="position-md-absolute row-info">
      <VCol
        cols="12"
        class="d-flex flex-column"
      >
        <VCardItem class="title VCard title-bg">
          <div class="d-flex align-center">
            <div class="flex-fill">
              <VCardTitle>Attack Map</VCardTitle>
              <small class="text-uppercase">Indonesia</small>
            </div>
            <div>
              <VIcon
                icon="ri-bug-fill"
                size="36"
              />
            </div>
          </div>
        </VCardItem>
        <VCardItem class="list-container flex-fill align-start">
          <div
            v-for="attackItem, idx in attackList"
            :key="idx"
            class="attack-item"
          >
            <strong>{{ attackItem.from?.name }} </strong> to <strong> {{ attackItem.to?.name }}</strong>
          </div>
        </VCardItem>
      </VCol>
    </VRow>
    <VRow
      class="mt-0"
      no-gutter
    >
      <VCol
        cols="12"
        class="pt-0"
        no-gutter
      >
        <Map />
      </VCol>
    </VRow>
  </VCard>
</template>

<style>
.title {
  z-index: 10;
}
.title-bg {
  background-color: rgba(0, 0, 0, 0.7);
}
.list-container {
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
}

.list-container > div {
  align-self: flex-start;
}

.attack-item {
  border-bottom: 1px solid #666666;
  padding: 10px 0;
  font-size: 0.9em;
}
.row-info {
  z-index: 1;
  @media only screen and (min-width: 768px) {
    position: absolute;
    width: 25%;
    bottom: 0;
    top: 0;
  }
}
</style>
