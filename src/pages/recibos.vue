<template>
<q-page class="q-px-xl">
    <div class="q-py-lg shadow-3 q-my-sm rounded-borders" style="margin-left: 10%; margin-right: 10%">
        <div class="row">
            <div class="col-9 q-pa-md text-center" style="font-size: 25px;">$ 00.00</div>
            <div class="col-3 q-pa-md text-right">
                <q-btn style="background:#39b54a;color:white" to="/">Nueva orden
                    <q-icon name="double_arrow" class="q-pl-xs"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col-4 q-pa-md">
                <div class="col q-pa-sm q-mx-sm flex flex-center">
                  <div class="shadow-1">
                    <img src="../assets/images/rc.jpeg"/>
                  </div>
                </div>
            </div>
            <div class="col-8 q-pa-md text-center">
                <div class="row bg-white shadow-2 rounded-borders">
                    <div class="col q-pa-sm q-mx-xs">
                        <div class="q-pa-lg q-ma-lg text-grey-7" style="font-size: 25px;">
                            ¿Como le gustaría obtener su recibo?
                        </div>
                    </div>
                </div>
                <div class="col-8 q-px-md flex flex-center">
                    <div class="col q-pa-sm q-mr-lg">
                        <q-btn class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                            <q-icon name="print" style="font-size: 30px"></q-icon>
                            Imprimir
                        </q-btn>
                        <div class="flex flex-center q-pa-lg q-ma-lg bg-white rounded-borders">
                            <q-input bottom-slots v-model="text" type="email" label="Recibo por correo electrónico" clearable style="width:100%">
                                <template v-slot:prepend>
                                    <q-icon name="send" />
                                </template>
                                <template v-slot:append>
                                    <q-btn style="background:#39b54a;color:white">Enviar</q-btn>
                                </template>
                            </q-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</q-page>
</template>

<script>
import {
    defineComponent
} from 'vue';

export default defineComponent({
    name: 'recibos'
})
</script>
