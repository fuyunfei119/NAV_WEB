<template>
    <div class="card-content">
        <div>
            <CardFields :fields="general"></CardFields>
        </div>

        <SubPageLines></SubPageLines>
        <hr>
        <div>
            <CardFields :fields="invoice"></CardFields>
        </div>

        <div>
            <CardFields :fields="shipping"></CardFields>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import CardFields from '../components/CardFields.vue'
import SubPageLines from '../components/SubPageLines.vue'

import axios from 'axios';

const props = defineProps({
    RecordID: String
})

const GetRecordById = async (RecordID) => {

    axios.post('http://localhost:8080/GetRecordById', {
        table: 'Customer',
        RecordID: RecordID
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}

const general = ref({
    "GroupName": "General",
    "Fields":
        [
            { "Customer Name": "Hamburg Software AG" },
            { "Customer No.": "10100" },
            { "Address": "Lange Str. 10-15" },
            { "Address": "Lange Str. 10-15" },
            { "Address": "Lange Str. 10-15" },
        ]
})

const invoice = ref({
    "GroupName": "Invoice Details",
    "Fields":
        [
            { "Currency Code": "EU" },
            { "VAT Bus. Posting Group": "INLAND" },
            { "Customer Posting Group": "INLAND" },
            { "Payment Terms Code": "BBL" },
        ]
})

const shipping = ref({
    "GroupName": "Invoice Details",
    "Fields": [
        { "Ship-to": "Customer Address" },
        { "Contact": "Frau Claudia" },
        { "Shipment Date": "1/9/2025" },
        { "Location Code": "A" },
        { "Bill-to": "Customer Address" },
    ]
})

onMounted(async () => {
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