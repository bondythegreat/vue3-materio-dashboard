<script setup>
const income = ref(15067)
const expense = ref(2495)

const balance = income.value - expense.value;
</script>

<template>
  <VCard class="weather-card">
    <VCardItem>
      <div class="d-flex flex-row mb-4">
        <div class="flex-fill">
          <VCardTitle>Current Balance</VCardTitle>
          <small class="text-uppercase">Today</small>
        </div>
        <div class="pt-2">
          <VBtn size="small">
            <VIcon icon="ri-arrow-left-right-line mr-1"
size="10" /> Send Money
          </VBtn>
        </div>
      </div>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center gap-4">
        <h3 class="text-h3 pr-4">
          ${{ balance }}
        </h3>
        <div class="flex-fill">
          <div class="d-flex mb-4">
            <div class="flex-fill">
Income
</div>
            <div class="text-right">
<h5 class="text-success income-expenses">
+{{ income }}
</h5>
</div>
          </div>
          <div class="d-flex">
            <div class="flex-fill">
Expenses
</div>
            <div><h5 class="text-error income-expenses">
-{{ expense }}
</h5></div>
          </div>
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
