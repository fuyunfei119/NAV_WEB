<template>
    <div class="container">
        <NavBar></NavBar>
        <Document :table="tableName"></Document>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

import Document from '@/components/Document.vue';
import NavBar from '@/components/NavBar.vue';

const route = useRoute();
const tableName = route.query.table;

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