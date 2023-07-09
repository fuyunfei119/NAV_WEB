<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="inner-container">
            <table :class="{ 'expand-table': expand }">
                <thead>
                    <tr>
                        <th v-for="header in lineHeader" :key="header" :class="{ 'expand-th': expand }">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in lines" :key="item.id">
                        <td v-for="(value, header, index) in item" :key="header + index"
                            @click=" index == 0 ? openCard(value) : null">{{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Card from './Card.vue';

const expand = computed(() => lineHeader.value.length > 6);

const lines = ref([]);
const lineHeader = ref({});
const isRecordLoaded = ref(false);

const router = useRouter();
const openCard = (RecordID) => {
    router.push(
        {
            path: '/card',
            name: 'card',
            component: Card,
            query: {
                Id: RecordID
            },
        },
    )
}

const findSet = async () => {
    axios.get('http://localhost:8080/List/OnMounted', {
        params: {
            list: 'Customer'
        }
    })
        .then(response => {
            lines.value = response.data;
            lineHeader.value = Object.keys(lines.value[0]);
        })
        .catch(error => {
            console.log(error);
        });
}

watch(lines, (newLines) => {
    if (!isRecordLoaded.value) {
        isRecordLoaded.value = true;
    } else {
        findSet();
    }
});

onBeforeMount(async () => {
    console.log("OnInit");
    console.log("OnOpenPage");
    console.log(lines.value);
    axios.post('http://localhost:8080/List/OnBeforeMounted', {
        table: 'Customer'
    })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
})

onMounted(async () => {
    findSet();
    console.log("OnFindRecord");
    console.log(lines.value);
    // findSet();
});

onBeforeUpdate(async () => {
    console.log("OnAfterGetRecord");
    console.log("OnNextRecord");
    console.log(lines.value);

    axios.post('http://localhost:8080/List/OnBeforeUpdate', {
        table: 'Customer'
    })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
})

onUpdated(async () => {
    console.log("OnAfterGetCurrRecord");
    console.log(lines.value);

    axios.post('http://localhost:8080/List/OnUpdated', {
        table: 'Customer'
    })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
})

onBeforeUnmount(async () => {
    console.log("OnQueryClosePage");
    console.log(lines.value);

    axios.post('http://localhost:8080/List/OnBeforeUnmount', {
        table: 'Customer'
    })
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
})

onMounted(async () => {
    console.log("OnClosePage");
    console.log(lines.value);
})
</script>

<style scoped>
.container {
    flex: 15;
    background: rgb(246, 247, 248);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0% 5% 2% 5%;
    overflow: auto;
}

.inner-container {
    overflow: auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

table {
    display: table;
    table-layout: fixed;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
}

thead>tr,
tbody>tr {
    line-height: 25px;
}

tr:hover {
    background-color: var(--Accent);
    color: aliceblue;
}

tr {
    width: 100%;
}

th {
    cursor: pointer;
}

td,
th {
    padding: 10px 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.expand-th {
    min-width: 25%;
}

.expand-table {
    width: 100%;
    display: table;
    /*table-layout: fixed;*/
    table-layout: auto;
    text-align: left;
    border-collapse: collapse;
}
</style>