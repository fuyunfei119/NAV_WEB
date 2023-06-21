<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container-Card">
        <CardHeaderBar @UpdateRecordOnBeforeReturnBack="UpdateRecordOnBeforeReturnBack"></CardHeaderBar>
        <CardControlBar></CardControlBar>
        <CardContent ref="CardContentRef" :newEntity="route.query.newEntity" :RecordID="route.query.Id"></CardContent>
    </div>
</template>

<script setup>
import CardHeaderBar from './CardHeaderBar.vue';
import CardControlBar from './CardControlBar.vue';
import CardContent from './CardContent.vue';

import { useRoute } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const CardContentRef = ref();

const UpdateRecordOnBeforeReturnBack = () => {
    CardContentRef.value.InsertRecord();
}
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