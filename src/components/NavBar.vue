<template>
    <div class="container-navbar">
        <span class="product-name">
            Dynamics 365 Business Central
        </span>

        <span @click="ToggleSearchArea()" class="search">
            Search
        </span>
    </div>

    <div @click="ToggleSearchArea()" class="backdrop" v-if="showSearchArea"></div>
    <div class="searcharea" v-if="showSearchArea">
        <input tabindex="1" type="text" v-model="searchContent" @keydown.enter="navigateToList" ref="searchInput">
    </div>
</template>

<script setup>
import { ref,watch,nextTick, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import List from './List.vue';

const router = useRouter();

const searchContent = ref();
const showSearchArea = ref(false);
const searchInput = ref();

const ToggleSearchArea = () => {
    showSearchArea.value = !showSearchArea.value;
}

const navigateToList = () => {

    router.push({
        path: '/list',
        name: 'list',
        component: List,
        query: {
            listName: searchContent.value
        }
    });

    nextTick(() => {
        // Reset searchContent after navigation
        searchContent.value = '';
    });
}

defineExpose({
    ToggleSearchArea
})
</script>

<style scoped>
.container-navbar {
    flex: 1;
    background: var(--Standard);
    display: flex;
}

.product-name {
    font-size: 16px;
    height: 48px;
    white-space: nowrap;
    color: #fff;
    margin-left: 15px;
    margin-right: auto;
    line-height: 43px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search {
    font-size: 16px;
    height: 48px;
    white-space: nowrap;
    color: #fff;
    margin-right: 15px;
    margin-left: auto;
    line-height: 43px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.searcharea {
    position: fixed;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -50%);
    background-color: rgb(235, 237, 239, 1);
    height: 10%;
    width: 80%;
    z-index: 2;
}

.searcharea > input {
    width: 100%;
    height: 100%;
    font-size: 36px;
    padding-left: 5%;
}
</style>