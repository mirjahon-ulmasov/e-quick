<template>
  <div class="carts">
    <div class="table" v-if="carts">
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
            <td>
              <div class="flex quantity">
                <button
                  type="button"
                  v-if="!Id"
                  class="inc"
                  @click="Min(cart)"
                  @mouseleave="IncEdit(cart)"
                >
                  <feather-icon
                    icon="MinusIcon"
                    svgClasses="h-3 w-4"
                    class="icon"
                  />
                </button>
                <input
                  class="add"
                  v-if="Id === cart.id"
                  v-model="incQuan"
                  @keyup.enter="IncEdit(cart)"
                  type="text"
                />
                <input
                  v-if="!Id"
                  class="add"
                  @mousedown="Id = cart.id"
                  v-model="cart.quantity"
                  type="text"
                />
                <button
                  class="inc"
                  v-if="!Id"
                  @click="Inc(cart)"
                  @mouseleave="IncEdit(cart)"
                >
                  <feather-icon
                    icon="PlusIcon"
                    svgClasses="h-3 w-4"
                    class="icon"
                  />
                </button>
                <button
                  type="button"
                  v-if="Id === cart.id"
                  @click="IncEdit(cart)"
                  class="inc"
                >
                  <feather-icon
                    icon="CheckIcon"
                    class="icon"
                    svgClasses="h-4 w-5"
                  />
                </button>
              </div>
            </td>
            <td>
              {{ cart.total_price.toLocaleString("de-DE") }} {{ $t("sum") }}
            </td>
            <vs-td style="text-align: center">
              <img
                src="../../assets/images/icons/delete-icon.svg"
                alt="trash"
                style="cursor: pointer"
                @click="deleteCartProduct(cart.id)"
              />
            </vs-td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="carts !== null">
      <div class="itogo mt-4">
        <h2 class="text">{{ $t("cart.total_price") }}</h2>
        <h1 class="prise">
          {{ Number(carts.total_price).toLocaleString("de-DE") }}
          {{ $t("sum") }}
        </h1>
      </div>
      <div class="buttons">
        <button @click="toggleDataSidebarTemp(true)" class="temp">
          {{ $t("saveTemp") }}
        </button>
        <button @click="toggleDataSidebarOrder(true)" class="offering">
          {{ $t("cart.offerZa") }}
        </button>
      </div>
    </div>
    <div class="not-found" v-if="!carts">
      <img src="../../assets/images/icons/order-bg.svg" alt="" />
      <p>
        Ваша корзинка пуста. Пожалуйста выберите необходимые товары для покупки.
      </p>
    </div>
    <order
      :isSidebarOrder="SidebarOrder"
      @closeSidebarOrder="toggleDataSidebarOrder"
    ></order>
    <temp
      :isSidebarTemp="SidebarTemp"
      @closeSidebarTemp="toggleDataSidebarTemp"
    ></temp>
  </div>
</template>
<script>
import Order from "./Order.vue";
import Temp from "./CreateShablon.vue";
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
      SidebarTemp: false,
      SidebarOrder: false,
      incQuan: null,
      incProductId: null,
      currentEditId: null,
    };
  },
  components: {
    Order,
    Temp,
  },
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
    toggleDataSidebarOrder(val = false) {
      console.log(val);
      this.SidebarOrder = val;
    },
    toggleDataSidebarTemp(val = false) {
      this.SidebarTemp = val;
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
.table {
  overflow-y: scroll;
  overflow-x: scroll;
  max-height: 50vh;
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
    min-width: 400px;
        width: 100%;
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
          .quantity {
            display: flex;
            input {
              border: none;
              margin: 0px 5px;
              min-width: 40px;
              max-width: 50px;
              text-align: center;
              font-family: Montserrat;
              font-style: normal;
              font-weight: 600;
              font-size: 18px;
              line-height: 22px;

              color: #394560;
            }
            .inc {
              border: none;
              background: #edf1fd;
              cursor: pointer;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              .icon {
                color: #4679ec;
                display: flex;
                justify-content: center;
              }
            }
          }
        }
      }
    }
  }
}
.itogo {
  text-align: end;
  margin-top: 30px;
  .text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    text-align: right;

    /* Main txt */

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
.buttons {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0px 50px 0px 60px;
  text-align: center;
  .temp {
    background: transparent !important;
    width: 100%;
    border: none;
    padding: 15px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #4679ec;
    cursor: pointer;
  }
  .offering {
    margin-top: 15px;
    width: 100%;
    background: #4679ec;
    border-radius: 10px;
    cursor: pointer;
    border: none;
    padding: 15px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #ffffff;
  }
}
.not-found {
  width: 100%;
  padding-top: 70px;
  text-align: center;
  p {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;

    /* Main txt */

    color: #394560;
  }
}
</style>