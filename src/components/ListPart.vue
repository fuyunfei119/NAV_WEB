<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="inner-container">
            <table :class="{ 'expand-table': expand }">
                <thead>
                    <tr>
                        <th v-for="header in lineHeader" :key="header" :class="{ 'expand-th': expand }">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, rowIndex) in lines" :key="item.id"
                        :class="{ 'selected': selectedRowIndex.includes(rowIndex) }" @click="selectRow(rowIndex)">
                        <td v-for="(value, header, index) in item" :key="header + index" :tabindex="0"
                            @click=" index == 0 ? openCard(value) : null">
                            {{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Card from './Card.vue';

const expand = computed(() => lineHeader.value.length > 6);
const lastLineIndex = computed(() => lines.value.length - 1);

const lines = ref([]);
const lineHeader = ref({});
const isRecordLoaded = ref(false);

const selectedRowIndex = ref([0]);
let upToDate = false;
let shiftPressed = false;
const keys = ['ArrowDown', 'ArrowUp', 'Shift'];

const router = useRouter();
const openCard = (RecordID) => {
    router.push(
        {
            path: '/card',
            name: 'card',
            component: Card,
            query: {
                Id: RecordID
            },
        },
    )
}

function selectRow(rowIndex) {
    if (shiftPressed) {
        selectedRowIndex.value.push(rowIndex);
    } else {
        selectedRowIndex.value = [];
        selectedRowIndex.value[0] = rowIndex;
    }

    console.log(selectedRowIndex.value);

    upToDate = true;
}

function handleKeydown(event) {

    if (keys.includes(event.key)) {
        switch (event.key) {
            case "ArrowDown":
                handleArrowDown();
                break;
            case "ArrowUp":
                handleArrowUp();
                break;
            case "Shift":
                handleShift(event);
                break;
        }
    }
}

function handleArrowDown() {
    if (selectedRowIndex.value[0] === lastLineIndex.value) return;

    if (!shiftPressed) {
        selectRow(selectedRowIndex.value[0] + 1);
    } else {
        selectedRowIndex.value.push(selectedRowIndex.value[0] + 1);
    }

}

function handleArrowUp() {
    if (selectedRowIndex.value[0] === 0) return;

    if (!shiftPressed) {
        selectRow(selectedRowIndex.value[0] - 1);
    } else {
        selectedRowIndex.value.push(selectedRowIndex.value[0] - 1);
    }

}

function handleShift(event) {
    if (event.shiftKey) {
        shiftPressed = true;
    }
}

function handleKeyUp(event) {

    console.log(event.key);

    if (keys.includes(event.key)) {
        switch (event.key) {
            case "ArrowDown":
                break;
            case "ArrowUp":
                break;
            case "Shift":
                shiftPressed = false;
                break;
        }
    }
}

onBeforeMount(async () => {

    axios.post('http://localhost:8080/List/OnBeforeMounted', {
        table: 'Customer'
    })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
})

onMounted(async () => {

    axios.get('http://localhost:8080/List/OnMounted', {
        params: {
            list: 'Customer'
        }
    })
        .then(response => {
            lines.value = response.data;
            lineHeader.value = Object.keys(lines.value[0]);
            isRecordLoaded.value = !isRecordLoaded.value;
            upToDate = true;
        })
        .catch(error => {
            console.log(error);
        });

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyUp);
});

onBeforeUpdate(async () => {

    if (isRecordLoaded.value) {
        console.log("OnAfterGetRecord");
        axios.post('http://localhost:8080/List/OnBeforeUpdate', {
            table: 'Customer',
            records: lines.value
        })
            .then(response => {
                lines.value = response.data;
                lineHeader.value = Object.keys(lines.value[0]);
                isRecordLoaded.value = !isRecordLoaded.value;
            })
            .catch(error => {
                console.log(error);
            });
    }
})

onUpdated(async () => {
    // console.log("OnAfterGetCurrRecord");

    if (!isRecordLoaded.value && upToDate) {

        console.log(lines.value[selectedRowIndex.value.at(0)]);

        axios.post('http://localhost:8080/List/OnUpdated', {
            table: 'Customer',
            record: lines.value[selectedRowIndex.value.at(0)]
        })
            .then(response => {
                lines.value[selectedRowIndex.value.at(0)] = response.data;
                upToDate = false;
            })
            .catch(error => {
                console.log(error);
            });
    }
})

onBeforeUnmount(async () => {
    // console.log("OnQueryClosePage");

    axios.post('http://localhost:8080/List/OnBeforeUnmount', {
        table: 'Customer'
    })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
})

onUnmounted(async () => {
    // console.log("OnClosePage");
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('keyup', handleKeyUp);
})
</script>

<style scoped>
.container {
    flex: 15;
    background: rgb(246, 247, 248);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0% 5% 2% 5%;
    overflow: auto;
}

.inner-container {
    overflow: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

table {
    display: table;
    table-layout: fixed;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
}

thead>tr,
tbody>tr {
    line-height: 25px;
}

tr:hover {
    background-color: var(--Accent);
    color: aliceblue;
}

tr {
    width: 100%;
}

th {
    cursor: pointer;
    resize: horizontal;
}

td,
th {
    padding: 10px 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

td:first-of-type {
    display: flex;
    justify-content: space-between;
}

td>span:hover {
    /* display: flex !important;
    justify-content: space-between !important; */
}

.expand-th {
    min-width: 25%;
}

.expand-table {
    width: 100%;
    display: table;
    /*table-layout: fixed;*/
    table-layout: auto;
    text-align: left;
    border-collapse: collapse;
}

.selected {
    background-color: var(--Accent);
}
</style>