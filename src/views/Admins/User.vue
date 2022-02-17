<template>
  <div>
    <my-button
      title="Добавить пользователя"
      bgColor="#4679EC"
      color="#FFFFFF"
      :width="263"
      style="margin-bottom: 40px"
      @click.native="$router.push('/add-user')"
    ></my-button>
    <div class="field">
      <input type="search" v-model="search" placeholder="Поиск по названием" />
      <div class="search-icon">
        <img src="../../assets/images/icons/search.svg" alt="search" />
      </div>
    </div>
    <table id="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in resultUsers"
          :key="i"
          @click="$router.push(`/user/${admin.id}`)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ admin.full_name }}</td>
          <td>{{ admin.phone_number }}</td>
          <td>{{ admin.role }}</td>
          <td>{{ admin.username }}</td>
          <td>
            <span v-show="admin.active === 1" class="active"> Активен </span>
            <span v-show="admin.active === 0" class="inactive">
              Неактивен
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="resultUsers.length === 0" class="not">
      <span>{{ $t('not_data') }}.</span>
    </div>
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
            v-for="(pageNumber, i) in pages"
            :key="i"
            :class="{ active: page === pageNumber }"
            @click="page = pageNumber"
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
        { title: "Ф.И.О." },
        { title: "Телефон номера" },
        { title: "Роль" },
        { title: "Имя пользователя" },
        { title: "Статус" },
      ],
      search: "",
      page: 1,
      perPage: 5,
      pages: [],
    };
  },
  computed: {
    resultUsers() {
      if (this.search) {
        return this.adminList.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.full_name.toLowerCase().includes(v));
        });
      } else {
        return this.adminList;
      }
    },
    adminList() {
      return this.paginate(this.$store.state.addUser.admins);
    },
    adminList1() {
      return this.$store.state.addUser.admins
    },
  },
  watch: {
    adminList1() {
      this.setPages();
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.adminList1.length / this.perPage);
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
    this.$store.dispatch("addUser/fetchDataListItems");
  },
};
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
