<template>
  <q-page>
    <q-select
      filled
      :model-value="model"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      @input-value="setModel"
      hint="Select a role"
      style="width: 350px; padding-bottom: 32px"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-page>
</template>

<script>
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
      roles: [],
    };
  },
  mounted(){
    this.getRoles();
  },
  methods: {
    async getRoles() {
      try {
        let res = await this.$store.dispatch("permisos/getRoles");
        res.forEach(this.setRoles);
      } catch (error) {
        console.error(error);
      }
    },
    setRoles(element) {
      stringOptions.push(element.name);
    },
  },
};
</script>
