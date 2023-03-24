<template>
  <q-page-container>
    <q-page class="flex bg-image flex-center">
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }"
        class="card shadow-9"
      >
        <q-card-section>
          <div class="text-center q-ma-lg">
            <q-img src="../assets/default.png" style="width: 100px" /><br />
            Acceso
          </div>
          <div class="text-center q-ma-lg">
            <div class="col text-h6 ellipsis">FARMACIA</div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-lg">
            <div class="flex flex-center">
              <q-input
                class="q-pt-md"
                type="email"
                v-model="login.email"
                label="Email"
                :rules="[(val) => !!val || 'Campo obligatorio']"
              >
                <template v-slot:append>
                  <q-icon name="email" />
                </template>
              </q-input>
            </div>
            <div class="flex flex-center">
              <q-input
                v-on:keyup.enter="loginRequest"
                class="q-pt-md"
                :type="isPwd ? 'password' : 'text'"
                v-model="login.password"
                label="Password"
                :rules="[(val) => !!val || 'Campo obligatorio']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="flex flex-center">
              <div class="q-gutter-sm">
                <q-checkbox v-model="rememberMe" label="Recuérdame" />
              </div>
            </div>
            <div class="text-center">
              <q-btn
                rounded
                label="Continuar"
                icon="arrow_right_alt"
                color="positive"
                type="button"
                @click="loginRequest"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapActions } from "vuex";
import { Notify } from "quasar";
import { ref } from "vue";
export default {
  setup() {
    return {
      isPwd: ref(true),
      rememberMe: ref(false),
    };
  },
  data() {
    return {
      login: {
        email: null,
        password: null,
      },
      empresa: [],
      logoIMG: "",
      permissions: [],
      isAdmin: false,
    };
  },
  mounted() {
    this.logs_sessions();
    this.empresa = JSON.parse(sessionStorage.getItem("empresa"));
    if (this.empresa) {
      var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
      this.logoIMG = urlsplit + "/images/empresa/" + this.empresa.logo;
    } else {
      this.empresa = {
        nombre: "Visuel Code",
        slogan: "",
        logo: "",
      };
      var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
      this.logoIMG = urlsplit + "/images/empresa/icon.png";
    }
  },
  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),
    logs_sessions() {
      let session = localStorage.getItem("users_log");
      if (session) {
        this.login.email = session;
      }
    },
    async loginRequest() {
      if (
        this.login.email != null ||
        this.login.password != null ||
        this.login.email != "" ||
        this.login.password != ""
      ) {
        sessionStorage.removeItem("login_status");
        let formData = new FormData();
        formData.append("email", this.login.email);
        formData.append("password", this.login.password);

        this.sendLoginRequest(formData).then((result) => {
          if (result.data.access_token) {
            if (result.data.roles[0]) this.checkUser(result.data.roles[0]);
            localStorage.setItem("users_log", result.data.user.email);
            setTimeout(() => {
              this.$router.push({
                name: "home",
              });
            }, 2000);
          }
        });
      } else {
        Notify.create({
          type: "warning",
          message: "Hay campos vacios",
        });
      }
    },

    async checkUser(role) {
      let formData = { roleName: role };
      try {
        await this.$store.dispatch("permisos/getRole", formData);
      } catch (error) {
        console.error(error);
      }
    },

    createArray(element) {
      this.permissions.push(element.name);
    },
  },
};
</script>
