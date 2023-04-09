<template>
    <NavBar></NavBar>
    <SubNav @OnChangeControlBar="OnChangeControlBar"></SubNav>
    <ControlBarVue ref="ControlBarRef"></ControlBarVue>
    <ListPart></ListPart>
</template>

<script setup>
import ControlBarVue from "../components/ControlBar.vue";
import NavBar from "../components/NavBar.vue";
import SubNav from "../components/SubNav.vue";
import ListPart from "../components/ListPart.vue";
import { ref } from "vue";

const ControlBarRef = ref(ControlBarVue);

function OnChangeControlBar(modules) {
    ControlBarRef.value.RenderButtons(modules);
} 
</script>

<style scoped></style>