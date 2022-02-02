<template>
  <div>
    <div class="field">
      <input type="search" v-model="search" @keypress.enter="Search(search)" placeholder="Поиск по названием" />
      <button class="search-icon">
        <img src="../../assets/images/icons/filter.svg" alt="search" />
      </button>
    </div>
    <table id="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in productList.items"
          :key="i"
          @click="$router.push(`/product/${admin.id}`)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ admin.name }}</td>
          <td>{{ admin.company_name }}</td>
          <td>{{ admin.category_name }}</td>
          <td style="padding-left: 40px !important">
            {{ Number(admin.price).toLocaleString("de-DE") }} {{ $t("sum") }}
          </td>
        </tr>
      </tbody>
    </table>
    <nav>
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
  </div>
</template>

<script>
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
      search: "",
      id: 1,
      page: 1,
      perPage: 20,
      pages: [],
    };
  },
  computed: {
    productList() {
      return this.$store.state.addUser.products;
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
      let numberOfPages = Math.ceil(
        this.productList.total_products / this.perPage
      );
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    change(loq) {
      console.log(loq);
      if (loq === this.pages.length) {
        this.page = this.pages.length;
        this.$store.dispatch("addUser/fetchProducts", this.page);
      } else {
        this.page++;
        this.$store.dispatch("addUser/fetchProducts", this.page);
      }
    },
    changeM(loq) {
      console.log(loq);
      if (loq === 1) {
        this.page = 1;
        this.$store.dispatch("addUser/fetchProducts", loq);
      } else {
        this.page--;
        this.$store.dispatch("addUser/fetchProducts", this.page);
      }
    },
    ChangeA(val) {
      this.$store.dispatch("addUser/fetchProducts", val);
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
    Search(search){
      const obj = {
        page: this.page,
        name: search
      }
      this.$store.dispatch("addUser/fetchProductSearch", obj);
    }
  },
  created() {
    this.$store.dispatch("addUser/fetchProducts", this.id);
  },
  mounted() {},
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
    width: 6%;
    margin-left: 22px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
