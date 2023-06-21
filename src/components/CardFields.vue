<template>
    <section>
        <h3>{{ groupName.value }}</h3>

        <hr>

        <div class="content">
            <div class="item" v-for="(item, index) in allFields.value" :key="index">
                <h4>{{ index }}</h4>
                <hr>
                <input type="text" @input="updateField(index, $event)" :value="item">
            </div>
        </div>

    </section>
</template>

<script setup>
import { computed, ref, defineProps,defineEmits } from 'vue';
import { debounce } from 'lodash';

const props = defineProps({
    fields: Object
})

const emits = defineEmits(['UpdateRecord']);

const groupName = computed(() => ref(props.fields.groupName));
const allFields = computed(() => ref(props.fields.fields));

const updateField = debounce(async (index, value) => {
    await emits('UpdateRecord',groupName.value,index,value);
},500);

</script>

<style scoped>
h3,
h4 {
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
    padding: 0% 2% 1% 0%;
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