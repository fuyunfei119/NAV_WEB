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
                        :class="{ 'selected': selectedRowIndex.includes(rowIndex) }" @click="selectRow(rowIndex, item)">
                        <td v-for="(value, header, index) in item" :key="header + index"
                            :tabindex="selectedRowIndex.includes(rowIndex) ? 0 : -1"
                            @click=" index == 0 ? openCard(value) : selectInput(header, index, rowIndex)"
                            :contenteditable="contenteditable" @blur="handleBlur(value, header, rowIndex, item, $event)"
                            ref="tdElement">
                            {{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, computed, defineExpose, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Card from './Card.vue';
const rowCount = computed(() => lineHeader.value.length);
const expand = computed(() => lineHeader.value.length > 6);
const lastLineIndex = computed(() => lines.value.length - 1);

const lines = ref([]);
const lineHeader = ref({});
const isRecordLoaded = ref(false);
const contenteditable = ref(false);
const newRecord = ref(false);
const InsertRecord = ref(false);
const newRecordIndex = ref(0);

const tdElement = ref();

const selectedRowIndex = ref([0]);
const selectedInputIndex = ref(0);
let upToDate = false;
let shiftPressed = false;
const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Shift'];

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

function selectInput(header, index, rowIndex) {
    selectedInputIndex.value = ((rowIndex) * rowCount.value) + index;
}

function selectRow(rowIndex) {

    if (newRecord.value && InsertRecord.value || newRecord.value && rowIndex != selectedRowIndex.value) {

        console.log("OnInsertRecord");

        axios.post('http://localhost:8080/List/OnInsertRecord', {
            table: 'customer',
            page: 'customerList',
            record: lines.value[newRecordIndex.value]
        })
            .then(response => {
                newRecord.value = !newRecord.value;
                InsertRecord.value = !InsertRecord.value;
            })
            .catch(error => {
                console.log(error);
            });
    }

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
            case "ArrowRight":
                handleArrowRight();
                break;
            case "ArrowLeft":
                handleArrowLeft();
                break;
            case "Shift":
                handleShift(event);
                break;
        }
    }
}

function handleArrowDown() {
    event.preventDefault();

    if (selectedRowIndex.value.includes(lastLineIndex.value)) return;

    if (newRecord.value) {
        InsertRecord.value = !InsertRecord.value;
    }

    if (!shiftPressed) {
        if (!newRecord.value) {
            selectRow(selectedRowIndex.value[0] + 1);
            selectedInputIndex.value += rowCount.value;
            tdElement.value[selectedInputIndex.value].focus();
        }else {
            selectRow(selectedRowIndex.value[0] + 1);
            tdElement.value[selectedInputIndex.value].focus();
        }

    } else {
        if (!selectedRowIndex.value.includes(Math.max(...selectedRowIndex.value) + 1)) {
            selectedRowIndex.value.push(Math.max(...selectedRowIndex.value) + 1);
        }
    }
}

function handleArrowUp() {
    event.preventDefault();

    if (selectedRowIndex.value.includes(0)) return;

    if (newRecord.value) {
        InsertRecord.value = !InsertRecord.value;
    }

    if (!shiftPressed) {

        if (!newRecord.value) {
            selectRow(selectedRowIndex.value[0] - 1);
            selectedInputIndex.value -= rowCount.value;
            tdElement.value[selectedInputIndex.value].focus();
        }else {
            selectRow(selectedRowIndex.value[0] - 1);
            tdElement.value[selectedInputIndex.value].focus();
        }
    } else {
        if (!selectedRowIndex.value.includes(Math.min(...selectedRowIndex.value) - 1)) {
            selectedRowIndex.value.push(Math.min(...selectedRowIndex.value) - 1);
        }
    }
}

function handleArrowRight() {
    if (selectedInputIndex.value === tdElement.value.length - 1) return;

    selectedInputIndex.value += 1;

    tdElement.value[selectedInputIndex.value].focus();
    if (selectedInputIndex.value >= (selectedRowIndex.value * rowCount.value + rowCount.value)) {
        selectRow(selectedRowIndex.value[0] + 1);
    }
}

function handleArrowLeft() {
    if (selectedInputIndex.value === 0) return;

    selectedInputIndex.value -= 1;

    tdElement.value[selectedInputIndex.value].focus();
    if (selectedInputIndex.value < selectedRowIndex.value * rowCount.value) {
        selectRow(selectedRowIndex.value[0] - 1);
    }
}

function handleShift(event) {
    event.preventDefault();
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
    } else if (actionName === 'Delete') {

        axios.post('http://localhost:8080/List/DeleteLine', {
            table: 'customer',
            record: selectedRowIndex.value.map(index => ({ ...lines.value[index] }))
        })
            .then(response => {
                if (response.data) {
                    axios.post('http://localhost:8080/List/OnBeforeUpdate', {
                        table: 'Customer',
                        records: lines.value,
                        page: 'customerList'
                    })
                        .then(response => {
                            if (response.data) {
                                lines.value = lines.value.filter((item, index) => !selectedRowIndex.value.includes(index));
                                console.log(lines.value);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });


        return;
    } else if (actionName === 'New') {

        const newRow = {};
        lineHeader.value.forEach((header) => {
            newRow[header] = '';
        });

        console.log(newRow);

        lines.value.push(newRow);

        selectRow(lines.value.length - 1);

        newRecordIndex.value = lines.value.length - 1;

        newRecord.value = true;

        isRecordLoaded.value = !isRecordLoaded.value;

        contenteditable.value = true;

        selectedInputIndex.value = tdElement.value.length - rowCount.value;

        nextTick(() => {
            const newRowElement = document.querySelector('tbody tr:last-child');
            if (newRowElement) {
                newRowElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
            }
        });

        return;
    } else {
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
}


const handleBlur = (value, header, rowIndex, item, event) => {

    const newValue = event.target.innerText;

    if (value == newValue || !value && !newValue) {
        return;
    }

    axios.post('http://localhost:8080/List/PageFieldValidate', {
        table: 'Customer',
        page: 'customerList',
        currentValue: value,
        newValue: newValue,
        field: header,
        rowIndex: rowIndex,
        record: item,
        newRecord: newRecord.value
    })
        .then(response => {
            // console.log(response.data);
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

    console.log("OnFindRecord");

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

        if (newRecord.value) {

            axios.post('http://localhost:8080/List/OnNewRecord', {
                table: 'customer',
                page: 'customerList'
            })
                .then(response => {
                    lines.value[lastLineIndex.value] = response.data;
                    isRecordLoaded.value = !isRecordLoaded.value;
                })
                .catch(error => {
                    console.log(error);
                });

            return;
        } else {

            console.log("OnAfterGetRecord");

            axios.post('http://localhost:8080/List/OnBeforeUpdate', {
                table: 'Customer',
                records: lines.value,
                page: 'customerList'
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
    }
})

onUpdated(async () => {

    if (!isRecordLoaded.value && upToDate) {

        console.log("OnAfterGetCurrRecord");

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

tbody > tr > td {
    border-right: 1px solid rgb(178, 177, 177);
}

table tbody tr:not(.selected):hover {
    background-color: rgb(241, 241, 241);
    color: black;
    user-select: none;
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