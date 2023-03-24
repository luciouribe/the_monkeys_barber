<template>
  <q-card-section>
    <q-timeline>
      <q-timeline-entry
        v-for="item in commits.slice().reverse()"
        :key="item"
        :subtitle="'Nota de ' + item.nombre_usuario + ' - ' + item.fecha"
        :avatar="userIMG + item.user_icon"
        color="grey-6"
      >
        <span v-if="item.type == 'new'">
          <q-chip color="green-2" style="font-size: 12px" icon="note_add">
            {{ item.comment }}
          </q-chip>
        </span>
        <span v-if="item.type == 'comment'">
          <q-chip color="blue-2" style="font-size: 12px" icon="comment">
            {{ item.comment }}
          </q-chip>
        </span>
        <span
          v-if="item.type == 'put'"
          v-for="item2 in item.campos_mutated"
          :key="item2"
        >
          <q-chip style="font-size: 12px" icon="update">
            {{ item2.campo }}: {{ item2.before }} » {{ item2.after }} </q-chip
          ><br />
        </span>
        <q-separator />
      </q-timeline-entry>
    </q-timeline>
  </q-card-section>
</template>
<script>
export default {
  name: "commits-component",
  props: {
    commits: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      userIMG: "",
    };
  },
  mounted() {
    var urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
    this.userIMG = urlsplit + "/images/users/";
  },
};
</script>
