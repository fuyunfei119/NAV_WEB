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
import { ref, onMounted, defineProps, defineExpose, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';
import CardFields from '../components/CardFields.vue'
import SubPageLines from '../components/SubPageLines.vue'

import axios from 'axios';
import router from '@/router';

const props = defineProps({
    RecordID: String,
    newEntity: Boolean,
    table: String
})

const record = ref();
const fields = ref([]);
const CardFieldsRef = ref();
const newRecordID = ref();

const isNewRecord = ref(false);
const isRecordLoaded = ref(false);
const updatedField = ref({});
const modifiedfields = ref([]);

let upToDate = false;

const UpdateRecord = async (groupName, fieldName, oldValue, newValue) => {

    fields.value.forEach(field => {
        if (field.groupName === groupName.value) {
            field.fields[fieldName].value = newValue;
            updatedField.value = { field: fieldName, value: field.fields[fieldName].value };
            modifiedfields.value.push({ field: fieldName, value: newValue });
        }
    });

    if (oldValue == newValue || !oldValue && !newValue) {
        return;
    }

    if (isNewRecord.value) {
        await axios.post('http://localhost:8080/Card/ValidateRecordAfterNewRecord', {
            table: 'customer',
            page: 'customerCard',
            recordID: newRecordID.value,
            newValue: newValue,
            oldValue: oldValue,
            fieldName: fieldName
        })
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            });
    } else {
        await axios.post('http://localhost:8080/Card/UpdateRecord', {
            table: 'customer',
            recordID: props.RecordID,
            page: 'customerCard',
            updatedField: updatedField.value,
            oldValue: oldValue
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

};

const OnInsertNewRecord = () => {

    console.log("InsertNewRecord");

    axios.post('http://localhost:8080/Card/InsertRecord', {
        table: 'Customer',
        page: 'customerCard',
    })
        .then(response => {
            fields.value = response.data;
            fields.value.forEach(field => {
                if ('System_ID' in field.fields) {
                    newRecordID.value = field.fields['System_ID'].value;
                }
            })
            isNewRecord.value = !isNewRecord.value;
        })
        .catch(error => {
            console.log(error);
        });
}

const OnDeleteRecord = () => {
    console.log("DeleteRecord");
}

function OnRenderAction(actionName) {
    if (actionName === 'Edit') {
        for (const CardField of CardFieldsRef.value) {
            CardField.changeEditable();
        }
    }
}

async function OnReturnBack() {

    if (modifiedfields.value.length <= 0) {
        router.go(-1);
    } else {
        if (window.confirm("you have modified current record. do you want to save that?")) {
            await axios.post('http://localhost:8080/Card/OnBeforeUnmount', {
                table: 'customer',
                recordID: props.RecordID,
                page: 'customerCard'
            })
                .then(response => {
                    router.go(-1);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
}

onBeforeMount(async () => {
    console.log("OnOpenPage");

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
    console.log("OnFindRecord");
    await axios.post('http://localhost:8080/Card/OnMounted', {
        cardID: 'customerCard',
        table: 'customer',
        recordID: props.RecordID
    })
        .then(response => {
            fields.value = response.data;
            isRecordLoaded.value = !isRecordLoaded.value;
            upToDate = true;
        })
        .catch(error => {
            console.log(error);
        });
})

onBeforeUpdate(async () => {

    if (isRecordLoaded.value) {
        console.log("OnAfterGetRecord");
        await axios.post('http://localhost:8080/Card/OnBeforeUpdate', {
            table: 'customer',
            recordID: props.RecordID,
            page: 'customerCard'
        })
            .then(response => {
                fields.value = response.data;
                isRecordLoaded.value = !isRecordLoaded.value;
            })
            .catch(error => {
                console.log(error);
            });
    }
})

onUpdated(async () => {

    if (!isRecordLoaded.value && upToDate) {
        console.log("OnAfterGetCurrRecord");
        await axios.post('http://localhost:8080/Card/OnUpdated', {
            table: 'customer',
            recordID: props.RecordID,
            page: 'customerCard'
        })
            .then(response => {
                fields.value = response.data.cardGroups;
                record.value = response.data.record;
                upToDate = false;
            })
            .catch(error => {
                console.log(error);
            });
    }
})

onBeforeUnmount(async () => {

})

onUnmounted(async () => {

})

defineExpose({
    ReturnBack: OnReturnBack,
    RenderAction: OnRenderAction,
    InsertNewRecord: OnInsertNewRecord,
    DeleteRecord: OnDeleteRecord
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