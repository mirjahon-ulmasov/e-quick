<template>
  <div>
    <table v-if="productList.total_products !== 0" id="table">
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
    <span v-if="productList.total_products === 0" class="not">
      Результаты не найдены
    </span>
    <nav
      v-if="productList.total_products !== 0 || productList.items.length !== 0"
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
            v-for="(pageNumber, i) in pages"
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
  props: ["id"],
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
      page: 1,
      perPage: 100,
      pages: [],
      filtered: false,
      scTimer: 0,
      scY: 0,
      searched: false,
    };
  },
  computed: {
    productList() {
      return this.$store.state.addUser.filtered_products;
    },
    product() {
      return this.paginate(this.$store.state.addUser.filtered_products);
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
      if (loq === this.pages.length) {
        const obj = {
           id: this.id.id,
          page: this.page,
        };
        this.$store.dispatch("addUser/GetProduct", obj);
      } else {
        this.page++;
        const obj = {
           id: this.id.id,
          page: this.page,
        };
        this.$store.dispatch("addUser/GetProduct", obj);
      }
    },
    changeM(loq) {
      if (loq === 1) {
        const obj = {
          id: this.id.id,
          page: this.page,
        };
        this.$store.dispatch("addUser/GetProduct", obj);
      } else {
        this.page--;
        const obj = {
           id: this.id.id,
          page: this.page,
        };
        this.$store.dispatch("addUser/GetProduct", obj);
      }
    },
    ChangeA(val) {
      const obj = {
         id: this.id.id,
        page: this.page,
      };
      this.$store.dispatch("addUser/GetProduct", obj);
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
};
</script>

<style>
#table {
  width: 100%;
}
</style>