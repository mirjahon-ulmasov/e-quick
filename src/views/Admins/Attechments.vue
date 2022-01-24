<template>
  <div>Attachement</div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PopUpList from "@/components/admin/AddAdmin.vue";
export default {
  name: "",
  components: { PopUpList, VuePerfectScrollbar },
  data() {
    return {
      PopUp: false,
      activeUser: null,
      PopUpData: {},
      haveValue: false,
      settings: {
        maxScrollbarLength: 60,
      },
    };
  },
  computed: {
    scrollbarTag() {
      return this.$store.getters.scrollbarTag;
    },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    admins() {
      return this.$store.state.addUser.admins.reverse();
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.products.length;
    },
  },
  methods: {
    getUser(id) {
      this.activeUser = this.admins.find((x) => x.id === id);
    },
    addNewData() {
      this.PopUpData = {};
      this.toggleDataSidebar(true);
    },
    deleteData(id) {
      this.$store.dispatch("addUser/removeItem", id);
      this.$store.dispatch("addUser/fetchDataListItems").then((response) => {
        this.$vs.notify({
          title: "Deleted",
          text: "Ok",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success",
        });
        this.activeUser = response.data[0];
      });
    },
    editData(data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.PopUpData = data;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.PopUp = val;
      this.$store.dispatch("addUser/fetchDataListItems");
      this.$store.dispatch("addUser/fetchDataListItems").then((response) => {
        this.activeUser = response.data[0];
      });
    },
    scrollHandle(evt) {
      return evt;
    },
  },
  created() {
    this.$store.dispatch("addUser/fetchDataListItems").then((response) => {
      this.activeUser = response.data[0];
    });
  },
  mounted() {
    this.$store.dispatch("addUser/fetchDataListItems");
  },
};
</script>
<style lang="scss" scoped></style>
