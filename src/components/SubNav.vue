<template>
    <div class="container-subnav">
        <span @click="ReturnHome()" class="company-name">
            <h3>Sievers-Group AG |</h3>
        </span>

        <div class="buttons-subnav">
            <div class="dropdown">
                <a @click="() => handleDropDown(module.SALES)">Sales</a>
            </div>
            <div class="dropdown">
                <a @click="() => handleDropDown(module.PURCHASING)">Purchasing</a>
            </div>
            <div class="dropdown">
                <a @click="() => handleDropDown(module.INVENTORY)">Inventory</a>
            </div>
            <div class="dropdown">
                <a @click="() => handleDropDown(module.POSTED_DOCUMENTS)">Posted Documents</a>
            </div>
            <div class="dropdown">
                <a @click="() => handleDropDown(module.SHOPIFY)">Shopify</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import module from '../components/types/Module'
import HomeView from '../views/HomeView.vue'

const emits = defineEmits(['OnChangeControlBar'])
const router = useRouter();

const handleDropDown = (moduleName) => {
    emits('OnChangeControlBar', moduleName);
}

function ReturnHome() {
    router.push({
        path: '/'
    })
}
</script>

<style scoped>
.container-subnav {
    flex: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0% 5% 0% 5%;
    display: flex;
    flex-direction: row;
}

.company-name {
    flex: 1;
    color: rgb(33, 33, 33);
    font-weight: normal;
    cursor: pointer;
}

.buttons-subnav {
    flex: 2;
    display: flex;
    justify-content: space-around;
    height: 48px;
    line-height: 60px;
}

a:hover {
    cursor: pointer;
    text-decoration: underline;
}
</style>