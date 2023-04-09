<template>
    <div class="container-navbar">
        <span class="product-name">
            Dynamics 365 Business Central
        </span>
    </div>
</template>

<script setup>

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
</style>