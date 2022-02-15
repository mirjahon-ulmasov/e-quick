<template>
  <div>
    <div class="field">
      <input type="search" v-model="search" placeholder="Поиск по названием" />
      <div class="search-icon">
        <img src="../../assets/images/icons/search.svg" alt="search" />
      </div>
    </div>
    <div class="category">
      <tree-item
        class="main"
        v-for="(item, i) in resultCategory" :key="i"
        :item="item"
        @make-folder="makeFolder"
        @add-item="addItem"
      ></tree-item>
    </div>
        <div v-show="resultCategory.length === 0 && load === false" class="not">
      <span> Результаты не найдены </span>
    </div>
    <spinner :bg="false" style="margin-top: 50px" v-if="load" ></spinner>
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
      load: true
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
          makeFolder: function(item) {
            Vue.set(item, "children", []);
            this.addItem(item);
            console.log(item);
          },
          addItem: function(item) {
            item.children.push({
              name: "new stuff"
            });
  }
  },
  created() {
    this.$store.dispatch("addUser/GetCategory").then(() => { this.load = false })
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
  justify-content: space-around;
  flex-wrap: wrap;
  .main {
    margin-bottom: 20px;
    width: 246px;
    height: auto;
    background: #edf1fd;
    border-radius: 10px;
    list-style: none;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    img {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
