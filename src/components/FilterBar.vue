<template>
    <div class="filter-container">
        <h4>Filter Groups</h4>
        <hr>
        <h4>Filter List By :</h4>

        <div v-for="filter in filterGroups" :key="filter">

            {{ filter }}

            <div class="dropdown">

                <input type="text" @click="toggleDropdown(filter)" ref="domRef" v-model="selectedOption">

                <ul v-if="isDropdownOpen(filter)" class="show">
                    <li v-for="Option in dropdownOptions" :key="Option" @click="selectOptions(Option, filter)"> {{ Option }}
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// const filterGroups = ref([]);
// const filterGroups = ['user_id', 'first_name'];
const filterGroups = ['Group 1', 'Group 2', 'Group 3'];
const dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 3 Lorem ipsum dolor sit amet consectetur adipisicing elit.']
const selectedOption = ref([]);
const filterConditions = ref({});

const openDropdowns = ref([]);
const domRef = ref();

function toggleDropdown(filter) {
    const index = openDropdowns.value.indexOf(filter);
    if (index === -1) {
        openDropdowns.value.push(filter);
    } else {
        openDropdowns.value.splice(index, 1);
    }
}

function isDropdownOpen(filter) {
    return openDropdowns.value.includes(filter);
}

function selectOptions(Option, filter) {
    console.log(filter, Option);
    selectedOption.value = [...selectedOption.value, Option];

}

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
    document.removeEventListener('click', closeDropdown);
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
</script>

<style scoped>
.filter-container {
    flex: 1;
}

.filter-container>h4 {
    margin-top: 10px;
}

.filter-container>div {
    display: flex;
    flex-direction: column;
    margin: 25px 0px;
}

.dropdown {
    margin-top: 10px;
    position: relative;
    display: inline-block;
}

.dropdown>input {
    width: 100%;
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
</style>