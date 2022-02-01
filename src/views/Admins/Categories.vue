<template>
  <div>
        <!-- <my-button
          title="Добавить категорию"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="240"
          style="margin-bottom: 40px"
          @click.native="addAdmin()"
        ></my-button> -->
    <table id="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in categoryList"
          :key="i"
          @click="$router.push(`/user/${admin.id}`)"
        >
          <td>{{ admin.full_name }}</td>
          <td>{{ admin.phone_number }}</td>
          <td>{{ admin.role }}</td>
          <td >
               <img src="../../assets/images/icons/edit-bold.svg" style="margin-left: 45px" alt="edit icon" />
          </td>
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
        { title: "Завод" },
        { title: "Главная категория" },
        { title: "Подкатегория" },
        { title: "Изменить" },
      ],
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.addUser.admins;
    },
  },
  methods: {
    addAdmin(){
      this.$router.push('add-user')
    }
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
