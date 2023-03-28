<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-dark q-px-lg">
        <img src="../assets/logo_barber-sn-fondo.svg" height="35" width="65" />
        <img src="../assets/wendys_completo.svg" height="35" width="65" />
        <q-toolbar-title>
          <div class="text-grey-8 q-pt-sm" :hidden="$q.screen.lt.sm">
            Visuel Code
          </div>
        </q-toolbar-title>

        <div class="q-pr-md text-grey-8" :hidden="$q.screen.lt.sm">
          {{ username }}
        </div>
        <div :hidden="$q.screen.lt.sm">|</div>
        <q-btn flat style="color: #39b54a" label="Cerrar" @click="logout()"/>
      </q-toolbar>
      <q-tabs class="bg-white text-grey-8 q-py-sm">
        <div class="q-px-md">
          <q-icon name="payments" class="payments text-black q-pr-sm" style="font-size: 1.5em" />
          Órdenes
        </div>
          <q-input dense input-class="text-right" class="q-ml-lg">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer text-gray" @click="text = ''" />
          </template>
        </q-input>

      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from "vue";
import { mapActions } from "vuex";
export default {
  name: "MainLayout",
  data(){
    return {
      username: '',
      route: '',
      text:''
    }
  },
  mounted(){
    let userN = sessionStorage.getItem("userName")
    this.username = userN
  },
  methods: {
        ...mapActions("auth", ["sendLogoutRequest"]),
        validateSession() {
            if (!sessionStorage.getItem("X_Token")) {
                this.$store.commit('auth/logout')
                this.$router.push({
                    path: "/login"
                });
            }
        },
        logout() {
          let X_Token = sessionStorage.getItem("X_Token");
          this.sendLogoutRequest(X_Token).then(() => {
            this.$router.push({
                    path: "/login"
                });
          })

        }
    }

};
</script>
