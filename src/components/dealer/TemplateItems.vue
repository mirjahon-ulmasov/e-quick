<template>
  <div>
    <transition name="show">
      <div class="overlay" v-show="isSidebarActiveLocal">
        <div class="sidebar">
          <div class="actions">
            <feather-icon
              :icon="'XIcon'"
              @click="Reset()"
              class="icon"
              svgClasses="h-6 w-9"
            />
          </div>
          <div class="body">
            <h2 class="filter">Данные о {{ carts.title }}</h2>
            <div class="table-item">
              <table id="tableCart">
                <thead>
                  <tr>
                    <th v-for="(header, i) in headers" :key="i">
                      {{ header.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cart, i) in carts.items" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ cart.product_name }}</td>
                    <td>
                      {{ cart.quantity }}
                    </td>
                    <td>
                      {{ Number(cart.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                      {{ $t("sum") }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="itogo mt-4">
              <h3 class="text">{{ $t("cart.total_price") }}</h3>
              <h1 class="prise">
                {{ Number(carts.total_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
                {{ $t("sum") }}
              </h1>
            </div>
            <div class="buttons" style="margin-top: 30px">
              <my-button
                style="margin-bottom: 9px"
                type="button"
                @click.native="Order()"
                :width="381"
                bgColor="#FFFFFF"
                color="#4679EC"
                :title="$t('templates.order')"
              ></my-button>
              <my-button
                @click.native="AddCart()()"
                :width="381"
                :title="$t('templates.addCart')"
              ></my-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <order
      :isSidebarOrder="SidebarOrder"
      @closeSidebarOrder="toggleDataSidebarOrder"
    ></order>
  </div>
</template>

<script>
import Order from "./Order.vue";
export default {
  name: "",
  data() {
    return {
      headers: [
        { title: "№" },
        { title: "Товар" },
        { title: "Кол-во" },
        { title: "Цена" },
      ],
      SidebarOrder: false,
    };
  },
  props: {
    isOrderItem: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isOrderItem(val) {
      if (!val) return;
    },
  },
  computed: {
    carts() {
      return this.$store.state.product.tempDetail;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isOrderItem;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar");
          setTimeout(() => {
            this.$store.commit("product/NullData");
          }, 220);
        }
      },
    },
  },
  components: {
    Order,
  },
  methods: {
    AddCart() {
      this.isSidebarActiveLocal = false;
      this.$store
        .dispatch("product/AddCartTemplate", {
          user_id: parseInt(localStorage.getItem("Id")),
          template_id: this.carts.template_id,
        })
        .then((response) => {
          this.isSidebarActiveLocal = false;
          this.$vs.notify({
            title: "OK",
            text: this.$t("success"),
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success",
          });
          this.isSidebarActiveLocal = false;
          this.$router.push("/dealer/create-order");
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
          console.error(err);
        });
    },
    Order() {
      this.isSidebarActiveLocal = false;
      setTimeout(() => {
          this.toggleDataSidebarOrder(true);
      }, 500);
    },
    Reset() {
      this.$emit("closeSidebar");
    },
    toggleDataSidebarOrder(val = false) {
      this.SidebarOrder = val;
    },
  },
  created() {
    this.$store.dispatch("product/GetTemplatesItem");
  },
};
</script>

<style lang="scss" scoped>
.table-item {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 55vh;
  position: relative;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 30px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: #f5f8fd;
    border-radius: 30px;
    border: 1px solid transparent;
    background-clip: content-box;
  }
  #tableCart {
    position: absolute;
    min-width: 400px;
    border-collapse: collapse;
    border-radius: 8px;
    margin-top: 20px;
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
          font-size: 15px;
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
          padding: 20px !important;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 20px;

          /* Main txt */

          color: #394560;
          padding: 10px 15px;
        }
      }
    }
  }
}
.itogo {
  text-align: end;
  margin-top: 10px;
  .text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: right;
    color: #394560;
  }
  .prise {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    margin-top: 8px;
    text-align: right;
    color: #60739f;
  }
}
</style>