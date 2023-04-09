<script setup>
import NavBar from "../components/NavBar.vue";
import Card from "@/components/Card.vue";
</script>

<template>
  <div class="container">
    <NavBar></NavBar>
    <Card></Card>
  </div>
</template>

<style scoped>
.container {
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
}
</style>
