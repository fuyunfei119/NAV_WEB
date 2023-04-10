<template>
    <div class="container">
        <NavBar></NavBar>
        <Document></Document>
    </div>
</template>

<script setup>
import Document from '@/components/Document.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<style scoped>
.container {
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  background: rgba(153, 153, 153, .4);
}
</style>