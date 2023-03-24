<template>
  <q-page padding>
    <div class="row q-pa-md">
      <div class="col q-mx-md">
        <q-card flat bordered class="text-black q-px-xl q-py-md" v-show="setVisible('configuracion.permisos.create')">
          <q-card-title class="text-h6">Crear Rol</q-card-title>
          <div class="q-my-md">
            <q-input
              v-model="role"
              filled
              label="Rol Name *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
            <q-separator />
            <q-select
              filled
              v-model="user"
              map-options
              emit-value
              class="q-my-md"
              :options="users"
              label="Usuario"
            />
            <q-btn
              :disable="role.length == 0 || selection.length == 0"
              @click="postRole()"
              label="Crear rol"
              color="positive"
              icon="add"
              size="sm"
            />
          </div>
        </q-card>
        <q-card
          flat
          bordered
          class="text-black q-px-xl q-py-md q-my-md"
          style="max-height: 250px"
        >
          <q-card-title class="text-h6">Editar Rol</q-card-title>
          <div class="q-my-md flex items-center">
            <q-select
              filled
              :model-value="model"
              v-model="roleEdit"
              label="Select a role *"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              :options="options"
              @filter="filterFn"
              @input-value="setModel"
              style="width: 300px; padding-bottom: 32px"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-btn
              @click="searchRole()"
              :disable="roleEdit.length == 0"
              class="q-mx-lg q-mb-lg"
              color="blue-9"
              round
              icon="search"
              size="sm"
            />
            <q-btn
              :disable="roleEdit.length == 0"
              @click="resetRole()"
              class="q-mb-lg"
              color="red-9"
              round
              icon="cancel"
              size="sm"
            />
          </div>
          <q-btn
            v-show="setVisible('configuracion.permisos.edit')"
            :disable="!editRl() || roleEdit.length == 0"
            @click="putRole()"
            label="Guardar cambios"
            color="blue-9"
            icon="save"
            size="sm"
          />
        </q-card>
      </div>
      <div class="col q-mx-md">
        <q-scroll-area class="fit shadow-1" style="min-height: 500px">
          <q-card flat bordered class="bg-grey-1 text-black q-pa-md">
            <q-option-group
              :disable="!setVisible('configuracion.permisos.edit')"
              :options="permisos"
              type="checkbox"
              v-model="selection"
            />
          </q-card>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
import { ref } from "vue";
var stringOptions = [].reduce((acc, opt) => {
  for (let i = 1; i <= 5; i++) {
    acc.push(opt + " " + i);
  }
  return acc;
}, []);

export default {
  setup() {
    const model = ref(null);
    const options = ref(stringOptions);

    return {
      model,
      options,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLocaleLowerCase().indexOf(needle) > -1
          );
        });
      },

      setModel(val) {
        model.value = val;
      },
    };
  },
  data() {
    return {
      permisos: [],
      selection: [],
      selectionBckup: [],
      users: [],
      user: "",
      role: "",
      roleEdit: "",
      enableBtn: false,
    };
  },
  created() {
    this.getPermisos();
    this.getRoles();
    this.getUsers();
  },
  methods: {
    ...mapActions("permisos", ["createRole", "editRole", "getRole"]),
    setVisible(permiso) {
      let permisos = JSON.parse(sessionStorage.getItem("permissions"));
      if (permisos) {
        let visible = permisos.indexOf(permiso) != -1 ? true : false;
        return visible;
      }else {
        return false;
      }
    },
    async getRoles() {
      try {
        let res = await this.$store.dispatch("permisos/getRoles");
        res.forEach(this.setRoles);
      } catch (error) {
        console.error(error);
      }
    },
    getPermisos() {
      this.$store
        .dispatch("permisos/getPermissions")
        .then((res) => {
          res.forEach(this.setPermissions);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getUsers() {
      this.$store
        .dispatch("configuracion/fetchUsuarios")
        .then((res) => {
          res.forEach(this.setUsers);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    postRole() {
      let formData = new FormData();
      if (this.user != "") formData.append("user", this.user);
      formData.append("roleName", this.role);
      formData.append("permissions", JSON.stringify(this.selection));

      this.createRole(formData)
        .then((res) => {
          // console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    putRole() {
      let formData = new FormData();
      formData.append("roleName", this.roleEdit);
      formData.append("permissions", JSON.stringify(this.selection));

      this.editRole(formData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async searchRole() {
      try {
        this.selection = [];
        let res = await this.getRole({ roleName: this.roleEdit });
        res.permissions.forEach(this.selectedPermissions);
        this.selectionBckup = this.selection;
      } catch (error) {
        console.error(error);
      }
    },

    editRl() {
      let a = JSON.stringify(this.selection);
      let b = JSON.stringify(this.selectionBckup);
      let edit = a != b ? true : false;
      return edit;
    },

    resetRole() {
      this.selection = [];
      this.roleEdit = "";
    },

    setRoles(element) {
      stringOptions.push(element.name);
    },

    selectedPermissions(element) {
      this.selection.push(element.name);
    },

    setPermissions(element) {
      this.permisos.push({
        label: element.description,
        value: element.name,
      });
    },

    setUsers(element) {
      this.users.push({
        value: element.id,
        label: element.name,
      });
    },
  },
};
</script>
