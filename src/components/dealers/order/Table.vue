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
        <vs-th sort-key="order_number">{{ $t("journal.offerNum") }}</vs-th>
        <vs-th sort-key="total_product">{{ $t("journal.quantity") }}</vs-th>
        <vs-th sort-key="date_ordered">{{ $t("journal.date") }}</vs-th>
        <vs-th sort-key="status">{{ $t("journal.status") }}</vs-th>
        <vs-th sort-key="total_price">{{ $t("journal.d") }}</vs-th>
        <vs-th sort-key="delivery_date">{{ $t("journal.price") }}</vs-th>
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
              <!-- Draft -->
              <vs-chip v-show="tr.status === 0" class="status">
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status1") }}</span
                >
              </vs-chip>
              <!-- SENT_TO_TRADEHOUSE -->
              <vs-chip
                style="background: rgb(49, 183, 120) !important"
                v-if="tr.status === 1"
                class="status"
              >
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status2") }}
                </span>
              </vs-chip>
              <!-- IN_PROGRESS -->
              <vs-chip v-show="tr.status === 2" class="status" style="background: rgb(49, 183, 120) !important" >
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status5") }}
                </span>
              </vs-chip>
              <!-- ACCESS_TO_SHIPMENT  -->
              <vs-chip v-show="tr.status === 3" class="status" style="background: rgb(49, 183, 120) !important" >
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status6") }}
                </span>
              </vs-chip>
                <!-- CANCEL_ORDER = 4 -->
              <vs-chip v-show="tr.status === 4" class="status">
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status4") }}
                </span>
              </vs-chip>
               <!-- PARTIALLY_CLOSED -->
              <vs-chip v-show="tr.status === 5" class="status" style="background: rgb(49, 183, 120) !important" >
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status7") }} 
                </span>
              </vs-chip>
              <!-- CLOSED  -->
              <vs-chip
                style="background: rgb(49, 183, 120) !important"
                v-show="tr.status === 6"
                class="status"
              >
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status8") }}
                </span>
              </vs-chip>
              <!-- ORDER_CREATED = 7
               SENT_TO_SAVDO = 8
               FAILED_SENT_TO_SAVDO = 9
               FAILED_PRODUCT_SAVDO = 10
               FAILED_DEALER_SAVDO = 11  -->
              <vs-chip
                v-show="
                  tr.status === 7 ||
                  tr.status === 8 ||
                  tr.status === 9 ||
                  tr.status === 10 ||
                  tr.status === 11
                "
                class="status"
              >
                <span style="font-size: 11px; color: #ffffff">
                  {{ $t("journal.status3") }}
                </span>
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
      return this.$store.state.product.orders;
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
      setTimeout(() => {
        this.toggleDataSidebar(true);
      }, 200);
    },
    toggleDataSidebar(val = false) {
      this.$store.dispatch("product/GetOrder");
      this.PopUp = val;
    },
    exportToExcel() {
      this.$vs.loading({
        type: "sound",
        text: "Iltimos kuting !",
        color: "rgb(62, 97, 121)",
      });
      const payload = {
        user_id: parseInt(localStorage.getItem("Id")),
        orders_ids: this.selected.map((x) => x.id),
        export_type: "xlsx",
      };
      this.$store
        .dispatch("product/GetFile", payload)
        .then((res) => {
          this.$vs.loading.close();
          const url = URL.createObjectURL(
            new Blob([res.data], {
              type: "application/xml",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "OrdersList.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          console.log(err);
          this.$vs.loading.close();
        });
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