<template>
    <NavBar></NavBar>
    <SubNav @OnChangeControlBar="OnChangeControlBar"></SubNav>
    <ControlBarVue :listName="route.query.listName" @RaiseActionForList="RaiseActionForList" ref="ControlBarRef">
    </ControlBarVue>
    <ListPart ref="ListPartRef" :listName="route.query.listName"></ListPart>
</template>

<script setup>
import ControlBarVue from "../components/ControlBar.vue";
import NavBar from "../components/NavBar.vue";
import SubNav from "../components/SubNav.vue";
import ListPart from "../components/ListPart.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const ControlBarRef = ref(ControlBarVue);
const ListPartRef = ref(ListPart);
const tableName = ref();

function OnChangeControlBar(modules) {
    ControlBarRef.value.RenderButtons(modules);
}

function RaiseActionForList(actionName) {
    ListPartRef.value.updateLine(actionName);
}
</script>

<style scoped></style>