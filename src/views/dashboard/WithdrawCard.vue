<script setup>
const withdrawNum = ref(15067)
const confirmNum = ref(337576004477.1)

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
</script>

<template>
  <VCard class="weather-card">
    <VCardItem>
      <div class="d-flex flex-row mb-4">
        <div class="flex-fill">
          <VCardTitle>Withdraw Funds</VCardTitle>
          <small class="text-uppercase">Today</small>
        </div>
        <div class="pt-2">
          <VBtn size="small">
            <VIcon 
              icon="ri-download-line mr-1"
              size="10"
            /> 
            Withdraw
          </VBtn>
        </div>
      </div>
    </VCardItem>

    <VCardText>
      <div class="d-flex">
        <div class="flex-fill">
          <div class="d-flex pb-4">
            <div class="flex-fill">
              <VIcon icon="ri-calendar-view mr-2" /> Amount:
            </div>
            <div class="text-right">
              <h5 class="income-expenses">
                {{ formatter.format(withdrawNum) }}
              </h5>
            </div>
          </div>
          <VDivider />
          <div class="d-flex py-4">
            <div class="flex-fill">
              <VIcon icon="ri-file-line mr-2" /> Confirmation N:
            </div>
            <div>
              <h5 class="income-expenses">
                {{ confirmNum }}
              </h5>
            </div>
          </div>
          <VDivider />
        </div>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.income-expenses {
  font-size: 1em;
  font-weight: 500;
}
</style>
