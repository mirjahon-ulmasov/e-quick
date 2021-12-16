<template>
  <div style="width: 100%">
    <div class="row flex vx-row">
      <div
        class="vx-col lg:w-3/5 flex"
        style="padding: 20px; padding-left: 20px; padding-right: 40px"
      >
        <div class="vx-row">
          <div class="vx-col sm:w-full md:w-1/2">
            <h2 class="cathaed">Выберите категорию</h2>
              <v-select 
               class="sle"
               @input="getCat"
               v-model="activeCategory" 
               :options="category" 
               label="name" />
            <!-- <div class="demo-alignment">
              <span
                class="texts"
                v-for="(item, i) in resultQuery"
                @click="getCat(item)"
                :key="i"
              >
                {{ item.name }}
              </span>
              <span
                class="texts"
                v-if="resultQuery === null"
                style="color: red !important"
              >
                No aviable data
              </span>
            </div> -->
          </div>
          <div class="vx-col sm:w-full md:w-1/2">
            <h2 class="cathaed">Выберите подкатегорию</h2>
              <v-select 
               class="sle"
               @open="activeCategory"
               @input="getProduct"
               v-model="activePod" 
               :options="podCategory" 
               label="name" />
          </div>
          <div class="vx-col w-full mt-6">
            <h2 class="cathaed">Выберите продукт</h2>
              <v-select 
               class="sle "
               @input="AddCart"
               v-model="activeProduct" 
               :options="products" 
               label="name" />
                   <vs-spacer style="height: 200px" />
                    <vs-spacer />
                     <vs-spacer />
                      <vs-spacer />
            <div class="vx-col w-full mt-6">
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
import AddCart from "./components/AddCart.vue";
import SideBar from "./components/Sidebar.vue";
import Weather from "./components/Weather.vue";
import CartTable from "./components/CartTable.vue";
import VSelect from 'vue-select'
export default {
  name: "Home",
  computed: {
    category() {
      return this.$store.state.category.categories;
    },
    products() {
      return this.$store.state.product.productes.results;
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
      podCategory: '',
      currentEditId: null,
    };
  },
  components: {
    AddCart,
    SideBar,
    Weather,
    CartTable,
    VSelect
  },
  methods: {
    getCat(data) {
      // this.$vs.loading({
      //   container: "#div-with-loading",
      //   scale: 0.6,
      //   color: "rgb(62, 97, 121)",
      // });
      console.log(this.activeCategory)
      console.log(data.id);
      // const category = this.category.find((company) => company.id === data.id);
      this.podCategory = this.activeCategory ? this.activeCategory.children : null;
      this.$store.dispatch("product/GetProduct", this.activeCategory.id).then((response) => {
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
      console.log(this.podCategory)
      this.categoryPop = false;
      // this.podcategoryPop = true
    },
    getProduct(data) {
      // this.$vs.loading({
      //   container: "#div-with-loading",
      //   scale: 0.6,
      //   color: "rgb(62, 97, 121)",
      // });
      this.$store.dispatch("product/GetProduct", this.activePod.id).then((response) => {
        this.product = response.data;
        console.log(this.products, "ollll");
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
      this.podcategoryPop = false;
    },
    AddCart(data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.PopUpData = this.activeProduct;
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.$store.dispatch("product/GetCart");
      setTimeout(() => this.$store.dispatch("product/GetCart"), 500);
      this.PopUp = val;
    },
  },
  mounted() {
    this.getCat()
    // this.sanoq = this.carts.items.length
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
  .left-bg {
    background: #f9fafc;
    padding: 20px 0px 20px 20px;
    border-bottom-right-radius: 30px;
    border-top-right-radius: 30px;
  }
  input.sle {
    position: relative;
    margin-top: 12px !important;
    background: #ffffff;
    box-shadow: 0px 3.70934px 12.9827px rgba(0, 0, 0, 0.1);
    border-radius: 7.41868px;
    width: 100%;
    border: none !important;
    padding-right: 20px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    font-size: 13.91px;
    padding-left: 12%;
    // width: 230px;
    line-height: 17px;
    height: 55px;
    color: rgba(58, 159, 209, 1) !important;
    &::placeholder {
      background-position: 12%;
      // color: rgba(58, 159, 209, 1) !important;
      background-image: linear-gradient(
        99.52deg,
        #3f4f61 -14.96%,
        #3a9fd1 156.83%
      );
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      display: table;
    }
    &:nth-child(2) {
      content: "";
      display: block;
      position: relative;
      background: url("~@/assets/dealer/img/icons/search.svg");
      background-repeat: no-repeat;
      background-position: 5%;
      background-size: 5%;
    }
  }
  input.large {
    position: relative;
    margin-top: 12px !important;
    background: #ffffff;
    box-shadow: 0px 3.70934px 12.9827px rgba(0, 0, 0, 0.1);
    border-radius: 7.41868px;
    border: none !important;
    padding-right: 20px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    font-size: 13.91px;
    width: 100%;
    padding-left: 6%;
    // width: 230px;
    line-height: 17px;
    height: 55px !important;
    color: rgba(58, 159, 209, 1) !important;
    &::placeholder {
      background-position: 10%;
      background-image: linear-gradient(
        99.52deg,
        #3f4f61 -14.96%,
        #3a9fd1 156.83%
      );
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      display: table;
    }
    &:nth-child(2) {
      content: "";
      display: block;
      position: relative;
      background: url("~@/assets/dealer/img/icons/search.svg");
      background-repeat: no-repeat;
      background-position: 2%;
      background-size: 3%;
      // flex-direction: row;
    }
  }
}
</style>