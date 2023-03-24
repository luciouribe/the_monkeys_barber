<template>
<q-page class="q-px-xl">
    <div class="q-py-lg shadow-3 q-my-sm" style="margin-left: 10%; margin-right: 10%">
        <div class="row">
            <div class="col-3 q-pa-md">
                <q-btn style="background:#f44336;color:white" to="/">
                    <q-icon name="navigate_before" class="q-pl-xs"></q-icon>
                    Regresar
                </q-btn>
            </div>
            <div class="col-6 q-pa-md text-center" style="font-size: 25px;">Pagos</div>
            <div class="col-3 q-pa-md text-right">
                <q-btn style="background:#39b54a;color:white" to="/recibos">Validar
                    <q-icon name="keyboard_arrow_right" class="q-pl-xs"></q-icon>
                </q-btn>
            </div>
        </div>
        <div class="row">
            <div class="col-4 q-pa-md">
                <div class="col q-pa-sm q-mx-sm">
                    <q-btn class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                        <q-icon name="local_atm" style="font-size: 30px"></q-icon>
                        Efectivo
                    </q-btn>
                    <q-btn class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                        <q-icon name="account_balance" style="font-size: 30px"></q-icon>
                        Banco
                    </q-btn>
                </div>
            </div>
            <div class="col-8 q-pa-md text-center">
                <div class="row bg-white shadow-2">
                    <div class="col q-pa-sm q-mx-sm">
                        <div class="flex flex-center q-pa-lg q-ma-lg" style="font-size: 45px;color:#39b54a">
                            $ 00.00
                        </div>
                    </div>
                </div>
                <div class="row q-mt-sm shadow-2">
                    <div class="col-4 q-pa-md">
                        <div class="col-5 q-pa-sm q-mt-sm rounded-borders text-center" style="width:100%">
                            <div class="row flex flex-center">
                                <div class="col q-pa-sm shadow-1">
                                  <q-btn style="width:100%;height:100%" flat>1</q-btn>
                                </div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>2</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>3</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>+10</q-btn></div>
                            </div>
                            <div class="row flex flex-center">
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>4</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>5</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>6</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>+20</q-btn></div>
                            </div>
                            <div class="row flex flex-center">
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>7</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>8</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>9</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>+50</q-btn></div>
                            </div>
                            <div class="row flex flex-center">
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>+/-</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat>0</q-btn></div>
                                <div class="col q-pa-sm shadow-1" style="font-size: 15px"><q-btn style="width:100%;height:100%" flat>.</q-btn></div>
                                <div class="col q-pa-sm shadow-1"><q-btn style="width:100%;height:100%" flat><q-icon name="backspace"></q-icon></q-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-8 q-px-md text-center">
                        <div class="col q-pa-sm q-mx-sm">
                            <q-btn class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                                <q-icon name="account_circle" style="font-size: 30px"></q-icon>
                                Cliente
                            </q-btn>
                            <q-btn class="flex flex-center q-pa-lg q-ma-lg bg-white shadow-1 rounded-borders" style="width:100%">
                                <q-icon name="description" style="font-size: 30px"></q-icon>
                                Factura
                            </q-btn>
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
} from "vue";

export default defineComponent({
    name: "pagos",
});
</script>
