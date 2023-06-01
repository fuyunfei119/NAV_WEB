<template>
    <div class="document-container">
        <DocumentHeader></DocumentHeader>
        <DocumentList 
            :lines="lines"
            :lineHeader="lineHeader"
        ></DocumentList>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import DocumentHeader from './DocumentHeader.vue';
import DocumentList from './DocumentList.vue';
import axios from 'axios';

const props = defineProps({
    table: String
})

const tableName = props.table;
const url = 'http://localhost:8080/?table=' + tableName;

const lines = ref([]);
const lineHeader = ref({});
const isRecordLoaded = ref(false);

const findSet = () => {
    axios.get(url)
        .then(response => {
            lines.value = response.data;
            lineHeader.value = Object.keys(lines.value[0]);
        })
        .catch(error => {
            console.log(error);
        });
}

watch(lines, (newLines) => {
    if (!isRecordLoaded.value) {
        isRecordLoaded.value = true;
    }else {
        findSet();
    }
});

onMounted(async () => {
    findSet();
});


</script>

<style scoped>
.document-container {
    flex: 18;
    display: flex;
    flex-direction: column;
    margin: 2% 5% 2% 5%;
    overflow: hidden;
    background: var(--Subordinate);
}
</style>