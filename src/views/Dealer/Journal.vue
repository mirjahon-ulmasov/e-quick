<template>
  <div>
    <table id="table" style="width: 100%">
      <thead>
        <tr>
          <th>
            <div class="drop">
              <input
                type="checkbox"
                style="display: none"
                id="d"
                v-model="selectAll"
              />
              <label for="d"></label>
            </div>
          </th>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in orders" :key="i" >
          <td>
            <div class="drop">
              <input
                type="checkbox"
                style="display: none"
                v-model="selected"
                :value="tr"
                :id="i"
                number
              />
              <label :for="i"></label>
            </div>
          </td>
          <td @click="Open(tr.id)" >№ {{ tr.order_number }}</td>
          <td @click="Open(tr.id)" >
            {{ tr.total_product }}
          </td>
          <td @click="Open(tr.id)" >
            {{ tr.date_ordered.slice(0, 10).split("-").join(".") }}
          </td>
          <td style="padding: 0 !important; width: 200px" @click="Open(tr.id)" >
            <!-- Draft -->
            <span v-show="tr.status === 0 || tr.status === 7" class="warning">
              <span>
                {{ $t("journal.status1") }}
              </span>
            </span>
            <!-- SENT_TO_TRADEHOUSE -->
            <span v-if="tr.status === 1" class="active">
              {{ $t("journal.status2") }}
            </span>
            <!-- IN_PROGRESS -->
            <span v-show="tr.status === 2" class="active">
              <span>
                Sotuvchi qabulida
                <!-- {{ $t("journal.status5") }} -->
              </span>
            </span>
            <!-- ACCESS_TO_SHIPMENT  -->
            <span v-show="tr.status === 3" class="warning">
              <span>
                {{ $t("journal.status6") }}
              </span>
            </span>
            <!-- CANCEL_ORDER = 4 -->
            <span v-show="tr.status === 4" class="inactive">
              <span>
                {{ $t("journal.status4") }}
              </span>
            </span>
            <!-- PARTIALLY_CLOSED -->
            <span v-show="tr.status === 5" class="active">
              <span>
                {{ $t("journal.status7") }}
              </span>
            </span>
            <!-- CLOSED  -->
            <span v-show="tr.status === 6" class="active">
              {{ $t("journal.status8") }}
            </span>
            <!-- ORDER_CREATED = 7
               SENT_TO_SAVDO = 8
               FAILED_SENT_TO_SAVDO = 9
               FAILED_PRODUCT_SAVDO = 10
               FAILED_DEALER_SAVDO = 11  -->
            <span
              v-show="
                tr.status === 8 ||
                tr.status === 9 ||
                tr.status === 10 ||
                tr.status === 11
              "
              class="inactive"
            >
              {{ $t("erorr") }}
            </span>
          </td>
          <td @click="Open(tr.id)" >
            {{ tr.delivery_date.split("-").join(".") }}
          </td>
          <td @click="Open(tr.id)" >
            {{ Number(tr.total_price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
            <span class="ml-1">{{ $t("sum") }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="bottom-actions">
      <button class="export" @click="exportToExcel()">
        <img src="../../assets/images/icons/excel.svg" alt="" />
        <h2 class="text-export">Экспортировать</h2>
      </button>
      <nav>
        <ul class="pagination">
          <li class="page">
            <button type="button" class="page-link" @click="changeM(page)">
              <img
                src="../../assets/images/icons/arrow-right.svg"
                alt="search"
              />
            </button>
          </li>
          <li class="page-center">
            <button
              type="button"
              v-for="(pageNumber, i) in pages.slice(page - 1, page + 5)"
              :key="i"
              :class="{ active: page === pageNumber }"
              @click="page = pageNumber"
            >
              {{ pageNumber }}
            </button>
          </li>
          <li class="page">
            <button type="button" @click="change(page)" class="page-link">
              <img
                src="../../assets/images/icons/arrow-left.svg"
                alt="search"
              />
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <order-item
      :isOrderItem="Sidebar"
      @closeSidebar="toggleDataSidebar"
    ></order-item>
  </div>
</template>

<script>
import OrderItem from "../../components/dealer/OrderItems.vue";
export default {
  data() {
    return {
      headers: [
        { title: this.$t("journal.offerNum") },
        { title: this.$t("journal.quantity") },
        { title: this.$t("journal.date") },
        { title: this.$t("journal.status") },
        { title: this.$t("journal.d") },
        { title: this.$t("journal.price") },
      ],
      selected: [],
      page: 1,
      perPage: 7,
      pages: [],
      Sidebar: false,
    };
  },
  components: {
    OrderItem,
  },
  computed: {
    orders() {
      return this.paginate(this.$store.state.product.orders);
    },
    orders1() {
      return this.$store.state.product.orders;
    },
    selectAll: {
      get: function () {
        return this.orders1
          ? this.selected.length == this.orders1.length
          : false;
      },
      set: function (value) {
        var selected = [];
        if (value) {
          this.orders1.forEach(function (user) {
            selected.push(user);
          });
        }
        this.selected = selected;
      },
    },
  },
  watch: {
    orders1() {
      this.setPages();
    },
  },
  methods: {
    Open(id) {
      this.$store.dispatch("product/GetOrderItem", id).then((response) => {
      });
      setTimeout(() => {
        this.toggleDataSidebar(true);
      }, 200);
    },
    toggleDataSidebar(val = false) {
      this.Sidebar = val;
    },
    exportToExcel() {
      this.$vs.loading({
        type: "sound",
        color: "#4679ec",
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
    setPages() {
      let numberOfPages = Math.ceil(this.orders1.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    change(loq) {
      console.log(loq);
      if (loq === this.pages.length) {
        this.page = this.pages.length;
      } else {
        this.page++;
      }
    },
    changeM(loq) {
      console.log(loq);
      if (loq === 1) {
        this.page = 1;
      } else {
        this.page--;
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
  created() {
    this.$store.dispatch("product/GetOrder");
  },
};
</script>

<style lang="scss" scoped>
.bottom-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .export {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-top: 30px;
    border: none;
    background: transparent;
    .text-export {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #4679ec;
      margin-left: 10px;
    }
  }
}

</style>
