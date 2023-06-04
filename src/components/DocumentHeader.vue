<template>
    <header>
        <div class="left">
            <h4>Select - Items |</h4>
        </div>

        <div class="right">
            <a href="">Search</a>
        </div>

        <a class="back-button" @click="goback()">
            <h4>Back</h4>
        </a>
    </header>
</template>

<script setup>
import router from '@/router';

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

.right>a {
    margin-right: 20px;
}

.back-button {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}
</style>