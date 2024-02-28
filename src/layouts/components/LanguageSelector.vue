<script setup>
import indo from '@images/flags/indo-flag.png';
import uk from '@images/flags/uk-flag.png';
import { ref } from 'vue';

const langOptions = [
  {
    img: uk,
    label: 'English',
  },
  {
    img: indo,
    label: 'Bahasa',
  },
]

const langSelectedIdx = ref(0)

const changeLang = selected => {
  langSelectedIdx.value = selected
}
</script>

<template>
  <div class="d-flex align-center cursor-pointer">
    <VImg
      :src="langOptions[langSelectedIdx].img"
      :width="20"
      class="mr-2"
    />
    <span>{{ langOptions[langSelectedIdx].label }}</span>
    <VIcon
      icon="ri-arrow-down-s-fill"
      class="ml-1"
      size="16"
    />
    <!-- SECTION Menu -->
    <VMenu
      activator="parent"
      width="230"
      location="bottom end"
      offset="14px"
    >
      <VList>
        <VListItem
          v-for="lang, idx in langOptions"
          :key="idx"
          link
          @click="changeLang(idx)"
        >
          <template #prepend>
            <VImg
              :src="lang.img"
              :width="20"
              class="mr-2"
            />
          </template>

          <VListItemTitle>{{ lang.label }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
    <!-- !SECTION -->
  </div>
</template>
