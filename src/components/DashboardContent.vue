<template>
    <div class="dashboard-container">
        <div class="carsoul">
            <div class="left">
                <h6>Last Week:</h6>
                <h1>The biggest sales ordrer was for $12,255</h1>
            </div>
            <hr style="margin: 2%;">
            <div class="right">
                <h6>Last Month:</h6>
                <h1>The largest posted sales invoice was for $114,729</h1>
            </div>
        </div>
        <div class="activities">
            <hr>
            <h5>Sales Orders:</h5>
            <div class="sales">
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
            </div>
            <hr>
            <h5>Purchase Orders:</h5>
            <div class="purchase">
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
            </div>
            <hr>
            <div class="inventory">
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
            </div>
            <hr>
            <div class="Document">
                <Cue></Cue>
                <Cue></Cue>
                <Cue></Cue>
            </div>
        </div>
    </div>
</template>

<script setup>
import Cue from './Cue.vue';
</script>

<style scoped>
.dashboard-container {
    flex: 15;
    display: flex;
    padding: 0% 5% 0% 5%;
    flex-direction: column;
    overflow: hidden;
}
.carsoul {
    flex: 1;
    display: flex;
}

.carsoul > .left {
    flex: 1;
}

.carsoul > .right {
    flex: 1;
}

.activities {
    flex: 4;
    overflow: auto;
}

.sales,.purchase,.inventory,.Document{
    display: flex;
}
</style>