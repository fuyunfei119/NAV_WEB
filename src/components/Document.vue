<template>
    <div class="document-container">
        <DocumentHeader 
            @OnToggleFilterBar="OnToggleFilterBar"
            @OnUpdateLinesAfterQuerySearch="OnUpdateLinesAfterQuerySearch"
        ></DocumentHeader>
        <DocumentList 
            :lines="lines" 
            :lineHeader="lineHeader" 
            @OnUpdateLinesAfterAddFiters="OnUpdateLinesAfterAddFiters"
            ref="DocumentListRef">
        </DocumentList>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
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

const DocumentListRef = ref();

function OnToggleFilterBar() {
    DocumentListRef.value.OnToggleFilterBar();
}

function OnUpdateLinesAfterQuerySearch(lineAfterQuerySearch) {
    lines.value = lineAfterQuerySearch;
}

function OnUpdateLinesAfterAddFiters(lineAfterSetFilters) {
    lines.value = lineAfterSetFilters;
}

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