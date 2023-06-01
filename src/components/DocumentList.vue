<template>
    <div class="Document-List">
        <div class="documents">
            <table>
                <thead>
                    <tr>
                        <th 
                            v-for="header in lineHeader" 
                            :key="header"
                        >{{ header }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in lines" :key="item.id">
                        <td 
                            v-for="(value, header, index) in item" 
                            :key="header + index"
                            @click=" index == 0 ? openCard() : null" 
                            >{{ value }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    lines: Array,
    lineHeader: Object
});

</script>

<style scoped>
.Document-List {
    overflow-x: auto;
    flex: 15;
    padding: 1% 2%;
}

.Document-List>hr {
    margin: unset;
}

.documents {
    overflow: auto;
    height: 100%;
    width: 100%;
}

.documents > table {
    padding: 2% 2%;
    border-collapse: collapse;
}

tbody > tr:hover {
    background-color: var(--Accent);
    color: aliceblue;
}

tbody > tr {
    line-height: 25px;
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
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>