<template>
  <div>
    <div id="top" class="field">
      <input
        type="text"
        v-model="search"
        @keyup.enter="Search(search)"
        placeholder="Поиск по названием"
      />
      <div class="actions1" v-show="search">
        <feather-icon
          :icon="'XIcon'"
          @click="Reset()"
          class="icon"
          svgClasses="h-6 w-9"
        />
      </div>
      <button
        class="search-icon"
        :style="filtered ? 'background: #4679EC' : 'background: #F6F8FE;'"
      >
        <feather-icon
          v-if="filtered"
          :icon="'XIcon'"
          @click="Reset()"
          class="icon"
          style="color: white"
          svgClasses="h-6 w-9"
        />
        <img
          v-else
          src="../../assets/images/icons/filter.svg"
          @click="open = true"
          alt="search"
        />
      </button>
    </div>
    <h2 class="filtered" v-if="filtered">
      Фильтры: <span> {{ activeCategory.name }} , {{ activePod.name }} </span>
    </h2>
    <FilterProduct :id="activePod" v-show="filtered" />
    <table id="table" v-show="filtered === false">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in productList.items || productList.results"
          :key="i"
          @click="$router.push(`/product/${admin.id}`)"
        >
          <td>{{ admin.number }}</td>
          <td>{{ admin.name }}</td>
          <td>{{ admin.company_name }}</td>
          <td>{{ admin.category_name }}</td>
          <td style="padding-left: 40px !important">
            {{
              Number(admin.price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            {{ $t("sum") }}
          </td>
        </tr>
      </tbody>
    </table>
    <span
      v-if="productList.total_products === 0 && filtered === false"
      class="not"
    >
     {{ $t('not_data') }}.
    </span>
    <nav
      v-if="
        productList.total_products !== 0 && filtered === false || 
        productList.items.length !== 0 &&
        filtered === false
      "
      id="nav"
    >
      <ul class="pagination">
        <li class="page">
          <button type="button" class="page-link" @click="changeM(page)">
            <img src="../../assets/images/icons/arrow-right.svg" alt="search" />
          </button>
        </li>
        <li class="page-center">
          <button
            type="button"
            v-for="(pageNumber, i) in pages.slice(page - 1, page + 5)"
            :key="i"
            :class="{ active: page === pageNumber }"
            @click="ChangeA((page = pageNumber))"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li class="page">
          <button type="button" @click="change(page)" class="page-link">
            <img src="../../assets/images/icons/arrow-left.svg" alt="search" />
          </button>
        </li>
      </ul>
    </nav>
    <transition name="show">
      <div class="overlay" v-show="open">
        <div class="close" @click="Hide()"></div>
        <div class="sidebar">
          <div class="actions">
            <feather-icon
              :icon="'XIcon'"
              @click="Hide()"
              class="icon"
              svgClasses="h-6 w-9"
            />
          </div>
          <div class="body">
            <h2 class="filter">Фильтры</h2>
            <form @submit.prevent="FilterProduct()">
              <div class="form-input">
                <h4>Выберите завод</h4>
                <v-select
                  :options="company"
                  label="name"
                  @input="getCat()"
                  v-model="activeCategory"
                  id="select-state"
                >
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                      <img
                        src="../../assets/images/icons/select-icon.svg"
                        alt=""
                      />
                    </span>
                  </template>
                </v-select>
              </div>
              <div class="form-input">
                <h4>Выберите категорию</h4>
                <v-select
                  :options="category"
                  v-model="activePod"
                  label="name"
                  id="select-state"
                >
                  <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                      <img
                        src="../../assets/images/icons/select-icon.svg"
                        alt=""
                      />
                    </span>
                  </template>
                </v-select>
              </div>
              <div class="actions">
                <my-button
                  style="margin-left: 9px"
                  type="submit"
                  :width="375"
                  title="Применить"
                ></my-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
    <a class="backtop" ref="section" href="#top">
      <feather-icon
        :icon="'ChevronUpIcon'"
        class="icon"
        style="color: #4679ec"
        svgClasses="h-3 w-2"
      />
    </a>
    <spinner :bg="false" style="margin-top: 50px" v-if="load"></spinner>
  </div>
</template>

<script>
import FilterProduct from "../../components/admin/ProductFilter.vue";
export default {
  data() {
    return {
      headers: [
        { title: "№" },
        { title: "Название" },
        { title: "Завод" },
        { title: "Категория" },
        { title: "Цена" },
      ],
      open: false,
      activeCategory: null,
      activePod: null,
      podCategory: [],
      search: null,
      id: 1,
      page: 1,
      perPage: 100,
      pages: [],
      filtered: false,
      scTimer: 0,
      scY: 0,
      searched: false,
      load: true,
    };
  },
  components: {
    FilterProduct,
  },
  computed: {
    productList() {
      return this.$store.state.addUser.products;
    },
    company() {
      return this.$store.state.addUser.parent_companies;
    },
    category() {
      return this.$store.state.addUser.company_group_filter.categories;
    },
    product() {
      return this.paginate(this.$store.state.addUser.products);
    },
  },
  watch: {
    productList() {
      this.setPages();
    },
  },
  methods: {
    setPages() {
      if (this.productList.total_products > 100) {
        let numberOfPages = Math.ceil(
          this.productList.total_products / this.perPage
        );
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      }
    },
    change(loq) {
      console.log(loq);
      if (loq === this.pages.length) {
        this.page = this.pages.length;
        this.$store.dispatch("addUser/fetchProducts", this.page);
      } else {
        if (this.search === null) {
          this.page++;
          this.$store.dispatch("addUser/fetchProducts", this.page);
        } else {
          this.page++;
          const obj = {
            page: this.page,
            name: this.search,
          };
          this.$store.dispatch("addUser/fetchProductSearch", obj);
        }
      }
    },
    Reset() {
      if (this.filtered === true) {
        this.filtered = false;
        this.$store.dispatch("addUser/fetchProducts", this.id);
      } else if (this.search !== null) {
        this.search = null;
        this.$store.dispatch("addUser/fetchProducts", this.id);
      }
    },
    changeM(loq) {
      console.log(loq);
      if (loq === 1) {
        this.page = 1;
        this.$store.dispatch("addUser/fetchProducts", loq);
      } else {
        if (this.search === null) {
          this.page--;
          this.$store.dispatch("addUser/fetchProducts", this.page);
        } else {
          this.page--;
          const obj = {
            page: this.page,
            name: this.search,
          };
          this.$store.dispatch("addUser/fetchProductSearch", obj);
        }
      }
    },
    ChangeA(val) {
      if (this.search) {
        console.log(this.search);
        const obj = {
          page: this.page,
          name: this.search,
        };
        this.$store.dispatch("addUser/fetchProductSearch", obj);
      } else {
        this.$store.dispatch("addUser/fetchProducts", this.page);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
    Search(search) {
      this.filtered = false
      this.searched = true;
      const obj = {
        page: this.page,
        name: search,
      };
      this.pages = null;
      this.pages = [];
      this.$store.dispatch("addUser/fetchProductSearch", obj);
    },
    Hide() {
      this.open = false;
    },
    getCat() {
      console.log(this.activeCategory);
      this.$store.dispatch("addUser/fetchCompanyGroupFilter", this.activeCategory.id);
    },
    FilterProduct() {
      this.search = null
      this.searched = false;
      const obj = {
        id: this.activePod.id,
        page: this.page,
      };
      this.$store.dispatch("addUser/GetProduct", obj)
      this.open = false;
        setTimeout(() => {
          this.filtered = true;
        }, 1000);
    },
  },
  created() {
    this.$store.dispatch("addUser/fetchProducts", this.id).then(() => {
      this.load = false;
    });
    this.$store.dispatch("addUser/fetchDataCompanies");
  },
};
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
.field {
  height: 50px;
  margin: 30px 0px 50px 0px;
  display: flex;
  input {
    height: 100%;
    width: 92%;
    padding: 14px 20px;
    background: #f6f8fe;
    border: 0.886581px solid #e3ebfc;
    box-sizing: border-box;
    border-radius: 8.86582px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #8f9dbc;
    &::placeholder {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #8f9dbc;
    }
  }
  .search-icon {
    background: #f6f8fe;
    border: 0.886581px solid #e3ebfc;
    box-sizing: border-box;
    border-radius: 8.86582px;
    cursor: pointer;
    width: 6%;
    margin-left: 22px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.filtered {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #394560;
  margin-top: -10px;
  margin-bottom: 30px;
  span {
    color: #60739f;
  }
}
.filter {
  margin-top: 80px;
  text-align: center;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;

  /* Main txt */

  color: #394560;
}
.actions1 {
  margin-top: 10px;
  margin-left: -42px;
  .icon {
    float: right;
    color: #4679ec;
    background: #edf1fd;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
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
.backtop {
  position: fixed;
  width: 55px;
  height: 55px;
  right: 4%;
  top: 750px;

  background: #fafbfe;
  /* Main Sahdow */
  cursor: pointer;
  box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
  border-radius: 13px;
  border: none;
  z-index: 999;
  .feather-icon {
    .feather {
      width: 40px;
      height: 40px;
      margin-top: 8px;
      margin-left: 8px;
    }
  }
}
</style>
