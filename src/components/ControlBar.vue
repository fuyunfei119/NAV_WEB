<template>
    <div class="container-controlbar">

        <span @click="RenderButtons()" class="table-name">
            {{ props.listName }}
        </span>

        <div @click="RedirectPage(item)" v-for="(item, index) in ButtonsToRender" :key="index" class="buttons-controlbar">
            <a @click="RaiseAction(item)">{{ item }}</a>
        </div>
    </div>
</template>

<script setup>
import { ref, defineExpose, defineEmits, defineProps } from 'vue';
import module from '../components/types/Module'
import List from './List.vue';
import { useRouter } from 'vue-router';
import Card from './Card.vue';
import axios from 'axios';

const router = useRouter();
const props = defineProps({
    listName: String
})

const ButtonsOfDefault = ["Search", "New", "Delete", "Edit"];
const ButtonsOfSales = ["customerList", "salesLines", "Sales Invoices", "Sales Shipments", "Reminders", "Sales Journals", "Return Orders"];
const ButtonsOfPurchase = ["Vendor", "Purchase Orders", "Purchase Invoices", "Purchase Shipment", "Reminders", "Purchase Journals", "Return Purchase"];
const ButtonsOfDocument = ["Posted Sales Invoices", "Posted Sales Shipments", "Posted Purchase Invoices", "Posted Purchase Shipments", "Issued Reminders", "Sales Order Archives", "Purchase Order Archives"];
const ButtonsOfInventory = ["Items", "Item Journals", "Locations", "Item", "Item Tracking", "Drop Shipment"]
let ButtonsToRender = ref(ButtonsOfDefault);

const emits = defineEmits(['RaiseActionForList']);

const OnRaiseAction = (actionName) => {
    emits('RaiseActionForList', actionName);
}

function RedirectPage(target) {
    switch (target) {
        case 'customerList':
            router.push({
                path: '/list',
                name: 'list',
                component: List,
                query: {
                    listName: 'customerList'
                }
            })
            break;
        case module.PURCHASING:
            WithPurchase();
            break;
        case module.POSTED_DOCUMENTS:
            WithPostedDocument();
            break;
        case module.INVENTORY:
            WithInventory();
            break;
        default:
            HandlePageAction(target.ControlName);
            break;
    }
}

const HandlePageAction = (ControlName) => {
    switch (ControlName) {
        case 'New':
            router.push({
                path: '/card',
                name: 'card',
                component: Card,
                query: {
                    newEntity: true
                }
            })
            break;
        default:
            break;
    }
}


function RenderButtons(moduleName) {
    switch (moduleName) {
        case module.SALES:
            WithSales();
            break;
        case module.PURCHASING:
            WithPurchase();
            break;
        case module.POSTED_DOCUMENTS:
            WithPostedDocument();
            break;
        case module.INVENTORY:
            WithInventory();
            break;
        default:
            withDefaults();
            break;
    }
}

const WithSales = () => {
    ButtonsToRender.value = ButtonsOfSales;
    axios.post('http://localhost:8080/GetActions', {
        page: 'CustomerList'
    })
        .then(response => {
            ButtonsToRender.value = [...ButtonsToRender.value, ...response.data];
        })
        .catch(error => {
            console.log(error);
        });
}

const WithPurchase = () => {
    ButtonsToRender.value = ButtonsOfPurchase;
}

const WithPostedDocument = () => {
    ButtonsToRender.value = ButtonsOfDocument;
}

const WithInventory = () => {
    ButtonsToRender.value = ButtonsOfInventory;
}

const withDefaults = () => {
    ButtonsToRender.value = ButtonsOfDefault;
}

const RaiseAction = (actionName) => {

    axios.post('http://localhost:8080/RaiseActions', {
        page: 'CustomerList',
        actionName: actionName
    })
        .then(response => {
            OnRaiseAction(actionName);
        })
        .catch(error => {
            console.log(error);
        });
}

defineExpose({
    RenderButtons
});
</script>

<style scoped>
.container-controlbar {
    flex: 1;
    background: rgb(246, 247, 248);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0% 5% 0% 5%;
    display: flex;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
}

.table-name {
    flex: 1;
    height: 48px;
    line-height: 60px;
    max-width: 10%;
}

.table-name:hover {
    cursor: pointer;
    text-decoration: underline;
}

.buttons-controlbar {
    flex: 10;
    display: flex;
    justify-content: space-around;
    height: 48px;
    line-height: 60px;
    max-width: 10%;
    min-width: 10%;
}

.buttons-controlbar>a:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>