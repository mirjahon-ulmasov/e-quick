<template>
  <div class="order">
    <form @submit.prevent="AddToCart()" style="width: 40%">
      <div class="form-input">
        <h4>Выберите завод</h4>
        <v-select
          :options="category"
          label="name"
          @input="getCat()"
          v-model="activeCategory"
          id="select-state"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <img src="../../assets/images/icons/select2.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="form-input">
        <h4>Выберите категорию</h4>
        <v-select
          @input="getProduct()"
          :options="podCategory"
          v-model="activePod"
          label="name"
          id="select-state"
        >
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <img src="../../assets/images/icons/select2.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="form-input">
        <h4>Выберите товар</h4>
        <v-select
          v-model="activeProduct"
          @search="(query) => (searchProduct = query)"
          :options="paginated"
          @input="calcPrice = activeProduct.price"
          :filterable="false"
          @open="onOpen"
          @close="onClose"
          label="name"
        >
          <template #list-footer>
            <li v-show="hasNextPage" ref="load" class="loader"></li>
          </template>
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <img src="../../assets/images/icons/select2.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="detail" v-if="activeProduct">
        <h2 class="head">Детали заказа:</h2>
        <div class="item">
          <img
            src="../../assets/images/icons/products-bold.svg"
            width="130px"
            alt="user icon"
          />
          <div class="right">
            <h3>{{ activeProduct.name }}</h3>
            <div style="display: flex; align-items: center">
              <span> Количество: </span>
              <div class="quantity">
                <button class="inc" type="button" @click="Minus()">
                  <feather-icon
                    :icon="'MinusIcon'"
                    class="icon"
                    svgClasses="h-6 w-9"
                  />
                </button>
                <input type="text" v-model="count" />
                <button class="inc" type="button" @click="Plus()">
                  <feather-icon
                    :icon="'PlusIcon'"
                    class="icon"
                    svgClasses="h-6 w-9"
                  />
                </button>
              </div>
              <div></div>
            </div>
            <span>
              Цена:
              <span class="bold">
                {{
                  calcPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                сум
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="actions">
        <button type="button" @click="activeProduct = null">Отменить</button>
        <button
          style="background: #4679ec; color: #ffffff"
          :disabled="activeProduct === null"
          :style="activeProduct === null ? 'opacity: 0.5' : ''"
        >
          В корзинку
        </button>
      </div>
    </form>
    <div class="cart">
      <h2 class="head">Корзинка</h2>
      <Cart />
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
import Cart from "../../components/dealer/CartTable.vue";
export default {
  name: "Home",
  computed: {
    category() {
      return this.$store.state.product.categories;
    },
    products() {
      return this.$store.state.product.productes.results;
    },
    paginated() {
      if (this.products) {
        return this.resultProduct.slice(0, this.limit);
      }
    },
    resultProduct() {
      if (this.searchProduct) {
        return this.products.filter((item) => {
          return this.searchProduct
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    },
    hasNextPage() {
      return this.$store.state.product.productes.count > this.paginated.length;
    },
  },
  data() {
    return {
      limit: 50,
      observer: null,
      count: 1,
      activeCategory: null,
      activePod: null,
      podCategory: [],
      activeProduct: null,
      calcPrice: null,
    };
  },
  components: {
    Cart,
  },
  methods: {
    getCat(data) {
      this.podCategory = this.activeCategory
        ? this.activeCategory.children
        : null;
      const obj = {
        id: this.activeCategory.id,
        page: 1,
      };
      this.$store.dispatch("product/GetProduct", obj.id).then((response) => {});
    },
    getProduct() {
      const obj = {
        id: this.activePod.id,
        page: 1,
      };
      this.$store.dispatch("product/GetProduct", obj.id);
    },
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const obj = {
          id: this.activeCategory.id,
          page: this.paginated.length / 50 + 1,
        };
        axios
          .get("api/v1/subcategory/" + `${obj.id}/products`, {
            params: { page: obj.page },
          })
          .then((res) => {
            this.$store.commit("product/Pagination", res.data);
          });
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 50;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      } else {
      }
    },
    Minus() {
      if (this.count > 1) {
        this.count = this.count - 1;
        this.calcPrice = this.activeProduct.price / this.count;
      } else {
        this.count = 1;
        this.calcPrice = this.activeProduct.price;
      }
    },
    Plus() {
      this.count = this.count + 1;
      this.calcPrice = this.count * this.activeProduct.price;
    },
    AddToCart() {
      this.$store
        .dispatch("product/AddCart", {
          user_id: parseInt(localStorage.getItem("Id")),
          product_id: this.activeProduct.id,
          quantity: this.count,
        })
        .then((response) => {
          this.activeProduct = null;
          this.count = 1;
          if (response.statusText == "Created") {
            this.$vs.notify({
              title: "Ok",
              text: this.$t("cart.addedP"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "success",
            });
          } else {
            this.$vs.notify({
              title: "Ok",
              text: this.$t("cart.updatedP"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "warning",
            });
          }
          this.$store.dispatch("product/GetCart");
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data.detail,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });

          console.error(err);
        });
    },
    handlerOne() {
      this.notification.show = false;
    },
    handlerTwo() {
      this.notification.show = false;
    },
    handlerOneError() {
      this.notificationError = {
        show: false,
        content: "",
      };
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  created() {
    this.$store.dispatch("product/GetCategory");
  },
};
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  justify-content: space-between;
  width: 100%;
  // height: 100%;
  .detail {
    .item {
      margin-top: 20px;
      display: flex;
      img {
        width: 40%;
        height: 112px;
        background: #f6f8fe;
        border-radius: 8px;
        padding: 28px 35px;
        margin-right: 20px;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        span {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 17px;
          /* identical to box height */

          color: #333333;
        }
        .bold {
          font-family: Montserrat;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          /* identical to box height */

          color: #333333;
        }
        h3 {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 17px;
          /* identical to box height */

          color: #333333;
        }
        .quantity {
          margin-left: 15px;
          display: flex;
          input {
            border: none;
            margin: 0px 5px;
            min-width: 15px;
            width: 30px;
            text-align: center;
            font-family: Montserrat;
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
            /* identical to box height */

            /* Main txt */

            color: #394560;
          }
          .inc {
            border: none;
            background: #edf1fd;
            cursor: pointer;
            width: 32px;
            height: 32px;
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
  .actions {
    width: 100%;
    button {
      width: 45%;
      height: 46px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      pad: 15px 40px;
      background: #edf1fd;
      border-radius: 10px;
      border: none !important;
      color: #4679ec;
      cursor: pointer;
    }
  }
  .head {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;

    /* Main txt */

    color: #394560;
  }
  .cart {
    background: #ffffff;
    /* Main Sahdow */
    width: 55%;
    margin-left: 5%;
    // box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
    // clip-path: inset(15px 15px 15px -15px);
    border-radius: 0px;

    // height: 100%;
    padding: 25px;
  }
}
</style>
