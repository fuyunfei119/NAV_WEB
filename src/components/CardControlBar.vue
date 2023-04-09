<template>
    <div class="card-controlbar">
        <div class="dropdown">
            <a href="">Home</a>
            <a href="">Print</a>
            <a href="">Release</a>
            <a href="">Post</a>
        </div>
        <hr>
    </div>
</template>

<script setup>

</script>

<style scoped>
.card-controlbar {
    flex: 1;
}

.dropdown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>