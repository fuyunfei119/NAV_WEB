<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container-Card">
        <CardHeaderBar></CardHeaderBar>
        <CardControlBar></CardControlBar>
        <CardContent :newEntity="route.query.newEntity" :RecordID="route.query.Id"></CardContent>
    </div>
</template>

<script setup>
import CardHeaderBar from './CardHeaderBar.vue';
import CardControlBar from './CardControlBar.vue';
import CardContent from './CardContent.vue';

import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
.container-Card {
    flex: 18;
    display: flex;
    flex-direction: column;
    padding: 0% 2% 2% 2%;
    overflow: hidden;
}
</style>