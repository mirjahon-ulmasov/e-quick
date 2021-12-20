<template>
  <div>
    <div class="flex" v-if="carts" style="justify-content: space-between">
      <h2 class="zayhaed">Products №: {{ carts.items.length }}</h2>
      <svg
      @click="AddWab()"
      class="cursor-pointer"
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
                <feather-icon
                 v-if="!Id"
                  icon="MinusIcon"
                  @click="Min(tr)"
                  @mouseleave="IncEdit(tr)"
                  style="margin-right: -19px !important"
                  svgClasses="h-3 w-4 hover:text-primary"
                  class="ml-1"
                />
                <input
                  class="add"
                  v-if="Id === tr.id"
                  v-model="incQuan"
                  @keypress.enter="IncEdit(tr)"
                  type="text"
                />
                <input
                 v-if="!Id"
                  class="add"
                  @mousedown="Id = tr.id"
                  v-model="tr.quantity"
                  type="text"
                />
                <feather-icon
                v-if="!Id"
                  icon="PlusIcon"
                  @click="Inc(tr)"
                  @mouseleave="IncEdit(tr)"
                  style="margin-left: -19px !important"
                  svgClasses="h-3 w-4 hover:text-primary"
                  class="ml-1"
                />
                        <feather-icon
                        v-if="Id === tr.id"
                        style="margin-left: -19px !important"
                        icon="CheckIcon"
                        @click="IncEdit(tr)"
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
    <order
      :isPopUpOrder="PopUpOrder"
      @closeSidebarOrder="toggleDataSidebarOrder"
    ></order>
      <temp
      :isPopUpTemp="PopUpTemp"
      @closeSidebarTemp="toggleDataSidebarTemp"
    ></temp>
  </div>
</template>
<script>
import Order from "../order/Order.vue";
import Temp from "../templates/saveTemp.vue"
export default {
  name: "Home",
  computed: {
    carts() {
      return this.$store.state.product.carts;
    },
  },
  data() {
    return {
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
  components: {
    Order,
    Temp
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
  methods: {
    deleteCartProduct(id) {
      this.$store.dispatch("product/DeleteCartItem", id).then((response) => {
        this.$store.dispatch("product/GetCart");
              this.$vs.notify({
                title: "OK",
                text: "Deleted",
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
        id: tr.id
      }
      this.incQuan = tr.quantity + 1
      this.incProductId = tr.product_id
      console.log(this.incQuan, 'owdi')
      this.$store.commit('product/UPDATE_QUANTITY', quantity)
      // this.incProductId = tr.product_id;
      // this.incQuan = tr.quantity;
    },
    Min(tr) {
      const quantity = {
        item_price: tr.total_price / tr.quantity,
        quantity: tr.quantity - 1,
        id: tr.id
      }
      this.incQuan = tr.quantity - 1
      this.incProductId = tr.product_id
      console.log(this.incQuan, 'owdi')
      this.$store.commit('product/UPDATE_QUANTITY', quantity)
      // this.incProductId = tr.product_id;
      // this.incQuan = tr.quantity;
    },
    IncEdit(tr) {
      this.incProductId = tr.product_id
      this.$store
        .dispatch("product/AddCart", {
          user_id: parseInt(localStorage.getItem("Id")),
          product_id: this.incProductId,
          quantity: parseInt(this.incQuan),
        })
        .then((response) => {
            this.incQuan = null
            this.incProductId = null
            this.Id = null
          this.$vs.notify({
            title: "Updated",
            text: "Ozgardi",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success",
          });
          this.$store.dispatch("product/GetCart");
        })
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
    },
  },
  created() {
    this.$store.dispatch("product/GetCart");
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
.row {
  height: 100%;
  width: 100%;
  display: flex;
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
    /* identical to box height, or 150% */

    letter-spacing: 0.371237px;
  }
  .offer {
    cursor: pointer;
    width: 100%;
    height: 32px;
    background: linear-gradient(90deg, #5e585c 0%, #000000 100%);
    border-radius: 5.9434px;
  }
  .itogo {
    margin-right: 1%;
  }
  .itogo .prise {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 34.3583px;
    line-height: 41px;
    /* identical to box height, or 120% */
    color: #222021;
    text-align: end;
    letter-spacing: 0.458111px;
  }
  .itogo .text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20.615px;
    line-height: 41px;
    background-image: linear-gradient(
      99.52deg,
      #3f4f61 -14.96%,
      #3a9fd1 156.83%
    );
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    /* display: table; */
    /* identical to box height, or 200% */

    text-align: end;
    letter-spacing: 0.458111px;
  }
  .offering {
    width: 99%;
    /* height: 35px; */
    background: linear-gradient(90deg, #5e585c 0%, #000000 100%) !important;
    border-radius: 5.9434px;
  }
  .offering {
    cursor: pointer;
    margin-top: 30px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 13.8679px;
    /* line-height: 18px; */
    /* identical to box height, or 133% */

    text-align: center;
    letter-spacing: -0.02em;

    color: #ffffff;
  }
  .offering:hover {
    box-shadow: none !important;
  }
  .vs-con-table {
    .vs-con-tbody {
      width: 100% !important;
      overflow: auto !important;
    }
    .vs-con-tbody::-webkit-scrollbar {
      width: 5px;
    }
    .vs-con-tbody::-webkit-scrollbar-track {
      background: rgb(97, 48, 48) !important;
    }
    .vs-con-tbody::-webkit-scrollbar-thumb {
      background-color: rgb(204, 41, 41) !important;
      border-radius: 6px;
      // border: 3px solid blue;
    }
    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;
      tr {
        background: #f9fafc !important;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        border-bottom: 1px solid #3a9fd1;
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }
    .vs-table--thead {
      background: #f9fafc !important;
      border-bottom: 1px solid #3a9fd1 !important;
      tr {
        background: red !important;
        box-shadow: none;
      }
      th {
        border-bottom: 1px solid #3a9fd1 !important;
        font-family: Montserrat !important;
        font-style: normal;
        font-weight: bold;
        font-size: 12px !important;
        /* or 278% */
        background: #f9fafc !important;
        letter-spacing: 0.400518px;

        color: #000000 !important;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
    }
    .vs-table--pagination {
      justify-content: center;
    }
  }
  .con-select {
    .vs-select--input {
      padding: 10px;
      font-size: 1rem;
      background: transparent !important;
    }
  }
}
</style>