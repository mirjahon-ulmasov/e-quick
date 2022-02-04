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
          :filterable="false"
          @open="onOpen"
          @close="onClose"
          label="name"
        >
          <template #list-footer>
            <li v-show="hasNextPage" ref="load" class="loader">
              <!-- Loading more options... -->
            </li>
          </template>
          <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
              <img src="../../assets/images/icons/select2.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="detail">
        <h2 class="head">Детали заказа:</h2>
        <div class="item">
          <img
            src="../../assets/images/icons/products-bold.svg"
            width="130px"
            alt="user icon"
          />
        </div>
      </div>
      <div class="actions">
        <button>Отменить</button>
        <button style="background: #4679ec; color: #ffffff">В корзинку</button>
      </div>
    </form>
    <div class="cart">
      <h2 class="head">Корзинка</h2>
      <div class="not-found">
        <img src="../../assets/images/icons/order-bg.svg" alt="" />
        <p>
          Ваша корзинка пуста. Пожалуйста выберите необходимые товары для
          покупки.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";
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
    resultQuery() {
      if (this.activeCategory) {
        return this.category.filter((item) => {
          return this.activeCategory
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.category;
      }
    },
    resultPodCategory() {
      if (this.activePod) {
        return this.podCategory.filter((item) => {
          return this.activePod
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.podCategory;
      }
    },
  },
  data() {
    return {
      limit: 50,
      observer: null,
      categoryPop: false,
      podcategoryPop: false,
      edit: false,
      PopUpData: {},
      PopUp: false,
      sanoq: null,
      activeCategory: null,
      activePod: null,
      product: [],
      searchQuery: null,
      searchProduct: null,
      searchPodCategory: null,
      date: null,
      active: false,
      activeProduct: null,
      popupActive: false,
      popupActive1: false,
      podCategory: [],
      currentEditId: null,
    };
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
      this.$store.dispatch("product/GetProduct", obj.id).then((response) => {
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
      this.categoryPop = false;
      // this.podcategoryPop = true
    },
    getProduct() {
      const obj = {
        id: this.activePod.id,
        page: 1,
      };
      this.$store.dispatch("product/GetProduct", obj.id);
      this.podcategoryPop = false;
    },
    toggleDataSidebar(val = false) {
      setTimeout(() => this.$store.dispatch("product/GetCart"), 500);
      this.PopUp = val;
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
    AddToCart() {
      if (this.dataId !== null && this.dataId >= 0) {
        this.$store
          .dispatch("product/AddCart", {
            user_id: parseInt(localStorage.getItem("Id")),
            product_id: this.dataId,
            quantity: this.count,
          })
          .then((response) => {
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
      }
      // this.$emit('closeSidebar')
      // some chANGES
      this.Reset();
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
  .detail {
    .item {
      margin-top: 20px;
      img {
        width: 40%;
        height: 112px;
        background: #f6f8fe;
        border-radius: 8px;
        padding: 28px 35px;
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
    width: 50%;
    box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
    clip-path: inset(15px 15px 15px -15px);
    border-radius: 0px;

    height: 80vh;
    padding: 25px;
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
  }
}
</style>
