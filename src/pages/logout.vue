<script setup>
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

const logout = () => {
  localStorage.removeItem('itsecToken');
  router.push({path: 'login'})
}

onMounted(()=> logout())
</script>
<template></template>
