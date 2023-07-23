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
                            @click=" index == 0 ? openCard(value) : null" :contenteditable="contenteditable"
                            @blur="handleBlur(value, header, rowIndex, item, $event)" ref="tdElement">
                            {{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, computed, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Card from './Card.vue';

const expand = computed(() => lineHeader.value.length > 6);
const lastLineIndex = computed(() => lines.value.length - 1);

const lines = ref([]);
const lineHeader = ref({});
const isRecordLoaded = ref(false);
const contenteditable = ref(false);

const tdElement = ref(null);

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
        if (selectedRowIndex.value[selectedRowIndex.value.length - 1] + 1 != rowIndex) {
            for (let index = Math.max(...selectedRowIndex.value) + 1; index < rowIndex + 1; index++) {
                selectedRowIndex.value.push(index);
            }
        } else {
            selectedRowIndex.value.push(rowIndex);
        }

    } else {
        selectedRowIndex.value = [];
        selectedRowIndex.value[0] = rowIndex;
    }

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
    if (selectedRowIndex.value.includes(lastLineIndex.value)) return;

    if (!shiftPressed) {
        selectRow(selectedRowIndex.value[0] + 1);
    } else {
        if (!selectedRowIndex.value.includes(Math.max(...selectedRowIndex.value) + 1)) {
            selectedRowIndex.value.push(Math.max(...selectedRowIndex.value) + 1);
        }
    }
}

function handleArrowUp() {
    if (selectedRowIndex.value.includes(0)) return;

    if (!shiftPressed) {
        selectRow(selectedRowIndex.value[0] - 1);
    } else {
        if (!selectedRowIndex.value.includes(Math.min(...selectedRowIndex.value) - 1)) {
            selectedRowIndex.value.push(Math.min(...selectedRowIndex.value) - 1);
        }
    }
}

function handleShift(event) {
    if (event.shiftKey) {
        shiftPressed = true;
    }
}

function handleKeyUp(event) {

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

function updateLine(actionName) {

    if (actionName === 'Edit') {
        contenteditable.value = !contenteditable.value;
        return;
    }

    axios.post('http://localhost:8080/List/OnBeforeUpdate', {
        table: 'Customer',
        records: lines.value
    })
        .then(response => {
            lines.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
}


const handleBlur = (value, header, rowIndex, item, event) => {
    const newValue = event.target.innerText;

    if (value == newValue) {
        return;
    }

    axios.post('http://localhost:8080/List/PageFieldValidate', {
        table: 'Customer',
        page: 'customerList',
        currentValue: value,
        newValue: newValue,
        field: header,
        rowIndex: rowIndex,
        record: item
    })
        .then(response => {
            console.log(lines.value[rowIndex]);
            lines.value[rowIndex] = response.data;
        })
        .catch(error => {
            console.log(error);
        });
};

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

        axios.post('http://localhost:8080/List/OnBeforeUpdate', {
            table: 'Customer',
            records: lines.value,
            page: 'customerList'
        })
            .then(response => {
                console.log(response.data);
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

    if (!isRecordLoaded.value && upToDate) {

        axios.post('http://localhost:8080/List/OnUpdated', {
            table: 'Customer',
            record: lines.value[selectedRowIndex.value.at(0)],
            page: 'customerList'
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
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('keyup', handleKeyUp);
})

defineExpose({
    updateLine,
});
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

.expand-th {
    min-width: 25%;
}

.expand-table {
    width: 100%;
    display: table;
    table-layout: auto;
    text-align: left;
    border-collapse: collapse;
}

.selected {
    background-color: var(--Accent);
}
</style>