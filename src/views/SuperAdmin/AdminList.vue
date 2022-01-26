<template>
  <div>
    <table id="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in adminList"
          :key="i"
          @click="$router.push(`/admins/${admin.id}`)"
        >
          <td>{{ admin.full_name }}</td>
          <td>{{ admin.phone_number }}</td>
          <td>{{ admin.username }}</td>
          <td>{{ admin.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavBar from "../../layouts/Navbar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      headers: [
        { title: "Ф.И.О." },
        { title: "Телефон номера" },
        { title: "Имя пользователя" },
        { title: "Роль" },
      ],
    };
  },
  computed: {
    adminList() {
      return this.$store.state.addUser.admins;
    },
  },
  created() {
    this.$store.dispatch("addUser/fetchDataListItems");
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
