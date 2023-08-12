<template>
    <section>
        <h3>{{ groupName.value }}</h3>

        <hr>

        <div class="content">
            <div class="item" v-for="(item, fieldName, index) in allFields.value" :key="fieldName">
                <h4>{{ fieldName }}</h4>
                <hr>

                <div class="input-container">
                    <select v-if="item.type === 'enumeration'" @click="getFieldOption(item, fieldName)">
                        <option v-for="option in selectOptions" :key="option">{{ option }}</option>
                    </select>

                    <input v-else :type="item.type" :value="item.value" :readonly="editable"
                        @blur="updateField(fieldName, item.value, $event)" />
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
import { computed, ref, defineProps, defineEmits, defineExpose, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
    fields: Object
})

const emits = defineEmits(['UpdateRecord']);

const groupName = computed(() => ref(props.fields.groupName));
const allFields = computed(() => ref(props.fields.fields));

const selectOptions = ref([]);

const editable = ref(false);
const showSelect = ref(false);

function changeEditable() {
    editable.value = !editable.value;
}

const updateField = async (fieldName, oldValue, event) => {
    emits('UpdateRecord', groupName.value, fieldName, oldValue, event.currentTarget.value);
};

const getFieldOption = (item, fieldName) => {

    showSelect.value = !showSelect.value;

    if (showSelect.value) {

        axios.post('http://localhost:8080/Card/GetFieldOptionForCard', {
            cardID: 'customerCard',
            table: 'customer',
            fieldName: fieldName
        })
            .then(response => {
                if (response.data.fieldType === 'enum') {
                    selectOptions.value = response.data.fieldOptions;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
}

defineExpose({
    changeEditable
});

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
input,
select {
    line-height: 28px;
    background: var(--Subordinate);
    border: unset;
    width: 100%;
    height: 30px;
}

.item>hr {
    border: 0.5px dotted grey;
    width: 100px;
}

.input-container {
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.input-container input {
    width: 100%;
    margin: 0;
}

.input-container select {
    width: 100%;
    margin: 0;
}
</style>