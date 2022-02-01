<template>
  <div>
    <div class="field">
      <input type="search" v-model="search" placeholder="Поиск по названием" />
      <div class="search-icon">
        <img src="../../assets/images/icons/search.svg" alt="search" />
      </div>
    </div>
    <div class="carts">
      <div class="cart" v-for="(admin, i) in resultCompany" :key="i">
        <div class="header">
          <h2>
            {{ admin.name }}
          </h2>
        </div>
        <div class="body">
          <h3>Главная компания</h3>
          <span v-if="admin.parent_id === 0"> - </span>
          <h3>Категорий</h3>
          <span>
            {{ admin.category }}
          </span>
          <router-link :to="`company/${admin.id}`" >
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
    <span v-if="resultCompany.length === 0" class="not">
      Результаты не найдены
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { title: "Название" },
        { title: "Главная компания" },
        { title: "Характеристика" },
      ],
      search: ''
    };
  },
  computed: {
    resultCompany() {
      if (this.search) {
        return this.companyList.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {  
        return this.companyList;
      }
    },
    companyList() {
      return this.$store.state.addUser.companies;
    },
  },
  methods: {
    addAdmin() {
      this.$router.push("add-user");
    },
  },
  created() {
    this.$store.dispatch("addUser/fetchCompany");
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
  margin: 30px 15px 50px 10px;
  display: flex;
  input {
    height: 100%;
    width: 87%;
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
.not{
  font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 17px;
text-align: center;
color: #4679EC;
margin-left: 10px;
}
</style>
