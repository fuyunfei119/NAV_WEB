<template>
    <div class="card-content">
        <div v-for="field in fields">
            <CardFields :fields="field" ></CardFields>
        </div>

        <SubPageLines></SubPageLines>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import CardFields from '../components/CardFields.vue'
import SubPageLines from '../components/SubPageLines.vue'

import axios from 'axios';

const props = defineProps({
    RecordID: String,
    newEntity: Boolean
})

const fields = ref([]);

const GetRecordById = async (RecordID) => {

    axios.post('http://localhost:8080/GetRecordById', {
        table: 'Customer',
        RecordID: RecordID
    })
        .then(response => {
            fields.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

const InitNewRecord = async () => {

    axios.post('http://localhost:8080/InitNewRecord', {
        table: 'Customer'
    })
        .then(response => {
            fields.value = response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

onMounted(async () => {
    if (props.newEntity) return InitNewRecord();

    GetRecordById(props.RecordID);
})
</script>

<style scoped>
.card-content {
    flex: 15;
    overflow: scroll;
}

hr {
    border: unset;
}
</style>