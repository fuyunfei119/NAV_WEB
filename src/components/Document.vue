<template>
    <div class="document-container">
        <DocumentHeader></DocumentHeader>
        <DocumentList></DocumentList>
    </div>
</template>

<script setup>
import DocumentHeader from './DocumentHeader.vue';
import DocumentList from './DocumentList.vue';
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