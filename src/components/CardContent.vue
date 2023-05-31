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