<template>
    <div class="card-content">
        <div v-for="field in fields" :key="field">
            <CardFields v-if="showCardFields" ref="CardFieldsRef" :fields="field" @UpdateRecord="UpdateRecord">
            </CardFields>
        </div>

        <SubPageLines @toggleShowCardFields="toggleShowCardFields" ref="SubPageRef" :listName="props.listpart"
            :subtable="props.subtable">
        </SubPageLines>
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
    table: String,
    listpart: String,
    subtable: String
})

const showCardFields = ref(true);

const record = ref();
const fields = ref([]);
const CardFieldsRef = ref();
const SubPageRef = ref();
const newRecordID = ref();

const isNewRecord = ref(false);
const isRecordLoaded = ref(false);
const updatedField = ref({});
const modifiedfields = ref([]);

let upToDate = false;

const toggleShowCardFields = () => {
    showCardFields.value = !showCardFields.value;
}

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
            record: record.value,
            newValue: newValue,
            oldValue: oldValue,
            fieldName: fieldName
        })
            .then(response => {
                fields.value = response.data.cardGroups;
                record.value = response.data.record;
            })
            .catch(error => {
                console.log(error);
            });
    } else {
        await axios.post('http://localhost:8080/Card/UpdateRecord', {
            table: 'customer',
            recordID: props.RecordID,
            page: 'customerCard',
            updatedField: updatedField.value.field,
            fieldName: fieldName,
            oldValue: oldValue,
            newValue: newValue
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

};


const OnInitializeNewRecord = () => {

    // console.log("InsertNewRecord");

    axios.post('http://localhost:8080/Card/InitializeRecord', {
        table: 'customer',
        page: 'customerCard',
    })
        .then(response => {
            fields.value = response.data.cardGroups;
            record.value = response.data.record;
            if (record.value['System_ID']) {
                newRecordID.value = record.value['System_ID'].value;
            }
            isNewRecord.value = !isNewRecord.value;
        })
        .catch(error => {
            console.log(error);
        });
}

const OnDeleteRecord = () => {

    // console.log("DeleteRecord");

    axios.post('http://localhost:8080/Card/DeleteRecord', {
        table: 'customer',
        page: 'customerCard',
        record: record.value,
        recordID: props.RecordID,
        isNewRecord: isNewRecord.value
    })
        .then(response => {
            if (response.data) {
                router.go(-1);
            }
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

        SubPageRef.value.updateLine(actionName);
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
                page: 'customerCard',
                record: record.value,
                isNewRecord: true
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

onBeforeMount(async () => { });

onMounted(async () => {

    await axios.post('http://localhost:8080/Card/OnBeforeMounted', {
        table: props.table
    })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });

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

        await axios.post('http://localhost:8080/Card/OnUpdated', {
            table: 'customer',
            recordID: props.RecordID,
            page: 'customerCard'
        })
            .then(response => {
                console.log(response.data.CardGroups);
                fields.value = response.data.CardGroups;
                record.value = response.data.Record;
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
    InitializeNewRecord: OnInitializeNewRecord,
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