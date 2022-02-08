<template>
  <div>
    <div id="top" class="field">
      <input
        type="search"
        v-model="search"
        @keyup.enter="Search(search)"
        placeholder="Поиск по названием"
      />
      <button
        class="search-icon"
      >
        <img
          v-if="listed"
          src="../../assets/images/icons/board-blue.svg"
          @click="open = true"
          alt="search"
        />
        <img
          v-else
          src="../../assets/images/icons/document-blue.svg"
          @click="open = true"
          alt="search"
        />
      </button>
    </div>
    <transition name="show">
    <table v-if="listed" id="table" style="width: 100%">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, i) in resultTemplates" :key="i">
          <td>
            {{ i + 1 }}
          </td>
          <td>
            {{ tr.title }}
          </td>
          <td style="padding-left: 40px !important">
            {{
              tr.items
                .map((x) => x.quantity)
                .reduce((acc, item) => {
                  return (acc += item);
                }, 0)
            }}
          </td>
          <td>
            {{
              tr.items
                .map((x) => x.price)
                .reduce((acc, item) => {
                  return (acc += item);
                }, 0)
                .toLocaleString("de-DE")
            }}
            <span class="ml-1">{{ $t("sum") }}</span>
          </td>
          <td style="padding-left: 70px !important">
            <img src="../../assets/images/icons/eye-show.svg" alt="" />
          </td>
        </tr>
      </tbody>
    </table>
    </transition>
    <transition name="show">
        <div class="carts">
      <div class="cart" v-for="(tr, i) in resultTemplates" :key="i">
        <div class="header">
          <h2>
            {{ tr.title }}
          </h2>
        </div>
        <div class="body">
          <h3>{{ $t("templates.quantity") }}</h3>
          <span > 
            {{
              tr.items
                .map((x) => x.quantity)
                .reduce((acc, item) => {
                  return (acc += item);
                }, 0)
            }} </span>
          <h3>{{ $t("templates.price") }}</h3>
          <span>
            {{
              tr.items
                .map((x) => x.price)
                .reduce((acc, item) => {
                  return (acc += item);
                }, 0)
                .toLocaleString("de-DE")
            }}
            <span class="ml-1">{{ $t("sum") }}</span>
          </span>
          <router-link  >
            <img
              src="../../assets/images/icons/eye-show.svg"
              alt="see"
              style="margin-right: 12px"
            />
            Посмотреть
          </router-link>
        </div>
      </div>
    </div>
    </transition>
    <span v-if="resultTemplates.length === 0" class="not">
      Результаты не найдены
    </span>
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
        { title: "№" },
        { title: this.$t("templates.name") },
        { title: this.$t("templates.quantity") },
        { title: this.$t("templates.price") },
        { title: "Посмотреть" },
      ],
      selected: [],
      page: 1,
      perPage: 1,
      pages: [],
      Sidebar: false,
      search: "",
      listed: true
    };
  },
  components: {
    OrderItem,
  },
  computed: {
    resultTemplates() {
      if (this.search) {
        return this.templates.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.templates;
      }
    },
    templates() {
      return this.$store.state.product.templetes;
    },
  },
  methods: {
    Open(id) {
      this.$store.dispatch("product/GetOrderItem", id).then((response) => {});
      setTimeout(() => {
        this.toggleDataSidebar(true);
      }, 200);
    },
    toggleDataSidebar(val = false) {
      this.Sidebar = val;
    },
  },
  created() {
    this.$store.dispatch("product/GetTemplates");
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
.not {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 17px;
  text-align: center;
  color: #4679ec;
  margin-left: 10px;
  display: flex;
  justify-content: center;
}
.carts {
  display: flex;
  flex-wrap: wrap;

  .cart {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 15px;
    margin-bottom: 40px;
    width: 30%;
    height: 295px;
    left: 384px;
    top: 349px;

    background: #ffffff;
    /* Main Sahdow */

    box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
    border-radius: 7.65496px;
    .header {
      width: 100%;
      // height: 54px;
      display: flex;
      align-items: center;
      padding: 20px;
      background: #e5edff;
      border-radius: 7.65496px 7.65496px 0px 0px;
      h2 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 100.9%;
        /* or 16px */

        /* Text */

        color: #60739f;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      padding: 20px;
      padding-top: 0;
      h3 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 100.9%;
        /* or 14px */

        /* Text */
        margin-top: 20px;
        color: #60739f;
      }
      span {
        margin-top: 12px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 100.9%;
        /* or 18px */

        /* Text */

        color: #60739f;
      }
      a {
        margin-top: 40px;
        margin-left: 15px;
        width: 90%;
        height: 44.5px;
        background: #ebf0ff;
        border-radius: 10px;
        border: none;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        /* identical to box height */
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        letter-spacing: 0.01em;
        cursor: pointer;
        color: #4679ec;
      }
    }
  }
}
</style>