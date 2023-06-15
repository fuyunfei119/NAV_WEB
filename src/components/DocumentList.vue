<template>
    <div class="Document-List">
        <FilterBarVue ref="FilterBarVueRef" :class="filterBarVisible ? 'show' : 'hidden'" :lines="lines"
            @OnUpdateLinesAfterAddFiters="OnUpdateLinesAfterAddFiters">
        </FilterBarVue>
        <div class="documents">
            <table>
                <thead>
                    <tr>
                        <th ref="domRef" v-for="(header, index) in lineHeader" :key="header"
                            @click="ToggleLineHeaderDropDown(index)">
                            {{ header }}
                        </th>

                        <ul v-if="showGroupDropdown"
                            :style="{ display: 'block !important', position: 'absolute', left: leftPadding }">
                            <li @click="SortLinesByAscending()">Ascending</li>
                            <li @click="SortLinesByDescending()" >Descending</li>
                            <li>Add Filter</li>
                            <li>Filter to this Value</li>
                            <li>Clear Filter</li>
                        </ul>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in lines" :key="item.id">
                        <td v-for="(value, header, index) in item" :key="header + index">
                            {{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import FilterBarVue from './FilterBar.vue';
import { defineProps, defineEmits, defineExpose, ref,computed, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    lines: Array,
    lineHeader: Object
});

const emits = defineEmits(['OnUpdateLinesAfterAddFiters']);

function OnUpdateLinesAfterAddFiters(lineAfterSetFilters) {
    emits('OnUpdateLinesAfterAddFiters', lineAfterSetFilters);
}

const filterBarVisible = ref(false);
const showGroupDropdown = ref(false);
const lastSelectedDropDown = ref(null);
const currentIndex = ref(null);

const sortingGroups = computed(() => 
  Object.keys(props.lineHeader).map(key => ({
    field: props.lineHeader[key],
    sort: 'Asc'
  }))
);

const leftPadding = ref('');

const domRef = ref();
const FilterBarVueRef = ref();

function OnToggleFilterBar() {
    filterBarVisible.value = !filterBarVisible.value;
}

function ToggleLineHeaderDropDown(index) {

    if (lastSelectedDropDown.value === index) {
        showGroupDropdown.value = !showGroupDropdown.value;
    }
    else {
        if (!showGroupDropdown.value) {
            showGroupDropdown.value = !showGroupDropdown.value;
        }
        const rect = domRef.value[index].getBoundingClientRect();
        leftPadding.value = rect.left + 'px';
    }

    currentIndex.value = index;
    lastSelectedDropDown.value = index;
}

const SortLinesByAscending = async () => {

    if (sortingGroups.value[currentIndex.value].sort === 'Asc') return;

    sortingGroups.value[currentIndex.value].sort = 'Asc';

    console.log(sortingGroups.value);
    console.log(FilterBarVueRef.value.selectedOption);

    await axios.post('http://localhost:8080/SortLines', {
        table: 'Customer',
        filters : FilterBarVueRef.value.selectedOption,
        sort : sortingGroups.value
    })
        .then(response => {
            
        })
        .catch(error => {
            console.log(error);
        });
}

const SortLinesByDescending = async () => {

    if (sortingGroups.value[currentIndex.value].sort === 'Desc') return;

    sortingGroups.value[currentIndex.value].sort = 'Desc';

    console.log(sortingGroups.value);
    console.log(FilterBarVueRef.value.selectedOption);

    await axios.post('http://localhost:8080/SortLines', {
        table: 'Customer',
        filters : FilterBarVueRef.value.selectedOption,
        sort : sortingGroups.value
    })
        .then(response => {
            
        })
        .catch(error => {
            console.log(error);
        });
}

defineExpose({
    OnToggleFilterBar
})
</script>

<style scoped>
.Document-List {
    overflow-x: auto;
    flex: 15;
    padding: 1% 2%;
    display: flex;
}

.Document-List>hr {
    margin: unset;
}

.documents {
    flex: 8;
    overflow: auto;
    height: 100%;
    width: 100%;
}

.documents>table {
    padding: 2% 2%;
    border-collapse: collapse;
}

tbody>tr:hover {
    background-color: var(--Accent);
    color: aliceblue;
}

tbody>tr {
    line-height: 25px;
}

tr {
    cursor: default;
}

th {
    cursor: pointer;
}

th:hover {
    border-bottom: 1px dotted var(--Accent);
    cursor: pointer;
}

td,
th {
    padding: 10px 20px;
    min-width: 100px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
}

ul {
    position: absolute;
    left: 0;
    display: none;
    background-color: #f9f9f9;
    padding: 0;
    margin: 0;
    list-style: none;
    border: 1px solid #ddd;
    max-width: 1000px;
    max-height: 500px;
    z-index: 999;
    overflow: auto;
}

ul li {
    padding: 10px;
    cursor: pointer;
    white-space: nowrap;
}

ul li:hover {
    background-color: var(--Accent);
}

.hidden {
    display: none !important;
}

.show {
    display: block !important;
}
</style>