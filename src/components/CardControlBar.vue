<template>
    <div class="card-controlbar">
        <div v-for="button in ButtonsOfDefault" :key="button">
            <a @click="RaiseAction(button)" >{{ button }}</a>
        </div>
    </div>
    <hr>
</template>

<script setup>
const ButtonsOfDefault = ["Home", "Print", "Release", "Post", "Edit"];

const emits = defineEmits(['RaiseActionForCard']);

const RaiseAction = (button) => {
    emits('RaiseActionForCard',button);
}

</script>

<style scoped>
.card-controlbar {
    flex: 1;
    display: flex;
}

.card-controlbar > div {
    flex-basis: 10%;
    height: 20px;
}

.card-controlbar > div:hover {
    cursor: pointer;
    text-decoration: underline;
}

hr {
    width: 100%;
}
</style>