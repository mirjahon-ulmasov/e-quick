<template>
  <div>
    <mtable :header="header" :items="items"></mtable>
    <my-button @click.native="Use()"></my-button>
    <my-input
      :type="'textarea'"
      v-model="activeUser"
      :error="errors.has('savdo_id')"
      :height="48"
      :width="375"
      name="savdo_id"
      v-validate="'required|numeric'"
    ></my-input>
    <span class="error-text" v-show="errors.has('savdo_id')">
      <feather-icon
        :icon="'InfoIcon'"
        style="color: #db2379 !important; margin-right: 5px"
        svgClasses="h-6 w-6"
      />
      {{ errors.first("savdo_id") }}</span
    >
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  name: "Company",
  data() {
    return {
      activePrompt: false,
      itemsPerPage: 4,
      activeUser: "f",
      PopUp: false,
      PopUpData: {},
      settings: {
        maxScrollbarLength: 60,
      },
      header: [{ title: "Salom" }, { title: "Salom" }, { title: "Salom" }],
      items: [{ title: "Salom" }, { title: "Salom" }, { title: "Salom" }],
    };
  },
  components: { VuePerfectScrollbar },
  methods: {
    Use() {
      console.log("dddd");
      console.log(this.activeUser);
    },
  },
};
</script>
<style scoped>
</style>
