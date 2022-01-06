<template>
  <div style="width: 100%">
    <div class="row flex vx-row">
      <div
        class="vx-col lg:w-3/5 flex"
        style="padding: 20px; padding-left: 20px; padding-right: 40px"
      >
        <div class="vx-row">
          <div class="vx-col sm:w-full md:w-1/2">
            <h2 class="cathaed">{{ $t("cart.category") }}</h2>
            <v-select
              class="sle"
              maxHeight="800px"
              @input="getCat"
              v-model="activeCategory"
              :options="category"
              label="name"
            />
            <vs-spacer class="spacer" style="height: 175px" />
          </div>
          <div class="vx-col sm:w-full md:w-1/2">
            <h2 class="cathaed">{{ $t("cart.podcategory") }}</h2>
            <v-select
              class="sle"
              @input="getProduct"
              v-model="activePod"
              :options="podCategory"
              label="name"
            />
            <vs-spacer class="spacer" style="height: 175px" />
          </div>
          <div class="vx-col w-full mt-6">
            <h2 class="cathaed">{{ $t("cart.productS") }}</h2>
            <v-select
              class="sle"
              @input="AddCart"
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
                  Loading more options...
                </li>
              </template>
            </v-select>
            <vs-spacer style="height: 200px" />
            <vs-spacer />
            <vs-spacer />
            <vs-spacer />
            <div class="vx-col w-full mt-6" style="padding-top: 120px">
              <weather></weather>
            </div>
          </div>
        </div>
      </div>
      <div class="vx-col sm:w-full lg:w-2/5 left-bg">
        <CartTable />
        <!-- <div class="imzo"></div> -->
      </div>
    </div>
    <add-cart
      :isPopUp="PopUp"
      @closeSidebar="toggleDataSidebar"
      :data="PopUpData"
    ></add-cart>
  </div>
</template>
<script>
import AddCart from "@/components/dealers/carts/AddCart.vue";
import Weather from "@/components/dealers/Weather.vue";
import CartTable from "@/components/dealers/carts/CartTable.vue";
import VSelect from "vue-select";
import axios from '../../axios'
export default {
  name: "Home",
  computed: {
    category() {
      return this.$store.state.category.categories;
    },
    products() {
      return this.$store.state.product.productes.results;
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
    paginated() {
      if(this.products){
        return this.resultProduct.slice(0, this.limit)
      }
    },
    hasNextPage() {
      return this.$store.state.product.productes.count > this.paginated.length
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
  components: {
    AddCart,
    Weather,
    CartTable,
    VSelect,
  },
  methods: {
    getCat(data) {
      console.log(this.activeCategory);
      this.podCategory = this.activeCategory
        ? this.activeCategory.children
        : null;
      const obj = {
        id: this.activeCategory.id,
        page: 1,
      };
      this.$store.dispatch("product/GetProduct", obj).then((response) => {
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
      console.log(this.podCategory);
      this.categoryPop = false;
      // this.podcategoryPop = true
    },
    getProduct() {
      const obj = {
        id: this.activePod.id,
        page: 1,
      };
      this.$store
        .dispatch("product/GetProduct", obj)
      this.podcategoryPop = false;
    },
    AddCart() {
            this.PopUpData = this.activeProduct;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.$store.dispatch("product/GetCart");
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
      axios.get('api/v1/subcategory/' + `${obj.id}/products`, 
      { params: { page: obj.page  } }
      ).then(res => {
        this.$store.commit("product/Pagination", res.data)
        console.log(res, 'mana');
      })
        console.log(target, 'target')
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 50;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
      else{

      }
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  created() {
    this.$store.dispatch("category/GetItem");
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.row {
  height: 100%;
  width: 100%;
  display: flex;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #234b79;
  }
  .demo-alignment {
    display: flex;
    flex-direction: inherit;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    margin: 0 !important;
    margin-top: 10px !important;
    /* position: relative !important; */
    height: 175.99px;
    overflow-y: scroll;
    background: #ffffff;
    box-shadow: 0px 3.70934px 12.9827px rgba(0, 0, 0, 0.1);
  }
  .texts {
    width: 100%;
    font-family: Montserrat !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 13.91px !important;
    line-height: 17px !important;
    padding: 10px;
    cursor: pointer;
    /* identical to box height */
    color: #333333 !important;
  }
  .texts:hover {
    color: #3a9fd1 !important;
  }
  .demo-alignment::-webkit-scrollbar {
    width: 3px;
    height: 150px !important;
    background: linear-gradient(90deg, #5e585c 0%, #000000 100%);
    border-radius: 0px 0px 7.41868px 7.41868px;
  }
  .demo-alignment::-webkit-scrollbar-thumb {
    background: linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
    border-radius: 7.41868px;
    height: 70px;
  }
  .cathaed {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 15px !important;
    background: linear-gradient(90deg, #5e585c 0%, #000000 100%);
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    display: table;
    line-height: 19px;
  }
  .loader {
    text-align: center;
    color: #bbbbbb;
  }
  .left-bg {
    background: #f9fafc;
    padding: 20px 0px 20px 20px;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
  }
  .sle,
  .v-select {
    .vs__dropdown-menu {
      margin-top: 10px;
      height: 300px !important;
      overflow-y: scroll;
    }
  }
}
@media (max-width: 1600px) {
  .spacer {
    height: auto !important;
  }
}
</style>