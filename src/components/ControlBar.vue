<template>
    <div class="container-controlbar">

        <span @click="RenderButtons()" class="table-name">
            Customer
        </span>

        <div @click="RedirectPage(item)" v-for="(item, index) in ButtonsToRender" :key="index" class="buttons-controlbar">
            <a>{{ item.ControlName }}</a>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import module from '../components/types/Module'
import List from './List.vue';
import { useRouter } from 'vue-router';
import Card from './Card.vue';

const router = useRouter();

const ButtonsOfDefault = [
    {
        "ControlName": "Search"
    },
    {
        "ControlName": "New"
    },
    {
        "ControlName": "Delete"
    },
    {
        "ControlName": "Home"
    }
]
const ButtonsOfSales = [
    {
        "ControlName": "Customer"
    },
    {
        "ControlName": "Sales Orders"
    },
    {
        "ControlName": "Sales Invoices"
    },
    {
        "ControlName": "Sales Shipments"
    },
    {
        "ControlName": "Reminders"
    },
    {
        "ControlName": "Sales Journals"
    },
    {
        "ControlName": "Return Orders"
    }
]
const ButtonsOfPurchase = [
    {
        "ControlName": "Vendor"
    },
    {
        "ControlName": "Purchase Orders"
    },
    {
        "ControlName": "Purchase Invoices"
    },
    {
        "ControlName": "Purchase Shipment"
    },
    {
        "ControlName": "Reminders"
    },
    {
        "ControlName": "Purchase Journals"
    },
    {
        "ControlName": "Return Purchase"
    }
]
const ButtonsOfDocument = [
    {
        "ControlName": "Posted Sales Invoices"
    },
    {
        "ControlName": "Posted Sales Shipments"
    },
    {
        "ControlName": "Posted Purchase Invoices"
    },
    {
        "ControlName": "Posted Purchase Shipments"
    },
    {
        "ControlName": "Issued Reminders"
    },
    {
        "ControlName": "Sales Order Archives"
    },
    {
        "ControlName": "Purchase Order Archives"
    }
]
const ButtonsOfInventory = [
    {
        "ControlName": "Items"
    },
    {
        "ControlName": "Item Journals"
    },
    {
        "ControlName": "Locations"
    },
    {
        "ControlName": "Item "
    },
    {
        "ControlName": "Item Tracking"
    },
    {
        "ControlName": "Drop Shipment"
    }
]
let ButtonsToRender = ref(ButtonsOfDefault);

function RedirectPage(target) {
    switch (target.ControlName) {
        case 'Customer':
            router.push({
                path: '/list',
                name: 'list',
                component: List
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
}

.buttons-controlbar > a:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>