<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="inner-container">
            <table>
                <thead>
                    <tr>
                        <!-- <th scope="col">#</th> -->
                        <th v-for="header in lineHeader" :key="header">{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in lines" :key="item.id">
                        <td v-for="(value, header) in item" :key="header">{{ value }}</td>
                    </tr>
                    <tr>
                        <th scope="row" @click="openCard()">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                        <td>@mdo</td>
                        <td>xxx</td>
                        <td>adasdasadadasd</td>
                        <td>lorem</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Card from './Card.vue';

const lines = ref([]);
const lineHeader = ref({});

const router = useRouter();
const openCard = () => {
    router.push(
        {
            path: '/card',
            name: 'card',
            component: Card
        },
    )
}

onMounted(async () => {
    axios.get('http://localhost:8080/FindSet')
        .then(response => {
            lines.value = response.data;

            lineHeader.value = Object.keys(lines.value[0]);

            lineHeader.value.forEach(item => {
                console.log(item);
            })

            lines.value.forEach(item => {
                console.log(item);
            });
        })
        .catch(error => {
            console.log(error);
        });
});
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
    display: inherit;
    text-align: left;
    border-collapse: collapse;
}

tr:hover {
    background-color: var(--Accent);
    color: aliceblue;
}

th {
    cursor: pointer;
}

th:hover {
    border-bottom: 1px dotted var(--Accent);
}

td,
th {
    padding: 10px 20px;
    min-width: 100px;
}
</style>