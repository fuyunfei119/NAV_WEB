<template>
    <div class="card-content">
        <div v-for="field in fields">
            <CardFields :fields="field" @UpdateRecord="UpdateRecord"></CardFields>
        </div>

        <SubPageLines></SubPageLines>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineExpose } from 'vue';
import CardFields from '../components/CardFields.vue'
import SubPageLines from '../components/SubPageLines.vue'

import axios from 'axios';

const props = defineProps({
    RecordID: String,
    newEntity: Boolean
})

const fields = ref([]);

const UpdateRecord = (groupName,index,value) => {
    fields.value.forEach(field => {
        if (field.groupName === groupName.value) {
            field.fields[index] = value.currentTarget.value;
        }
    });
};

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

const InsertRecord = async () => {
    let final = {};

    fields.value.forEach(field => {
        delete field.groupName;
        final = { ...final, ...field.fields };
    })



    console.log(final);
    
    axios.post('http://localhost:8080/InsertOrUpdateRecord', {
        table: 'Customer',
        record: final
    })
        .then(response => {
            
        })
        .catch(error => {
            console.log(error);
        });
}

watch(fields, (newfields) => {
},{ deep: true });

onMounted(async () => {
    if (props.newEntity) return InitNewRecord();

    GetRecordById(props.RecordID);
})

defineExpose({
    InsertRecord
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