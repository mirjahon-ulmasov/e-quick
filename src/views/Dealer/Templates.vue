<template>
  <div>
    <div id="top" class="field">
      <input
        type="search"
        v-model="search"
        @keyup.enter="Search(search)"
        placeholder="Поиск по названием"
      />
      <button class="search-icon" @click="listed = !listed">
        <img
          v-if="listed"
          src="../../assets/images/icons/board-blue.svg"
          alt="search"
        />
        <img
          v-else
          src="../../assets/images/icons/document-blue.svg"
          alt="search"
        />
      </button>
    </div>
    <div v-if="templates.status_code !== 404">
      <transition name="show">
        <div class="carts" v-if="!listed">
          <div class="cart" v-for="(tr, i) in resultTemplates" :key="i">
            <div class="header">
              <h2>
                {{ tr.title }}
              </h2>
                              <img
                  src="../../assets/images/icons/delete-icon.svg"
                  alt="trash"
                  style="cursor: pointer"
                  @click="deleteTemplete(tr.template_id)"
                />
            </div>
            <div class="body">
              <h3>{{ $t("templates.quantity") }}</h3>
              <span>
                {{
                  tr.items
                    .map((x) => x.quantity)
                    .reduce((acc, item) => {
                      return (acc += item);
                    }, 0)
                }}
              </span>
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
              <button @click="Open(tr.template_id)" >Посмотреть</button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="show-top">
        <table v-if="listed" id="table" style="width: 100%">
          <thead>
            <tr>
              <th v-for="(header, i) in headers" :key="i">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tr, i) in resultTemplates" :key="i">
              <td @click="Open(tr.template_id)">
                {{ i + 1 }}
              </td>
              <td>
                {{ tr.title }}
              </td>
              <td
                @click="Open(tr.template_id)"
                style="padding-left: 40px !important"
              >
                {{
                  tr.items
                    .map((x) => x.quantity)
                    .reduce((acc, item) => {
                      return (acc += item);
                    }, 0)
                }}
              </td>
              <td @click="Open(tr.template_id)">
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
              <td
                style="padding-left: 70px !important"
                @click="Open(tr.template_id)"
              >
                <img src="../../assets/images/icons/eye-show.svg" alt="" />
              </td>
              <td style="padding-left: 60px !important">
                <img
                  src="../../assets/images/icons/delete-icon.svg"
                  alt="trash"
                  style="cursor: pointer"
                  @click="deleteTemplete(tr.template_id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </transition>
    </div>
    <span v-if="resultTemplates.length === 0 || templates.status_code === 404 " class="not">
      Результаты не найдены
    </span>
    <template-item
      :isOrderItem="Sidebar"
      @closeSidebar="toggleDataSidebar"
    ></template-item>
  </div>
</template>

<script>
import TemplateItem from "../../components/dealer/TemplateItems.vue";
export default {
  data() {
    return {
      headers: [
        { title: "№" },
        { title: this.$t("templates.name") },
        { title: this.$t("templates.quantity") },
        { title: this.$t("templates.price") },
        { title: "Посмотреть" },
        { title: "Удалить" },
      ],
      selected: [],
      page: 1,
      perPage: 1,
      pages: [],
      Sidebar: false,
      search: "",
      listed: true,
    };
  },
  components: {
    TemplateItem,
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
      this.toggleDataSidebar(true);
      this.$store.dispatch("product/GetTemplatesItem", id);
    },
    toggleDataSidebar(val = false) {
      this.Sidebar = val;
    },
    deleteTemplete(id) {
      this.$store.dispatch("product/UpdateTemplate", id).then(() => {
        setTimeout(() => {
          this.$store.dispatch("product/GetTemplates");
        }, 500);
        this.$vs.notify({
          text: this.$t("delete"),
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "success",
        });
        if (this.templates.length === 0) {
          this.templates = null;
        }
      });
    },
  },
  created() {
    this.$store.dispatch("product/GetTemplates");
  },
  updated(){
    console.log(this.templates);
  }
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
      justify-content: space-between;
      display: flex;
      align-items: center;
      padding: 20px;
      background: #f5f8ff;
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
        color: #60739f;
      }
      button {
        margin-top: 40px;
        margin-left: 15px;
        width: 90%;
        height: 44.5px;
        background: transparent;
        border-radius: 10px;
        border: none;
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
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