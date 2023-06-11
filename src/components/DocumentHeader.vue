<template>
    <header>
        <div class="left">
            <h4>Select - Items |</h4>
        </div>

        <div class="right">
            <input type="text" placeholder="Search" v-model="SearchContent">
        </div>

        <a @click="openFilterBar()">
            <h4>Filter</h4>
        </a>
        <a class="back-button" @click="goback()">
            <h4>Back</h4>
        </a>
    </header>
</template>

<script setup>
import router from '@/router';
import { ref, watch, defineEmits } from 'vue';
import { debounce } from 'lodash';
import axios from 'axios';

const emits = defineEmits(['OnToggleFilterBar','OnUpdateLinesAfterQuerySearch']);

function openFilterBar() {
    emits('OnToggleFilterBar');
}

const SearchContent = ref(null);

const QueryWithSearchContent = debounce(async () => {
    await axios.post('http://localhost:8080/FetchSearchQuery', {
        table: 'Customer',
        content: SearchContent.value
    })
        .then(response => {
            emits('OnUpdateLinesAfterQuerySearch', response.data);
        })
        .catch(error => {
            console.log(error);
        });
}, 300);

watch(SearchContent, (newValue, oldValue) => {
    QueryWithSearchContent();
});

const goback = () => {
    router.go(-1);
}
</script>

<style scoped>
header {
    display: flex;
    flex: 1;
    padding: 0% 2%;
    background: rgb(246, 247, 248);
}

.left {
    flex: 1;
    display: flex;
}

.right {
    flex: 5;
    display: flex;
    align-items: center;
}

.right>input {
    padding: 5px;
    font-size: medium;
}

.show {
    display: block;
}

.hidden {
    display: none;
}
</style>