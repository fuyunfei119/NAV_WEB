<template>
    <div class="card-content">
        <CardFields :fields="general"></CardFields>
        <SubPageLines></SubPageLines>
        <hr>
        <CardFields :fields="invoice"></CardFields>
        <CardFields :fields="shipping"></CardFields>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CardFields from '../components/CardFields.vue'
import SubPageLines from '../components/SubPageLines.vue'

const general = ref({
    "GroupName": "General",
    "Fields":
        [
            {
                "FieldName": "Customer Name",
                "FieldValue": "Hamburg Software AG"
            },
            {
                "FieldName": "Customer No.",
                "FieldValue": "10100"
            },
            {
                "FieldName": "Address",
                "FieldValue": "Lange Str. 10-15"
            },
            {
                "FieldName": "Address",
                "FieldValue": "Lange Str. 10-15"
            },
            {
                "FieldName": "Address",
                "FieldValue": "Lange Str. 10-15"
            },
        ]
})

const invoice = ref({
    "GroupName": "Invoice Details",
    "Fields": [
        {
            "FieldName": "Currency Code",
            "FieldValue": "EU"
        },
        {
            "FieldName": "VAT Bus. Posting Group",
            "FieldValue": "INLAND"
        },
        {
            "FieldName": "Customer Posting Group",
            "FieldValue": "INLAND"
        },
        {
            "FieldName": "Payment Terms Code",
            "FieldValue": "BBL"
        },
    ]
})

const shipping = ref({
    "GroupName": "Invoice Details",
    "Fields": [
        {
            "FieldName": "Ship-to",
            "FieldValue": "Customer Address"
        },
        {
            "FieldName": "Contact",
            "FieldValue": "Frau Claudia"
        },
        {
            "FieldName": "Shipment Date",
            "FieldValue": "1/9/2025"
        },
        {
            "FieldName": "Location Code",
            "FieldValue": "A"
        },
        {
            "FieldName": "Bill-to",
            "FieldValue": "Customer Address"
        },
    ]
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