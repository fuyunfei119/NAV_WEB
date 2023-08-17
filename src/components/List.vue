<template>
    <NavBar ref="NavBarRef"></NavBar>
    <SubNav @OnChangeControlBar="OnChangeControlBar"></SubNav>
    <ControlBarVue :listName="route.query.listName" @RaiseActionForList="RaiseActionForList" ref="ControlBarRef">
    </ControlBarVue>
    <ListPart :key="route.query.listName" ref="ListPartRef" :listName="route.query.listName"></ListPart>
</template>

<script setup>
import ControlBarVue from "../components/ControlBar.vue";
import NavBar from "../components/NavBar.vue";
import SubNav from "../components/SubNav.vue";
import ListPart from "../components/ListPart.vue";
import { onUpdated, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const ControlBarRef = ref(ControlBarVue);
const ListPartRef = ref(ListPart);
const NavBarRef = ref(NavBar);

function OnChangeControlBar(modules) {
    ControlBarRef.value.RenderButtons(modules);
}

function RaiseActionForList(actionName) {
    ListPartRef.value.updateLine(actionName);
}

onUpdated(async () => {
    NavBarRef.value.ToggleSearchArea();
})
</script>

<style scoped></style>