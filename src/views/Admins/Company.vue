<template>
  <div>
        <my-button
          title="Добавить компанию"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="239"
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
          v-for="(admin, i) in companyList"
          :key="i"
          @click="$router.push(`/user/${admin.id}`)"
        >
          <td>{{ admin.name }}</td>
          <td v-if="admin.parent_id === 0" > - </td>
          <td style="padding-left: 40px !important" >{{ admin.options}}</td>
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
</style>
