<template>
  <div class="carts">
    <table id="tableCart">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cart, i) in carts.items" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ cart.product_name }}</td>
          <td>{{ cart.quantity }}</td>
          <td>
            {{ Number(cart.price).toLocaleString("de-DE") }} {{ $t("sum") }}
          </td>
          <vs-td style="text-align: center">
            <feather-icon
              icon="TrashIcon"
              @click="deleteCartProduct(tr.id)"
              svgClasses="h-5 w-5 hover:text-success text-danger"
              class="ml-1"
            />
          </vs-td>
        </tr>
      </tbody>
    </table>
    <!-- <order
      :isPopUpOrder="PopUpOrder"
      @closeSidebarOrder="toggleDataSidebarOrder"
    ></order>
      <temp
      :isPopUpTemp="PopUpTemp"
      @closeSidebarTemp="toggleDataSidebarTemp"
    ></temp> -->
  </div>
</template>
<script>
// import Order from "../order/Order.vue";
// import Temp from "../templates/saveTemp.vue"
export default {
  name: "Home",
  computed: {
    carts() {
      return this.$store.state.product.carts;
    },
  },
  data() {
    return {
      headers: [
        { title: "№" },
        { title: "Товар" },
        { title: "Кол-во" },
        { title: "Цена" },
        { title: "Удалить" },
      ],
      edit: false,
      NameWab: "",
      PopUpTemp: false,
      Id: null,
      PopUp: false,
      PopUpOrder: false,
      incQuan: null,
      incProductId: null,
      currentEditId: null,
    };
  },
  //   components: {
  //     Order,
  //     Temp
  //   },
  methods: {
    deleteCartProduct(id) {
      this.$store.dispatch("product/DeleteCartItem", id).then((response) => {
        this.$store.dispatch("product/GetCart");
        this.$vs.notify({
          text: this.$t("delete"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success",
        });
      });
    },
    AddOrder() {
      this.toggleDataSidebarOrder(true);
      this.$store.dispatch("product/GetCart");
    },
    AddWab() {
      this.toggleDataSidebarTemp(true);
    },
    toggleDataSidebarOrder(val = false) {
      this.PopUpOrder = val;
    },
    toggleDataSidebarTemp(val = false) {
      this.PopUpTemp = val;
    },
    Inc(tr) {
      const quantity = {
        item_price: tr.total_price / tr.quantity,
        quantity: tr.quantity + 1,
        id: tr.id,
      };
      this.incQuan = tr.quantity + 1;
      this.incProductId = tr.product_id;
      this.$store.commit("product/UPDATE_QUANTITY", quantity);
      // this.incProductId = tr.product_id;
      // this.incQuan = tr.quantity;
    },
    Min(tr) {
      if (tr.quantity > 1) {
        const quantity = {
          item_price: tr.total_price / tr.quantity,
          quantity: tr.quantity - 1,
          id: tr.id,
        };
        this.incQuan = tr.quantity - 1;
        this.incProductId = tr.product_id;
        this.$store.commit("product/MIN_QUANTITY", quantity);
        // this.incProductId = tr.product_id;
        // this.incQuan = tr.quantity;
      }
    },
    IncEdit(tr) {
      if (this.incQuan) {
        this.incProductId = tr.product_id;
        this.$store
          .dispatch("product/AddCart", {
            user_id: parseInt(localStorage.getItem("Id")),
            product_id: this.incProductId,
            quantity: parseInt(this.incQuan),
          })
          .then((response) => {
            this.incQuan = null;
            this.incProductId = null;
            this.Id = null;
            this.$vs.notify({
              title: "Updated",
              text: "Ozgardi",
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success",
            });
            this.$store.dispatch("product/GetCart");
          });
        // .catch((err) => {
        //   this.$vs.notify({
        //     title: "Error",
        //     text: err,
        //     iconPack: "feather",
        //     icon: "icon-alert-circle",
        //     color: "danger",
        //   });
        // this.$store.dispatch("product/GetCart");
        // });
      }
    },
  },
  created() {
    this.$store.dispatch("product/GetCart");
  },
};
</script>
<style lang="scss" scoped>
#tableCart {
  min-width: 400px;
  border-collapse: collapse;
  border-radius: 8px;
  margin-top: 30px;
  overflow-y: scroll;
  max-height: 400px;
  thead {
    width: 100%;
    height: 56px;
    background: #f6f8fe;
    border-radius: 6px;
    tr {
      th {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        padding: 20px;
        /* Text */

        color: #60739f;

        &:first-child {
          border-radius: 8px 0 0 8px;
        }

        &:last-child {
          border-radius: 0 8px 8px 0;
          padding-right: 38px;
        }
      }
    }
  }
  tbody {
    width: 100%;
    background: transparent !important;
    border-radius: 8px;
    tr {
      td {
        padding: 30px !important;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;

        /* Main txt */

        color: #394560;
        padding: 10px 15px;
      }
    }
  }
}
</style>