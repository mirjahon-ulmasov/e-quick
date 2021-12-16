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
            <input
              class="sle"
              @click="categoryPop = true"
              v-model="activeCategory"
              placeholder="Выберите категорию"
            />
          </div>
          <div class="vx-col sm:w-full md:w-1/2">
            <h2 class="cathaed">Выберите подкатегорию</h2>
            <input
              v-model="activePod"
              @click="podcategoryPop = true"
              class="sle"
              placeholder="Выберите подкатегорию"
            />
          </div>
          <div class="vx-col w-full mt-4">
            <h2 class="cathaed">Выберите продукт</h2>
            <input
              class="large"
              v-model="searchProduct"
              placeholder="Выберите продукт"
            />
            <div
              class="demo-alignment vs-con-loading__container"
              style="height: 43vh !important; z-index: 1"
              id="div-with-loading"
            >
              <span
                class="texts"
                @click="AddCart(item)"
                v-for="(item, i) in resultProduct"
                :key="i"
              >
                {{ item.name }}
              </span>
            </div>
            <div class="vx-col w-full mt-6">
              <weather></weather>
            </div>
          </div>
        </div>
      </div>
      <div class="vx-col sm:w-full lg:w-2/5 left-bg">
        <div>
          <div class="flex" v-if="carts" style="justify-content: space-between">
            <h2 class="zayhaed">Products №: {{ carts.items.length }}</h2>
            <vs-dropdown
              :vs-custom-content="true"
              :vs-trigger-click="true"
              class="cursor-pointer"
            >
              <svg
                href.prevent
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3.925C0 2.88403 0.413525 1.88569 1.14961 1.14961C1.88569 0.413525 2.88403 0 3.925 0H20.3688C21.4097 0.000222302 22.4079 0.413894 23.1438 1.15003L26.325 4.33124C27.0611 5.06715 27.4748 6.06532 27.475 7.10621V12.9525C26.8478 12.6316 26.1904 12.3732 25.5125 12.1812V7.10621C25.5124 6.58577 25.3056 6.08668 24.9375 5.71873L21.7563 2.53751C21.3883 2.16945 20.8892 1.96261 20.3688 1.9625H19.625V6.86875C19.625 7.64948 19.3149 8.39824 18.7628 8.9503C18.2107 9.50236 17.462 9.8125 16.6812 9.8125H8.83125C8.05052 9.8125 7.30176 9.50236 6.7497 8.9503C6.19764 8.39824 5.8875 7.64948 5.8875 6.86875V1.9625H3.925C3.40451 1.9625 2.90534 2.16926 2.5373 2.5373C2.16926 2.90534 1.9625 3.40451 1.9625 3.925V23.55C1.9625 24.0705 2.16926 24.5697 2.5373 24.9377C2.90534 25.3057 3.40451 25.5125 3.925 25.5125V16.6812C3.925 15.9005 4.23514 15.1518 4.7872 14.5997C5.33926 14.0476 6.08802 13.7375 6.86875 13.7375H16.3614C15.5705 14.2949 14.8561 14.9543 14.2419 15.7H6.86875C6.60851 15.7 6.35892 15.8034 6.1749 15.9874C5.99088 16.1714 5.8875 16.421 5.8875 16.6812V25.5125H12.1812C12.3755 26.1974 12.6326 26.8529 12.9525 27.475H3.925C2.88403 27.475 1.88569 27.0615 1.14961 26.3254C0.413525 25.5893 0 24.591 0 23.55V3.925ZM7.85 1.9625V6.86875C7.85 7.12899 7.95338 7.37858 8.1374 7.5626C8.32142 7.74662 8.57101 7.85 8.83125 7.85H16.6812C16.9415 7.85 17.1911 7.74662 17.3751 7.5626C17.5591 7.37858 17.6625 7.12899 17.6625 6.86875V1.9625H7.85ZM31.4 22.5688C31.4 24.9109 30.4696 27.1572 28.8134 28.8134C27.1572 30.4696 24.9109 31.4 22.5688 31.4C20.2266 31.4 17.9803 30.4696 16.3241 28.8134C14.6679 27.1572 13.7375 24.9109 13.7375 22.5688C13.7375 20.2266 14.6679 17.9803 16.3241 16.3241C17.9803 14.6679 20.2266 13.7375 22.5688 13.7375C24.9109 13.7375 27.1572 14.6679 28.8134 16.3241C30.4696 17.9803 31.4 20.2266 31.4 22.5688ZM27.1865 23.2635L27.1924 23.2576C27.3722 23.0756 27.4736 22.8305 27.475 22.5746V22.5629C27.4734 22.3052 27.3705 22.0584 27.1885 21.876L23.2635 17.951C23.0795 17.7667 22.8298 17.6631 22.5694 17.6629C22.3091 17.6628 22.0593 17.766 21.875 17.95C21.6908 18.134 21.5871 18.3837 21.587 18.644C21.5868 18.9044 21.69 19.1542 21.874 19.3385L24.125 21.5875H18.6438C18.3835 21.5875 18.1339 21.6909 17.9499 21.8749C17.7659 22.0589 17.6625 22.3085 17.6625 22.5688C17.6625 22.829 17.7659 23.0786 17.9499 23.2626C18.1339 23.4466 18.3835 23.55 18.6438 23.55H24.125L21.874 25.799C21.6898 25.9833 21.5863 26.2332 21.5863 26.4938C21.5863 26.7543 21.6898 27.0042 21.874 27.1885C22.0583 27.3727 22.3082 27.4762 22.5688 27.4762C22.8293 27.4762 23.0792 27.3727 23.2635 27.1885L27.1885 23.2635H27.1865Z"
                  fill="url(#paint0_linear_159_1275)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_159_1275"
                    x1="-2.23969"
                    y1="-19.3507"
                    x2="59.0253"
                    y2="-9.07856"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#3F4F61" />
                    <stop offset="1" stop-color="#3A9FD1" />
                  </linearGradient>
                </defs>
              </svg>
              <vs-dropdown-menu
                class="wab"
                style="width: 186px; padding: 0px 15px 0px 15px important"
              >
                <h4 class="wab-name">Сохранить как шаблон</h4>
                <input
                  class="wab-input"
                  v-model="NameWab"
                  type="text"
                  placeholder="Введите название для шаблона"
                />
                <vs-dropdown-item class="com flex mt-4 mb-1">
                  <div class="flex">
                    <button @click="AddWab()" class="wab-ok">Сохранить</button>
                    <button class="wab-no ml-3">Отменить</button>
                  </div>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
          <!-- <span class="date"> от 01.11.21 </span> -->
          <br />
          <h5 style="margin-top: 30px" v-if="!carts">
            No aviable data on your cart, please select products !
          </h5>
          <vs-table
            ref="table"
            maxHeight="55vh"
            class="produ mt-4"
            v-if="carts"
            :data="carts.items"
          >
            <template slot="thead">
              <vs-th sort-key="id">№</vs-th>
              <vs-th
                sort-key="product_name"
                style="
                  border-left: 1px solid #3a9fd1 !important;
                  border-right: 1px solid #3a9fd1 !important;
                "
                >Наименования</vs-th
              >
              <vs-th
                sort-key="quantity"
                style="border-right: 1px solid #3a9fd1 !important"
                >Количество</vs-th
              >
              <vs-th
                sort-key="total_price"
                style="border-right: 1px solid #3a9fd1 !important"
                >Цена (сум)</vs-th
              >
              <vs-th sort-key="total_price">Trash</vs-th>
            </template>
            <template slot-scope="{ data }" class="scr">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p>{{ indextr + 1 }}</p>
                  </vs-td>
                  <vs-td
                    style="
                      border-left: 1px solid #3a9fd1 !important;
                      border-right: 1px solid #3a9fd1 !important;
                    "
                  >
                    <p>{{ tr.product_name }}</p>
                  </vs-td>
                  <vs-td style="border-right: 1px solid #3a9fd1 !important">
                    <div class="flex">
                      <input
                        class="add"
                        v-if="incProductId === tr.product_id"
                        :placeholder="tr.quantity"
                        v-model="incQuan"
                        type="text"
                      />
                      <input
                        class="add"
                        v-if="!incProductId"
                        :placeholder="tr.quantity"
                        type="text"
                      />
                      <feather-icon
                        icon="EditIcon"
                        v-if="!incProductId"
                        @click="Inc(tr)"
                        style="margin-left: -19px !important"
                        svgClasses="h-3 w-4 hover:text-primary"
                        class="ml-1"
                      />
                      <feather-icon
                        v-if="incProductId === tr.product_id"
                        style="margin-left: -19px !important"
                        icon="CheckIcon"
                        @click="IncEdit()"
                        svgClasses="h-4 w-5 text-success"
                        class="ml-1"
                      />
                    </div>
                  </vs-td>
                  <vs-td style="border-right: 1px solid #3a9fd1 !important">
                    <p class="prise">
                      {{ tr.total_price.toLocaleString("de-DE") }}
                    </p>
                  </vs-td>
                  <vs-td style="text-align: center">
                    <feather-icon
                      icon="TrashIcon"
                      @click="deleteCartProduct(tr.id)"
                      svgClasses="h-5 w-5 hover:text-success text-danger"
                      class="ml-1"
                    />
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
          <div v-if="carts">
            <div class="itogo mt-4">
              <h2 class="text">Итоговая сумма:</h2>
              <h1 class="prise">
                {{ Number(carts.total_price).toLocaleString("de-DE") }} сум
              </h1>
            </div>
            <vs-button @click="AddOrder()" class="offering">
              <span> Оформить заявку </span>
            </vs-button>
          </div>
        </div>
        <!-- <div class="imzo"></div> -->
      </div>
      <vs-popup
        background-color="rgb(45 39 39 / 70%)"
        background-color-popup="linear-gradient(90deg, #5E585C 0%, #000000 100%)"
        :active.sync="categoryPop"
      >
        <input
          class="sle"
          v-model="searchQuery"
          placeholder="Выберите категорию"
        />
        <div class="demo-alignment">
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
        </div>
      </vs-popup>
      <vs-popup
        background-color="rgb(45 39 39 / 70%)"
        background-color-popup="linear-gradient(90deg, #5E585C 0%, #000000 100%)"
        :active.sync="podcategoryPop"
      >
        <input
          v-model="searchPodCategory"
          class="sle"
          placeholder="Выберите категорию"
        />
        <div class="demo-alignment">
          <span
            class="texts"
            v-for="(item, i) in resultPodCategory"
            @click="getProduct(item)"
            :key="i"
          >
            {{ item.name }}
          </span>
          <span
            class="texts"
            v-if="podCategory == null"
            style="color: red !important"
          >
            No aviable data
          </span>
        </div>
      </vs-popup>
    </div>
    <add-cart
      :isPopUp="PopUp"
      @closeSidebar="toggleDataSidebar"
      :data="PopUpData"
    ></add-cart>
    <order
      :isPopUpOrder="PopUpOrder"
      @closeSidebarOrder="toggleDataSidebarOrder"
    ></order>
  </div>
</template>
<script>
import AddCart from "./components/AddCart.vue";
import Order from "./components/Order.vue";
import SideBar from "./components/Sidebar.vue";
import Weather from "./components/Weather.vue";
export default {
  name: "Home",
  computed: {
    category() {
      return this.$store.state.category.categories;
    },
    carts() {
      return this.$store.state.product.carts;
    },
    products() {
      return this.$store.state.product.productes.results;
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.category.filter((item) => {
          return this.searchQuery
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
      if (this.searchPodCategory) {
        return this.podCategory.filter((item) => {
          return this.searchPodCategory
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
      NameWab: "",
      PopUpData: {},
      PopUp: false,
      sanoq: null,
      activeCategory: null,
      activePod: null,
      PopUpOrder: false,
      product: [],
      searchQuery: null,
      searchProduct: null,
      searchPodCategory: null,
      date: null,
      active: false,
      activeProduct: null,
      popupActive: false,
      popupActive1: false,
      podCategory: null,
      incQuan: null,
      incProductId: null,
      currentEditId: null,
    };
  },
  components: {
    AddCart,
    Order,
    SideBar,
    Weather,
  },
  methods: {
    getCat(data) {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
        color: "rgb(62, 97, 121)",
      });
      this.activeCategory = data.name;
      console.log(data.id);
      const category = this.category.find((company) => company.id === data.id);
      this.podCategory = category ? category.children : null;
      this.$store.dispatch("product/GetProduct", data.id).then((response) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
      this.categoryPop = false;
      // this.podcategoryPop = true
    },
    getProduct(data) {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
        color: "rgb(62, 97, 121)",
      });
      this.activePod = data.name;
      this.$store.dispatch("product/GetProduct", data.id).then((response) => {
        this.product = response.data;
        console.log(this.products, "ollll");
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
      this.podcategoryPop = false;
    },
    AddCart(data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.PopUpData = data;
      this.toggleDataSidebar(true);
    },
    deleteCartProduct(id) {
      this.$store.dispatch("product/DeleteCartItem", id).then((response) => {
        this.$store.dispatch("product/GetCart");
      });
    },
    AddOrder() {
      this.toggleDataSidebarOrder(true);
      this.$store.dispatch("product/GetCart");
    },
    AddWab() {
      const payload = {
        template_name: this.NameWab,
        user_id: parseInt(localStorage.getItem("Id")),
        cart_id: this.carts.id,
      };
      this.$store
        .dispatch("product/PostTemplates", payload)
        .then((response) => {
          this.$vs.notify({
            title: "Created",
            text: "Ok",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success",
          });
          this.NameWab = null;
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        });
    },
    toggleDataSidebar(val = false) {
      this.$store.dispatch("product/GetCart");
      setTimeout(() => this.$store.dispatch("product/GetCart"), 500);
      this.PopUp = val;
    },
    toggleDataSidebarOrder(val = false) {
      this.PopUpOrder = val;
    },
    Inc(tr) {
      this.edit = true;
      this.incProductId = tr.product_id;
      this.incQuan = tr.quantity;
    },
    IncEdit() {
      this.$store
        .dispatch("product/AddCart", {
          user_id: parseInt(localStorage.getItem("Id")),
          product_id: this.incProductId,
          quantity: parseInt(this.incQuan),
        })
        .then((response) => {
          this.incProductId = null;
          this.$vs.notify({
            title: "Updated",
            text: "Ozgardi",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success",
          });
          this.$store.dispatch("product/GetCart");
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
          this.$store.dispatch("product/GetCart");
        });
    },
  },
  mounted() {
    // this.sanoq = this.carts.items.length
  },
  created() {
    this.$store.dispatch("product/GetCart");
    this.$store.dispatch("category/GetItem");
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.add-item {
  margin-top: 15px !important;
  width: 88.56px;
  margin-left: 38px;
  height: 27px;
  border: 1.01618px solid #ffffff;
  box-sizing: border-box;
  border-radius: 4.32px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-item span {
  font-family: Lato;
  cursor: pointer;
  font-style: normal;
  font-weight: 800;
  font-size: 19.44px;
  line-height: 18px;
  /* identical to box height, or 94% */

  letter-spacing: -0.02em;
  text-transform: uppercase;

  color: #ffffff;
}
.add-item span:hover {
  color: rgba(58, 159, 209, 1);
}
.photo {
  width: 81px;
  height: 76px;
  display: flex;
  margin-top: 12px;
  align-items: flex-end;
  background: url("~@/assets/dealer/img/svg/components/product.svg");
  /* background: url(.png); */
  border-radius: 9.47126px;
}
.inner {
  width: 100%;

  background: linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
  border-radius: 2px;
}
.confirmac {
  margin-top: 45px !important;
  width: 289.15px;
  height: 37.31px;
  background: linear-gradient(102.4deg, #3f4f61 -160.6%, #3a9fd1 156.82%);
  border-radius: 3.73099px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16.3022px;
  line-height: 22px;
  /* or 133% */

  text-align: center;
  letter-spacing: -0.02em;

  color: #ffffff;
}
.picker {
  color: white;
  width: 289.15px;
  border: 2.12684px solid #ffffff;
  box-sizing: border-box;
  background: transparent !important;
  border-radius: 9.04168px;
}
.picker select {
  padding-left: 6px;
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
  overflow: scroll;
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
  margin-right: 6px;
}
.demo-alignment::-webkit-scrollbar-thumb {
  background: linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
  border-radius: 7.41868px;
  width: 3px;
  margin-right: 6px;
  margin-right: 6px;
}
.demo-alignment::-webkit-scrollbar-track {
  /* background: linear-gradient(90deg, #5E585C 0%, #000000 100%); */
  border-radius: 0px 0px 7.41868px 7.41868px;
}
.convert {
  width: 100%;
  height: 78.25px;
  left: 560.35px;
  top: 782px;

  background: #ffffff;
  box-shadow: 0px 3.72603px 13.0411px rgba(0, 0, 0, 0.1);
  border-radius: 7.45205px;
}
.offer-text {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13.8679px;
  line-height: 18px;
  /* identical to box height, or 133% */

  text-align: center;
  letter-spacing: -0.02em;
  padding: 10px 0px;
  color: #ffffff;
}
.add {
  text-align: center !important;
  width: 76px;
  height: 23.17px;

  border: 0.872058px solid #000000;
  box-sizing: border-box;
  border-radius: 3.70732px;
}
.add span {
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 10px;
  line-height: 16px;
  /* identical to box height, or 158% */

  letter-spacing: -0.02em;
  text-transform: uppercase;

  color: #000000;
}
.prise {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12.9465px;
  line-height: 16px;

  color: #3a9fd1;
}
.date {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16.7057px;
  line-height: 33px;
  /* identical to box height, or 200% */

  letter-spacing: 0.371237px;

  color: #000000;
}
.zayhaed {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 22.2742px;
  line-height: 33px;
  background-image: linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: table;
  /* identical to box height, or 150% */

  letter-spacing: 0.371237px;
}
</style>
<style lang="scss" scoped>
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
    padding-left: 14%;
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
      background: url("~@/assets/dealer/img/icons/ham.svg");
      background-repeat: no-repeat;
      background-position: 5%;
      background-size: 7%;
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
    padding-left: 7%;
    // width: 230px;
    line-height: 17px;
    height: 55px;
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
      background: url("~@/assets/dealer/img/icons/ham.svg");
      background-repeat: no-repeat;
      background-position: 2%;
      background-size: 4%;
      // flex-direction: row;
    }
  }
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
  font-weight: normal;
  font-size: 13.91px;
  padding-left: 39px;
  // width: 230px;
  line-height: 17px;
  height: 55px;
  color: rgba(58, 159, 209, 1) !important;
  &::placeholder {
    background-position: 10%;
    color: rgba(58, 159, 209, 1) !important;
  }
  &:nth-child(2) {
    content: "";
    display: block;
    position: relative;
    background: url("~@/assets/dealer/img/icons/search.svg");
    background-repeat: no-repeat;
    background-position: 5%;
    background-size: 7%;
  }
}
</style>