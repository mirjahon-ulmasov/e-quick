<template>
  <div>
    <table id="table" style="width: 100%">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in resultTemplates" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ tr.title }}
          </td>
          <td style="padding-left: 40px !important;">
            {{ tr.items.map((x) => x.quantity).reduce((acc, item) => {
              return acc += item
            },0)  }}
          </td>
          <td>
            {{ tr.items.map((x) => x.price).reduce((acc, item) => {
              return acc += item
            },0).toLocaleString("de-DE") }} 
            <span class="ml-1">{{ $t("sum") }}</span>
          </td>
          <td style="padding-left: 70px !important;" >
            <img src="../../assets/images/icons/eye-show.svg" alt="">
          </td>
        </tr>
      </tbody>
    </table>
    <order-item
      :isOrderItem="Sidebar"
      @closeSidebar="toggleDataSidebar"
    ></order-item>
  </div>
</template>

<script>
import OrderItem from "../../components/dealer/OrderItems.vue";
export default {
  data() {
    return {
      headers: [
        { title: "№" },
        { title: this.$t("templates.name") },
        { title: this.$t("templates.quantity") },
        { title: this.$t("templates.price") },
        { title: "Посмотреть" },
      ],
      selected: [],
      page: 1,
      perPage: 1,
      pages: [],
      Sidebar: false,
      search: "",
    };
  },
  components: {
    OrderItem,
  },
  computed: {
    resultTemplates() {
      if (this.search) {
        return this.templates.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.templates;
      }
    },
    templates() {
      return this.$store.state.product.templetes;
    },
  },
  methods: {
    Open(id) {
      this.$store.dispatch("product/GetOrderItem", id).then((response) => {});
      setTimeout(() => {
        this.toggleDataSidebar(true);
      }, 200);
    },
    toggleDataSidebar(val = false) {
      this.Sidebar = val;
    },
  },
  created() {
    this.$store.dispatch("product/GetTemplates");
  },
};
</script>

<style lang="scss" scoped>
.bottom-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .export {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 30px;
    border: none;
    background: transparent;
    .text-export {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #4679ec;
      margin-left: 10px;
    }
  }
}
</style>