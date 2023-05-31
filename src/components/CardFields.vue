<template>
    <section>
        <h3>{{ groupName }}</h3>

        <hr>

        <div class="content">
            <div class="item" v-for="(item, index) in allfields" :key="index">
                <h5>{{ getFieldName(item) }}</h5>
                <hr>
                <input type="text" :value="Object.values(item)">
            </div>
        </div>

    </section>
</template>

<script setup>

const props = defineProps({
    fields: Array
})

const groupName = props.fields.GroupName;
const allfields = props.fields.Fields;

const getFieldName = (item) => Object.keys(item).at(0);

</script>

<style scoped>
h3,
h5 {
    margin: unset;
}

.content {
    display: flex;
    flex-wrap: wrap;
}

.left>.item {
    padding: 0% 5% 2% 0%;
}

.item {
    flex-basis: 48%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0% 2% 2% 0%;
    line-height: 28px;
}

h5,
input {
    line-height: 28px;
}

input {
    background: var(--Subordinate);
    border: unset;
    width: 50%;
}

.item>hr {
    border: 0.5px dotted grey;
    width: 100px;
}
</style>