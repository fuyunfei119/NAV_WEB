<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container-Card">
        <CardHeaderBar @UpdateRecordOnBeforeReturnBack="UpdateRecordOnBeforeReturnBack"
            @UpdateRecordOnAfternewRecord="UpdateRecordOnAfternewRecord"
            @UpdateRecordOnAfterDeleteRecord="UpdateRecordOnAfterDeleteRecord"></CardHeaderBar>
        <CardControlBar @RaiseActionForCard="RaiseActionForCard"></CardControlBar>
        <CardContent ref="CardContentRef" :newEntity="route.query.newEntity" :RecordID="route.query.Id"
            :table="route.query.table" :listpart="listpartName" :subtable="tableName"></CardContent>
    </div>
</template>

<script setup>
import CardHeaderBar from './CardHeaderBar.vue';
import CardControlBar from './CardControlBar.vue';
import CardContent from './CardContent.vue';

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

const route = useRoute();
const CardContentRef = ref();

const listpartName = "salesLines";
const tableName = "SalesOrder";

const UpdateRecordOnAfternewRecord = () => {
    CardContentRef.value.InitializeNewRecord();
}

const UpdateRecordOnAfterDeleteRecord = () => {
    CardContentRef.value.DeleteRecord();
}

const UpdateRecordOnBeforeReturnBack = () => {
    CardContentRef.value.ReturnBack();
}

function RaiseActionForCard(actionName) {
    CardContentRef.value.RenderAction(actionName);
}

onMounted(async () => {

})
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