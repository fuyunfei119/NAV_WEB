<template>
    <section>
        <h3>{{ groupName }}</h3>

        <hr>

        <div class="content">
            <span class="left">
                <div class="item" v-for="(item, index) in leftFields" :key="index">
                    <h5>{{ item.FieldName }}</h5>
                    <hr>
                    <input type="text" :value="item.FieldValue">
                </div>
            </span>

            <span class="right">
                <div class="item" v-for="(item, index) in rightFields" :key="index">
                    <h5>{{ item.FieldName }}</h5>
                    <hr>
                    <input type="text" :value="item.FieldValue">
                </div>
            </span>
        </div>

    </section>
</template>

<script setup>

const props = defineProps({
    fields: Array
})

const groupName = props.fields.GroupName;
const middleIndex = Math.ceil(props.fields.Fields.length / 2);
const leftFields = props.fields.Fields.splice(0, middleIndex);
const rightFields = props.fields.Fields.splice(-middleIndex);
</script>

<style scoped>
h3,
h5 {
    margin: unset;
}

.content {
    display: flex;
}

.left,
.right {
    flex: 1;
}

.left>.item {
    padding: 0% 5% 2% 0%;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0% 0% 2% 0%;
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