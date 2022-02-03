<template>
  <div>
    <div class="field">
      <input type="search" v-model="search" placeholder="Поиск по названием" />
      <div class="search-icon">
        <img src="../../assets/images/icons/search.svg" alt="search" />
      </div>
    </div>
    <div class="category">
      <div class="main" v-for="(item, i) in resultCategory" :key="i">
        <span>
          {{ item.name }}
        </span>
        <img src="../../assets/images/icons/select-icon.svg" alt="" />
      </div>
    </div>
        <div v-show="resultCategory.length === 0" class="not">
      <span> Результаты не найдены </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { title: "Завод" },
        { title: "Главная категория" },
        { title: "Подкатегория" },
        { title: "Изменить" },
      ],
      search: "",
    };
  },
  computed: {
    resultCategory() {
      if (this.search) {
        return this.categoryList.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.categoryList;
      }
    },
    categoryList() {
      return this.$store.state.addUser.category;
    },
  },
  methods: {
    addAdmin() {
      this.$router.push("add-user");
    },
  },
  created() {
    this.$store.dispatch("addUser/GetCategory");
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
.category {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .main {
    padding: 14px 18px;
    margin-bottom: 20px;
    width: 246px;
    background: #edf1fd;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
