<template>
  <div>
        <my-button
          title="Добавить пользователя"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="263"
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
          v-for="(admin, i) in adminList"
          :key="i"
          @click="$router.push(`/user/${admin.id}`)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ admin.full_name }}</td>
          <td>{{ admin.phone_number }}</td>
          <td>{{ admin.role }}</td>
          <td>{{ admin.username }}</td>
          <td>
            <span v-show="admin.active === 1" class="active" >
              Активен
            </span>
            <span v-show="admin.active === 0" class="inactive" >
              Неактивен
            </span>
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
         { title: "№" },
        { title: "Ф.И.О." },
        { title: "Телефон номера" },
        { title: "Роль" },
        { title: "Имя пользователя" },
        { title: "Статус" },
      ],
    };
  },
  computed: {
    adminList() {
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
