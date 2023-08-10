<template>
    <div class="card-content">
        <div v-for="field in fields" :key="field">
            <CardFields ref="CardFieldsRef" :fields="field" @UpdateRecord="UpdateRecord">
            </CardFields>
        </div>

        <SubPageLines></SubPageLines>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineExpose, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';
import CardFields from '../components/CardFields.vue'
import SubPageLines from '../components/SubPageLines.vue'

import axios from 'axios';

const props = defineProps({
    RecordID: String,
    newEntity: Boolean,
    table: String
})

const fields = ref([]);
const CardFieldsRef = ref();

const UpdateRecord = (groupName, index, value) => {
    fields.value.forEach(field => {
        if (field.groupName === groupName.value) {
            field.fields[index].value = value.currentTarget.value;
        }
    });
};

const GetRecordById = async (RecordID) => {

    axios.post('http://localhost:8080/GetRecordById', {
        cardID: 'customerCard',
        table: 'customer',
        recordID: RecordID
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

function OnRenderAction(actionName) {
    if (actionName === 'Edit') {
        for (const CardField of CardFieldsRef.value) {
            CardField.changeEditable();
        }
    }
}

watch(fields, (newfields) => {
}, { deep: true });

onBeforeMount(async () => {

    await axios.post('http://localhost:8080/Card/OnBeforeMounted', {
        table: props.table
    })
        .then(response => {
            
        })
        .catch(error => {
            console.log(error);
        });
})

onMounted(async () => {
    GetRecordById(props.RecordID);
})

onBeforeUpdate(async () => {

})

onUpdated(async () => {

})

onBeforeUnmount(async () => {

})

onUnmounted(async () => {

})

defineExpose({
    InsertRecord,
    RenderAction: OnRenderAction
})
</script>

<style scoped>
.card-content {
    flex: 30;
    overflow: scroll;
}

hr {
    border: unset;
}
</style>