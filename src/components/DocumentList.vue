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
                            <div>
                                <h3 :class="sortingGroups[index].sort === 'Asc' ? 'show' : 'hidden'" >&uarr;</h3>
                                <h3 :class="sortingGroups[index].sort === 'Desc' ? 'show' : 'hidden'">&darr;</h3>
                                {{ header }}
                            </div>
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

function OnUpdateLinesAfterSortLines(lineAfterSortLines) {
    emits('OnUpdateLinesAfterAddFiters',lineAfterSortLines);
}

const filterBarVisible = ref(false);
const showGroupDropdown = ref(false);
const lastSelectedDropDown = ref(null);
const currentIndex = ref(null);
const showUpArrow = ref(false);
const showDownArrow = ref(false);

const sortingGroups = computed(() => 
  Object.keys(props.lineHeader).map(key => ({
    field: props.lineHeader[key],
    sort: ''
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

    sortingGroups.value.forEach(key => {
        key['sort'] = '';
    });

    sortingGroups.value[currentIndex.value].sort = 'Asc';

    await axios.post('http://localhost:8080/SortLines', {
        table: 'Customer',
        filters : FilterBarVueRef.value.selectedOption,
        sort : sortingGroups.value[currentIndex.value]
    })
        .then(response => {
            OnUpdateLinesAfterSortLines(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    
    showUpArrow.value = true;
    showDownArrow.value = false;
    showGroupDropdown.value = !showGroupDropdown.value;
}

const SortLinesByDescending = async () => {

    if (sortingGroups.value[currentIndex.value].sort === 'Desc') return;

    sortingGroups.value.forEach(key => {
        key['sort'] = '';
    });

    sortingGroups.value[currentIndex.value].sort = 'Desc';

    await axios.post('http://localhost:8080/SortLines', {
        table: 'Customer',
        filters : FilterBarVueRef.value.selectedOption,
        sort : sortingGroups.value[currentIndex.value]
    })
        .then(response => {
            OnUpdateLinesAfterSortLines(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    
    showDownArrow.value = true;
    showUpArrow.value = false;
    showGroupDropdown.value = !showGroupDropdown.value;
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

th > div {
    display: flex;
    align-items: center;
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