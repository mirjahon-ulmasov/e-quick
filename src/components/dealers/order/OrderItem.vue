<template>
  <div>
    <vs-popup
      class="ozgar"
      background-color="rgb(45 39 39 / 70%)"
      background-color-popup="#ffffff"
      :active.sync=" isSidebarActiveLocal"
    >
      <h2
        v-if="carts"
        style="
          margin-top: -20px;
          margin-bottom: 15px;
          text-align: center;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 29px;
          line-height: 35px;
          color: #000000;
        "
      >
        {{ $t('journal.about') }} №{{ carts.order_number || '' }}
      </h2>
      <div class="flex" style="justify-content: center">
        <vs-table
          ref="table"
          maxHeight="50vh"
          style="max-width: 400px !important"
          class="produc mt-4"
          v-if="carts"
          :data="carts.items || []"
        >
          <template slot="thead">
            <vs-th sort-key="name">№</vs-th>
            <vs-th
              sort-key="Наименование_онлайн_савдо"
              style="
                border-left: 1px solid #3a9fd1 !important;
                border-right: 1px solid #3a9fd1 !important;
              "
              >{{ $t('cart.p_name') }}</vs-th
            >
            <vs-th
              sort-key="Завод"
              style="border-right: 1px solid #3a9fd1 !important"
              >{{ $t('cart.quantity') }}</vs-th
            >
            <vs-th sort-key="Баланс">{{ $t('cart.price') }}</vs-th>
          </template>
          <template slot-scope="{ data }" class="scr">
            <tbody>
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td style="background: white">
                  <p>{{ indextr + 1 }}</p>
                </vs-td>
                <vs-td
                  style="
                    border-left: 1px solid #3a9fd1 !important;
                    border-right: 1px solid #3a9fd1 !important;
                    background: white;
                  "
                >
                  <p>{{ tr.product_name }}</p>
                </vs-td>
                <vs-td
                  style="
                    border-right: 1px solid #3a9fd1 !important;
                    background: white;
                  "
                >
                  <div class="flex">
                    <span class="add">
                      {{ tr.quantity }}
                    </span>
                  </div>
                </vs-td>
                <vs-td style="background: white">
                  <p class="prise" v-if="tr.price" >
                    {{ Number(tr.price).toLocaleString("de-DE") }}
                  </p>
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        </vs-table>
      </div>
      <div class="itogo mt-4">
        <h2 class="text">{{ $t('cart.total_price') }}</h2>
        <h1 class="prise" v-if="carts" >{{ Number(carts.total_price).toLocaleString("de-DE") }} сум</h1>
      </div>
      <!-- <div class="flex mt-4">
                  <vs-button @click="isSidebarActiveLocal = false" class="submit">
                      Сохранить
                  </vs-button>
                    <vs-button @click="isSidebarActiveLocal = false" class="cancel" >
                      Закрыть
                  </vs-button>
              </div> -->
    </vs-popup>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    isPopUp: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    isPopUp(val) {
      if (!val) return;
    },
  },
  computed: {
    carts() {
      return this.$store.state.product.orderItem;
    },
    isSidebarActiveLocal: {
      get() {
        return this.isPopUp;
      },
      set(val) {
        if (!val) {
          this.$emit("closeSidebar")
          setTimeout(() => {
            this.$store.commit("product/NullData")
          }, 220);
        }
      },
    },
  },
  created() {
    this.$store.dispatch("product/GetOrderItem");
  },
};
</script>
<style lang="scss" scoped>
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
.submit {
  width: 205px;
  margin-left: 18%;
  background: linear-gradient(
    99.52deg,
    #3f4f61 -14.96%,
    #3a9fd1 156.83%
  ) !important;
  border-radius: 6.87619px !important;
}
.cancel {
  width: 205px !important;
  margin-left: 10px !important;
  background: linear-gradient(90deg, #5e585c 0%, #000000 100%) !important;
  border-radius: 5.9434px !important;
}
.itogo {
  margin-left: 20%;
}
.itogo .prise {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 30px;
  /* identical to box height, or 120% */
  text-align: start;
  letter-spacing: 0.333333px;
  color: #000000;
}
.itogo .text {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 15.615px;
    line-height: 31px;
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
    /* identical to box height, or 200% */

    text-align: start;
    letter-spacing: 0.458111px;
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
      background: transparent !important;
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
    background: transparent !important;
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
</style>