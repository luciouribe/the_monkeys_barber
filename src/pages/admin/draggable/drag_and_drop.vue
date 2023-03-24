<template>
  <q-page class="q-gutter-lg">
    <div class="modal"></div>
    <div class="flex flex-center q-gutter-sm">
      <q-btn
        size="22px"
        class="q-px-xl q-py-xs"
        color="positive"
        no-caps
        icon="note_add"
        label="Selecciona archivo"
        @click="$refs.selectFile.click()"
      />
    </div>
    <div class="flex flex-center q-gutter-sm">
      <q-card class="q-pa-sm">
        <q-card
          class="flex flex-center q-ma-sm"
          style="width: 400px; height: 400px"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          id="drop-form"
          @drop="handleFileDrop($event)"
        >
          <q-card-section class="text-center">
            <div class="text-center" v-if="file.name">
              <q-icon name="task" size="150px" />
              <div class="text-grey text-center">{{ file.name }}</div>
            </div>
            <div class="text-grey text-center" v-else>
              Haz click para seleccionar el documento o sueltalo aqui
            </div>
          </q-card-section>
        </q-card>

        <q-card-actions v-show="file.name">
          <q-btn flat color="dark" label="Eliminar" @click="removeFile()" />
          <q-btn flat color="primary" label="Guardar" @click="submitFile()" />
        </q-card-actions>
      </q-card>
    </div>
    <input
      hidden
      type="file"
      ref="selectFile"
      @change="handleFileClick()"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />
  </q-page>
</template>

<script>
import axios from "axios";
import { read, utils } from "xlsx";
import { mapActions } from "vuex";
import { Notify } from "quasar";
export default {
  data() {
    return {
      fileType: [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
      dragAndDropCapable: false,
      file: {},
      uploadPercentage: 0,
    };
  },

  mounted() {
    this.validateDragAnDrop();
  },

  methods: {
    ...mapActions("productos", ["cargaMasiva"]),
    validateDragAnDrop() {
      this.dragAndDropCapable = this.determineDragAndDropCapable();

      if (this.dragAndDropCapable) {
        this.bindEvents();
      }
    },

    determineDragAndDropCapable() {
      var div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window
      );
    },

    bindEvents() {
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(
        function (evt) {
          document.getElementById("drop-form").addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            }.bind(this),
            false
          );
        }.bind(this)
      );
    },

    handleFileDrop(event) {
      let doc = event.dataTransfer.files[0];
      let found = this.fileType.find((element) => element == doc.type);
      if (found != undefined) {
        this.file = event.dataTransfer.files[0];
      } else {
        this.removeFile();
        Notify.create({
          type: "negative",
          position: "top-right",
          message: "Este tipo de archivo no está permitido",
        });
      }
    },

    handleFileClick() {
      let doc = this.$refs.selectFile.files[0];
      let found = this.fileType.find((element) => element == doc.type);
      if (found != undefined) {
        this.file = this.$refs.selectFile.files[0];
        let form = document.getElementById("drop-form");
        form.classList.add("drag-enter");
        console.log(this.file);
      } else {
        this.removeFile();
        Notify.create({
          type: "negative",
          position: "top-right",
          message: "Este tipo de archivo no está permitido",
        });
      }
    },

    removeFile() {
      let form = document.getElementById("drop-form");
      form.classList.remove("drag-enter");
      this.file = {};
    },

    dragEnter(e) {
      if (e.target.draggable !== true) {
        e.target.classList.add("drag-enter");
      }
    },

    dragLeave(e) {
      e.target.classList.remove("drag-enter");
    },

    submitFile() {
      let userId = sessionStorage.getItem("userId");
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = e.target.result;
        let wb = read(data, { type: "array" });
        let sh = wb.SheetNames;
        let jsonData = utils.sheet_to_json(wb.Sheets[sh[0]]);

        let formData = new FormData();
          formData.append("user_id", userId);
          formData.append("productos", JSON.stringify(jsonData));
        // for (let i = 0; i < jsonData.length; i++) {
        //   let file = jsonData[i];

        //   formData.append("file[" + i + "]", file);
        // }

        console.log(jsonData);
        this.cargaMasiva(formData).catch((error) => {
          console.error(error);
        });
      };
      reader.readAsArrayBuffer(this.file);
    },
  },
};
</script>

<style lang="sass">
.drag-enter
  outline: 3px
  outline-style: dashed
  outline-color: #21BA45
</style>
