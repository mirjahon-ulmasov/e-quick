<template>
  <div>
        <my-button
          title="Добавить товар"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="203"
          style="margin-bottom: 40px"
          @click.native="addAdmin()"
        ></my-button>
    <table id="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in productList"
          :key="i"
          @click="$router.push(`/user/${admin.id}`)"
        >
          <td>{{ admin.name }}</td>
          <td>{{ admin.company_id }}</td>
          <td>{{ admin.phone_number }}</td>
          <td style="padding-left: 40px !important" >{{ admin.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { title: "Название" },
        { title: "Завод" },
        { title: "Категория" },
        { title: "Цена" },
      ],
    };
  },
  computed: {
    productList() {
      return this.$store.state.addUser.products.results;
    },
  },
  methods: {
    addAdmin(){
      this.$router.push('add-user')
    }
  },
  created() {
    this.$store.dispatch("addUser/fetchProducts");
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
