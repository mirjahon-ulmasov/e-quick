<template>
  <div class="center">
    <div @click="exportToExcel()" class="export">
      <img
        v-if="selected.length > 0"
        width="25px"
        src="@/assets/images/file-icons/xls.png"
        alt=""
      />
      <h3 v-if="selected.length > 0" class="exp">Экспортировать</h3>
    </div>
    <vs-table
      v-model="selected"
      ref="table"
      multiple
      maxHeight="60vh"
      pagination
      :max-items="itemsPerPage"
      :data="orders"
    >
      <template slot="thead">
        <vs-th sort-key="order_number">{{ $t('journal.offerNum') }}</vs-th>
        <vs-th sort-key="total_product">{{ $t('journal.quantity') }}</vs-th>
        <vs-th sort-key="date_ordered">{{ $t('journal.date') }}</vs-th>
        <vs-th sort-key="status">{{ $t('journal.status') }}</vs-th>
        <vs-th sort-key="total_price">{{ $t('journal.d') }}</vs-th>
        <vs-th sort-key="delivery_date">{{ $t('journal.price') }}</vs-th>
        <!-- <vs-th sort-key="Категория">Действие</vs-th> -->
      </template>

      <template slot-scope="{ data }" class="scr">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td>
              <p
                @click="Open(tr.id)"
                style="display: flex; align-items: center"
              >
                № {{ tr.order_number }}
                <feather-icon
                  icon="EyeIcon"
                  style="color: #135c81 !important"
                  svgClasses="h-6 w-5"
                  class="ml-2"
                />
              </p>
            </vs-td>
            <vs-td>
              <p style="padding-left: 10px">
                {{ tr.total_product }}
              </p>
            </vs-td>
            <vs-td>
              <p>
                {{ tr.date_ordered.slice(0, 10) }}
              </p>
            </vs-td>
            <vs-td>
              <vs-chip v-if="tr.status === 0" class="status">
                <span style="font-size: 11px; color: #ffffff"> {{ $t('journal.status1') }}</span>
              </vs-chip>
              <vs-chip
                style="background: rgb(49, 183, 120) !important"
                v-if="tr.status === 1"
                class="status"
              >
                <span style="font-size: 11px; color: #ffffff"> {{ $t('journal.status2') }}d </span>
              </vs-chip>
            </vs-td>
            <vs-td> {{ tr.total_price }} <span class="ml-1">Sum</span> </vs-td>
            <vs-td>
              {{ tr.delivery_date.slice(0, 10) }}
            </vs-td>
            <!-- <vs-td>
                      <span style="color: #31B778"  class="material-icons">phone</span>  
                    </vs-td> -->
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <order :isPopUp="PopUp" @closeSidebar="toggleDataSidebar"></order>
  </div>
</template>
<script>
import Order from "./OrderItem.vue";
export default {
  computed: {
    orders() {
      return this.$store.state.product.orders.reverse();
    },
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.orders.length;
    },
  },
  components: {
    Order,
  },
  data: () => ({
    fileName: "",
    cellAutoWidth: true,
    selectedFormat: "xlsx",
    PopUp: false,
    activePrompt: false,
    edit: null,
    headerTitle: [
      "Заявка",
      "Кол.во продукта",
      "Дата",
      "Сумма(в сум)",
      "Дата (доставки)",
    ],
    headerVal: [
      "order_number",
      "total_product",
      "date_ordered",
      "total_price",
      "delivery_date",
    ],
    editProp: {},
    datas: [],
    isMounted: false,
    search: "",
    allCheck: false,
    PopUpData: {},
    page: 1,
    max: 100,
    active: 0,
    itemsPerPage: 4,
    selected: [],
  }),
  methods: {
    Open(id) {
      this.$store.dispatch("product/GetOrderItem", id).then((response) => {
        this.PopUpData = response.data;
      });
      this.toggleDataSidebar(true);
    },
    toggleDataSidebar(val = false) {
      this.$store.dispatch("product/GetOrder");
      this.PopUp = val;
      this.$store.dispatch("product/GetOrder");
    },
    exportToExcel() {
      const payload = {
        user_id: parseInt(localStorage.getItem("Id")),
        orders_ids: this.selected.map((x) => x.id),
        export_type: "xlsx",
      };
      this.$store.dispatch("product/GetFile", payload);
      console.log(this.selected);
    },
  },
  mounted() {
    this.GetItem;
    this.isMounted = true;
  },
  created() {
    this.$store.dispatch("product/GetOrder");
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;600;700;800;900&display=swap");
.status {
  background: #ea5455 !important;
}
.center {
  .vs-con-input {
    .vs-input-primary {
      .vs-input--input:focus {
        border: 1px solid #135c81 !important;
      }
    }
  }
  .export {
    padding-right: 25px;
    margin-bottom: 20px;
    display: flex !important;
    align-items: center;
    float: right;
    cursor: pointer;
    .exp {
      width: 75.57px;
      height: 13.39px;
      left: 1316.52px;
      top: 82.7px;

      // font-family: Avenir Next;
      font-style: normal;
      margin-left: 5px;
      font-weight: normal;
      font-size: 11.56604px;
      line-height: 13px;
      text-align: right;

      color: #000000;
    }
  }
  .export:hover {
    box-shadow: 0 8px 25px -8px #135c81;
  }
  .vs-pagination--li.is-current {
    .effect {
      background: #135c81 !important;
    }
  }
  .vs-checkbox-primary {
    input:checked + .vs-checkbox {
      background: #135c81 !important;
      border: none !important;
    }
  }
  .vs-con-table {
    .vs-table {
      .vs-table--thead {
        background: linear-gradient(90deg, #5e585c 0%, #000000 100%);
        border-radius: 5.9434px;
        th {
          padding: 12px 15px !important;
        }
      }
      th.td-check {
        .con-td-check {
          box-shadow: none !important;
        }
      }
      th {
        padding: 12px 0px;
        padding-left: 20px;
        padding-right: 0px;
        .vs-table-text {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 140%;
          letter-spacing: -0.262146px;

          /* Body */
          color: white;
        }
      }

      tr {
        background: transparent !important;
        td {
          padding: 20px 15px !important;
          // padding-left: 0px !important ;
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 12px !important;
          line-height: 140%;
          text-align: start;
          letter-spacing: -0.262146px;
          color: #767676;
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
  }
}
</style>