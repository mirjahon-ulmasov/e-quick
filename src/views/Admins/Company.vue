<template>
  <div>
        <!-- <my-button
          title="Добавить компанию"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="239"
          style="margin-bottom: 40px"
          @click.native="addAdmin()"
        ></my-button> -->
    <!-- <table id="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in companyList"
          :key="i"
          @click="$router.push(`/user/${admin.id}`)"
        >
          <td>{{ admin.name }}</td>
          <td v-if="admin.parent_id === 0" > - </td>
          <td style="padding-left: 40px !important" >{{ admin.options}}</td>
        </tr>
      </tbody>
    </table> -->
  <div class="carts">
    <div class="cart"        
    v-for="(admin, i) in companyList"
          :key="i">
   <div class="header">
     <h2>
       {{ admin.name }}
     </h2>
   </div>
   <div class="body">
    <h3>
      Главная компания
    </h3>
    <span v-if="admin.parent_id === 0" >
      -
    </span>
        <h3>
      Категорий
    </h3>
    <span>
      {{ admin.category }}
    </span>
    <button>
      Посмотреть
    </button>
   </div>
    </div>
  </div>
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
    };
  },
  computed: {
    companyList() {
      return this.$store.state.addUser.companies;
    },
  },
  methods: {
    addAdmin(){
      this.$router.push('add-user')
    }
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
.carts{
      display: flex;
    flex-wrap: wrap;

.cart{
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 15px;
  margin-bottom: 40px;
 width: 30%;
height: 295px;
left: 384px;
top: 349px;

background: #FFFFFF;
/* Main Sahdow */

box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
border-radius: 7.65496px;
.header{
width: 100%;
// height: 54px;
display: flex;
align-items: center;
padding: 20px;
background: #E5EDFF;
border-radius: 7.65496px 7.65496px 0px 0px;
h2{
  font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 100.9%;
/* or 16px */


/* Text */

color: #60739F;
}
}
.body{
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
  h3{
    font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 100.9%;
/* or 14px */


/* Text */
margin-top: 20px;
color: #60739F;
  }
  span{
    margin-top: 12px;
    font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 100.9%;
/* or 18px */


/* Text */

color: #60739F;
  }
  button{
    margin-top: 40px;
   margin-left: 15px;
    width: 90%;
height: 44.5px;
background: #EBF0FF;
border-radius: 10px;
border: none;
font-family: Montserrat;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 17px;
/* identical to box height */

text-align: center;
letter-spacing: 0.01em;

/* Main */

color: #4679EC;
  }
}
}
}
</style>
