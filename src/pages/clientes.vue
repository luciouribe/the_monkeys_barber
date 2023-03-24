<template>
<q-page class="q-px-xl">
    <div class="q-py-lg shadow-3 q-my-sm" style="margin-left: 10%; margin-right: 10%">
        <div class="row">
            <div class="col-3 q-pa-md">
                <q-btn style="background:#f44336;color:white" to="/">
                    <q-icon name="navigate_before" class="q-pl-xs"></q-icon>
                    Cancelar
                </q-btn>
            </div>

            <div class="col-6 q-pa-md flex justify-center items-center text-center" style="font-size: 25px;">
                <q-input class="q-pt-md" type="text" v-model="search" label="Buscar clientes" />
                <q-btn class="q-ma-md" icon="person_add"></q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col-12 q-pa-md text-center">
                <div class="row bg-white shadow-2">
                    <div class="col q-pa-sm q-mx-sm">
                        <div class="q-pa-sm q-ma-lg" style="font-size: 45px;color:#39b54a">
                            <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" flat bordered />
                        </div>
                    </div>
                </div>
                <div class="row q-mt-sm shadow-2">
                </div>
            </div>
        </div>
    </div>
</q-page>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            columns: [{
                    name: 'name',
                    required: true,
                    label: 'Dessert (100g serving)',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'calories',
                    align: 'center',
                    label: 'Calories',
                    field: 'calories',
                    sortable: true
                },
                {
                    name: 'fat',
                    label: 'Fat (g)',
                    field: 'fat',
                    sortable: true
                },
                {
                    name: 'carbs',
                    label: 'Carbs (g)',
                    field: 'carbs'
                },
                {
                    name: 'protein',
                    label: 'Protein (g)',
                    field: 'protein'
                },
                {
                    name: 'sodium',
                    label: 'Sodium (mg)',
                    field: 'sodium'
                },
                {
                    name: 'calcium',
                    label: 'Calcium (%)',
                    field: 'calcium',
                    sortable: true,
                    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                },
                {
                    name: 'iron',
                    label: 'Iron (%)',
                    field: 'iron',
                    sortable: true,
                    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
                }
            ],
            rows: [{
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    sodium: 87,
                    calcium: '14%',
                    iron: '1%'
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    sodium: 129,
                    calcium: '8%',
                    iron: '1%'
                },
            ]
        }
    }
}
</script>
