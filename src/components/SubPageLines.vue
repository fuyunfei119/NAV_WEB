<template>
    <div>
        <hr>
        <div class="subpage-header">
            <div class="header-left">
                <h4>Lines | </h4>
                <a href="">Manage</a>
                <a href="">Line</a>
                <a href="">Order</a>
            </div>

            <div class="header-right">
                <h4 @click="zoomSubPage()">zoom</h4>
            </div>
        </div>
        <hr>

        <section>
            <table>
                <thead>
                    <tr>
                        <th v-for=" header  in  lineHeader " :key="header">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="( item, rowIndex ) in  lines " :key="item.id"
                        :class="{ 'selected': selectedRowIndex.includes(rowIndex) }" @click="selectRow(rowIndex, item)">
                        <td v-for="( value, header, index ) in  item " :key="header + index"
                            :tabindex="selectedRowIndex.includes(rowIndex) ? 0 : -1" :contenteditable="contenteditable"
                            @click=" index == 0 ? 0 : selectInput(header, index, rowIndex)"
                            @blur="updateFieldAfterValidate(value, header, rowIndex, item, $event)" ref="tdElement">
                            {{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, computed, defineExpose, nextTick, defineProps, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    listName: String
});

const emits = defineEmits(['toggleShowCardFields']);

const tableName = ref('');

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

function zoomSubPage() {
    emits('toggleShowCardFields');
}

function selectInput(header, index, rowIndex) {
    selectedInputIndex.value = ((rowIndex) * rowCount.value) + index;
}

function selectRow(rowIndex) {

    if (newRecord.value && InsertRecord.value || newRecord.value && rowIndex != selectedRowIndex.value) {

        console.log("OnInsertRecord");

        axios.post('http://localhost:8080/List/OnInsertRecord', {
            table: props.subtable,
            page: props.listName,
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
        } else {
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
        } else {
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

function updateLineAfterAction(actionName) {

    if (actionName === 'Edit') {
        contenteditable.value = !contenteditable.value;
        return;
    } else if (actionName === 'Delete') {

        axios.post('http://localhost:8080/List/DeleteLine', {
            table: tableName.value,
            records: selectedRowIndex.value.map(index => ({ ...lines.value[index] }))
        })
            .then(response => {
                if (response.data) {
                    axios.post('http://localhost:8080/List/OnBeforeUpdate', {
                        table: tableName.value,
                        records: lines.value,
                        page: props.listName
                    })
                        .then(response => {
                            if (response.data) {
                                lines.value = lines.value.filter((item, index) => !selectedRowIndex.value.includes(index));
                                selectedRowIndex.value = [0];
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
            table: tableName.value,
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

const updateFieldAfterValidate = (value, header, rowIndex, item, event) => {

    const newValue = event.target.innerText;

    if (value == newValue || !value && !newValue) {
        return;
    }

    axios.post('http://localhost:8080/List/PageFieldValidate', {
        table: tableName.value,
        page: props.listName,
        currentValue: value,
        newValue: newValue,
        field: header,
        rowIndex: rowIndex,
        record: item,
        newRecord: newRecord.value
    })
        .then(response => {
            lines.value[rowIndex] = response.data;
        })
        .catch(error => {
            console.log(error);
        });
};

onBeforeMount(async () => {

    await axios.post('http://localhost:8080/List/OnBeforeMounted', {
        page: props.listName
    })
        .then(response => {
            tableName.value = response.data.tableName;
        })
        .catch(error => {
            console.log(error);
        });
})

onMounted(async () => {

    watch(tableName, (newTableName, oldTableName) => {
        axios.get('http://localhost:8080/List/OnMounted', {
            params: {
                list: tableName.value
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
    })
});

onBeforeUpdate(async () => {

    if (isRecordLoaded.value) {

        if (newRecord.value) {

            await axios.post('http://localhost:8080/List/OnNewRecord', {
                table: tableName.value,
                page: props.listName
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

            // console.log("OnAfterGetRecord");

            await axios.post('http://localhost:8080/List/OnBeforeUpdate', {
                table: tableName.value,
                records: lines.value,
                page: props.listName
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

        // console.log("OnAfterGetCurrRecord");

        await axios.post('http://localhost:8080/List/OnUpdated', {
            table: tableName.value,
            record: lines.value[selectedRowIndex.value.at(0)],
            page: props.listName
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

    await axios.post('http://localhost:8080/List/OnBeforeUnmount', {
        table: tableName.value
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
    updateLine: updateLineAfterAction,
})
</script>

<style scoped>
div {
    overflow: auto;
}

section {
    overflow: auto;
    height: 100%;
}

tbody {
    overflow: auto;
}

.subpage-header {
    display: flex;
    justify-content: space-between;
}

.subpage-header>.header-left {
    display: flex;
}

.subpage-header>.header-right {
    padding-right: 2%;
}

h4 {
    margin: unset;
}

a {
    margin-left: 25px;
}

table {
    background: var(--Subordinate);
    overflow: auto;
    border-collapse: collapse;
}

tr {
    border: 1px solid rgb(79, 77, 77);
    border-collapse: collapse;
}

tr:hover {
    background: var(--Accent);
}

th {
    padding: 5px 10px;
    min-width: 100px;
    text-align: left;
}

td {
    padding: 5px 10px;
    min-width: 100px;
    overflow: hidden;
}

td,
th {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>