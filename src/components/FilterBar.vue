<template>
    <div class="filter-container">
        <h4>Filter Groups</h4>
        <hr>
        <h4>Filter List By :</h4>

        <div class="filter-group-container">
            <div v-for="filter in filterGroups" :key="filter">

                <h5 @click="removeFilter(filter)">{{ filter }}</h5>

                <div class="dropdown">

                    <input type="text" @click="toggleDropdown(filter)" ref="domRef" v-model="selectedOption[filter]">

                    <ul v-if="isDropdownOpen(filter)" class="show">
                        <li v-for="Option in dropdownOptions[filter]" :key="Option" @click="selectOptions(Option, filter)">
                            {{ Option }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <hr>

        <div class="add-group" @click="toggleGroupDropdown()" ref="filterGroupDropDown">
            <div>
                <h1>+</h1>
                <h4>Add Filter</h4>
            </div>
            <ul v-if="showfilterGroupDropdown" class="show">
                <li v-for="filterName in filterGroupInit" :key="filterName" @click="selectFilterGroup(filterName)">
                    {{ filterName }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, defineEmits, defineProps, defineExpose } from 'vue';
import { debounce } from 'lodash';
import axios from 'axios';

const props = defineProps({
    lines: Array
});

const emits = defineEmits(['OnUpdateLinesAfterAddFiters']);

const filterGroupInit = ref([]);
const filterGroups = ref([]);
const dropdownOptions = ref({});
const selectedOption = ref({});

const openDropdowns = ref([]);
const domRef = ref();
const filterGroupDropDown = ref();
const showfilterGroupDropdown = ref(false);

function toggleDropdown(filter) {
    const index = openDropdowns.value.indexOf(filter);
    if (index === -1) {
        openDropdowns.value.push(filter);
        fetchDropDownOptions(filter);
    } else {
        openDropdowns.value.splice(index, 1);
    }
}

function toggleGroupDropdown() {
    showfilterGroupDropdown.value = !showfilterGroupDropdown.value;
}

const InitFilterGroups = async () => {
    await axios.post(`http://localhost:8080/getfilterGroups`, {
        table: "Customer"
    })
        .then(response => {
            filterGroupInit.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

function isDropdownOpen(filter) {
    return openDropdowns.value.includes(filter);
}

const fetchDropDownOptions = async (filter) => {
    await axios.post(`http://localhost:8080/getfilterOptions`, {
        table: "Customer",
        filterName: filter
    })
        .then(response => {
            dropdownOptions.value[filter] = response.data;
        })
        .catch(error => {
            console.log(error);
        });
};

function selectOptions(Option, filter) {
    if (selectedOption.value[filter] !== undefined && (selectedOption.value[filter].toString().endsWith("|") || selectedOption.value[filter].toString().endsWith("&"))) {
        selectedOption.value[filter] += Option;
    } else {
        selectedOption.value[filter] = Option;
    }
    console.log(typeof selectedOption.value[filter]);
    console.log(selectedOption.value);
}

function removeFilter(filter) {
    const index = filterGroups.value.indexOf(filter);
    if (index !== -1) {
        filterGroups.value.splice(index, 1);
    }
    delete selectedOption.value[filter];
}

function selectFilterGroup(filterName) {
    filterGroups.value.push(filterName);
}

onMounted(() => {
    document.addEventListener('click', closeDropdown);
    InitFilterGroups();
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
});

const FindSetByFilterConditions = debounce(async () => {
    await axios.post('http://localhost:8080/FindSetByFilters', {
        table: 'Customer',
        filters: selectedOption.value
    })
        .then(response => {
            emits('OnUpdateLinesAfterAddFiters', response.data);
        })
        .catch(error => {
            console.log(error);
        });
}, 300);

watch(selectedOption.value, (newValue, oldValue) => {
    FindSetByFilterConditions();
});

function closeDropdown(event) {
    for (const dropdown in domRef._rawValue) {
        if (Object.hasOwnProperty.call(domRef._rawValue, dropdown)) {
            const element = domRef._rawValue[dropdown];
            if (!element || element == event.target) {
                return;
            }
        }
    }

    openDropdowns.value = [];
}

defineExpose({
    selectedOption
})
</script>

<style scoped>
.filter-container {
    flex: 1;
}

.filter-container>h4 {
    margin-top: 10px;
}

.filter-group-container>div>h5 {
    margin: unset !important;
}

.filter-group-container>div>h5:hover {
    cursor: pointer;
}

.filter-container>div {
    display: flex;
    flex-direction: column;
    margin: 25px 0px;
}

.dropdown {
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    display: inline-block;
}

.dropdown>input {
    width: 95%;
    padding: 5px 0;
}

ul {
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    background-color: #f9f9f9;
    padding: 0;
    margin: 0;
    list-style: none;
    border: 1px solid #ddd;
    min-width: 100%;
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

ul.show {
    display: block;
}

.add-group {
    margin: unset !important;
    position: relative;
    display: inline-block;
}

.add-group:hover {
    cursor: pointer;
}

.add-group>div {
    display: flex;
    align-items: center;
}

.add-group>div>h1,
.add-group>div>h4 {
    margin: unset !important;
}
</style>