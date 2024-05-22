<script setup lang="ts">
import Navbar from "@/components/layout/Navbar.vue";
// import TheFooter from "~~/components/layout/TheFooter.vue";
</script>

<template>
  <div class="dark:bg-black">
    <Navbar/>
      <slot/>
      <TheFooter/>
  </div >
</template> 