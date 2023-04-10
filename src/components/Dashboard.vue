<template>
    <NavBar></NavBar>
    <SubNav @OnChangeControlBar="OnChangeControlBar"></SubNav>
    <ControlBarVue ref="ControlBarRef"></ControlBarVue>
    <DashboardContent></DashboardContent>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import SubNav from "../components/SubNav.vue";
import ControlBarVue from "../components/ControlBar.vue";
import DashboardContent from "./DashboardContent.vue";
import { ref } from "vue";

const ControlBarRef = ref(ControlBarVue);

function OnChangeControlBar(modules) {
    ControlBarRef.value.RenderButtons(modules);
} 
</script>

<style scoped></style>