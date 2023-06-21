<template>
    <div class="card-headerbar">
        <div class="headerbar">
            <h4>Sales Order | Work Date: {{ new Date().toLocaleString() }}</h4>

            <a @click="goback()">
                <h4>Back</h4>
            </a>
        </div>

        <h2>{{ Order_No }} | {{ Customer_Name }}</h2>
        <hr>
    </div>
</template>

<script setup>
import router from '@/router';
import { defineEmits } from 'vue';

const emits = defineEmits(['UpdateRecordOnBeforeReturnBack']);

const Order_No = 10100;
const Customer_Name = "Hamburg Software AG";

const goback = () => {
    if (window.confirm('you have modified current record. do you want to save that?')) {
        emits('UpdateRecordOnBeforeReturnBack');
        router.go(-1);
    }
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