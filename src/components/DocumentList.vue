<template>
    <div class="Document-List">
        <hr>
        <div class="documents">
            <table>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
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

</script>

<style scoped>
.Document-List {
    flex: 15;
    padding: 2% 2%;
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
    text-align: center;
}
</style>