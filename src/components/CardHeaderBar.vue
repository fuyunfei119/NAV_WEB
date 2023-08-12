<template>
    <div class="card-headerbar">
        <div class="headerbar">
            <h4>Sales Order | Work Date: {{ new Date().toLocaleString() }}</h4>

            <div>
                <a @click="newRecord()">
                    <h4>New</h4>
                </a>
                <a @click="deleteRecord()">
                    <h4>Delete</h4>
                </a>
            </div>

            <a @click="goback()">
                <h4>Back</h4>
            </a>
        </div>

        <h2>{{ Order_No }} | {{ Customer_Name }}</h2>
        <hr>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['UpdateRecordOnBeforeReturnBack', 'UpdateRecordOnAfternewRecord', 'UpdateRecordOnAfterDeleteRecord']);

const Order_No = 10100;
const Customer_Name = "Hamburg Software AG";

const goback = () => {
    emits('UpdateRecordOnBeforeReturnBack');
}

const newRecord = () => {
    emits('UpdateRecordOnAfternewRecord');
}

const deleteRecord = () => {
    emits('UpdateRecordOnAfterDeleteRecord');
}
</script>

<style scoped>
.card-headerbar {
    flex: 1;
}

.headerbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.headerbar>h4 {
    flex-basis: 40%;
}

.headerbar>div {
    flex-basis: 40%;
    display: flex;
    align-items: center;
}

.headerbar>div>a {
    margin-right: 5%;
}

h4 {
    margin-bottom: unset;
}

a {
    cursor: pointer;
}

a:hover {
    text-decoration: underline;
}
</style>