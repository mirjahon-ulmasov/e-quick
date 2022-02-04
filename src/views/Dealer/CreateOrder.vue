<template>
  <div>
    <form @submit.prevent="AddToCart()" style="width: 40%" >
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
              <img src="../../assets/images/icons/select-icon.svg" alt="" />
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
              <img src="../../assets/images/icons/select-icon.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="form-input">
        <h4>Выберите товар</h4>
        <v-select
          class="sle"
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
              <img src="../../assets/images/icons/select-icon.svg" alt="" />
            </span>
          </template>
        </v-select>
      </div>
      <div class="actions">
        <my-button
          style="margin-left: 9px"
          type="submit"
          :width="375"
          title="Применить"
        ></my-button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '../../axios'
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

<style lang="scss" scoped></style>
