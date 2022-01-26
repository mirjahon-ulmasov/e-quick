<template>
  <div class="side-bar">
    <img src="../assets/images/logo/e-quick.svg" alt="E-quick" class="logo" />
    <div
      class="nav-links"
      v-if="this.$store.state.userType === 'admin' || $acl.check('admin')"
    >
      <router-link to="analytic" class="nav-link">
        <b></b>
        <b></b>
        Аналитика
      </router-link>
      <router-link to="users" class="nav-link">
        <b></b>
        <b></b>
        Пользователи</router-link
      >
      <router-link to="companies" class="nav-link">
        <b></b>
        <b></b>
        Компании</router-link
      >
      <router-link to="products" class="nav-link">
        <b></b>
        <b></b>
        Товары</router-link
      >
      <router-link to="categories" class="nav-link">
        <b></b>
        <b></b>
        Категории</router-link
      >
    </div>
    <div
      class="nav-links"
      v-if="
        this.$store.state.userType === 'super_admin' ||
        $acl.check('super_admin')
      "
    >
      <router-link to="/analytics" class="nav-link">
        <b></b>
        <b></b>
        <img
          v-if="this.$route.meta.link === 'analytics'"
          src="../assets/images/icons/graph-bold.svg"
          alt="graph icon"
        />
        <img
          v-else
          src="../assets/images/icons/graph-light.svg"
          alt="graph icon"
        />
        Аналитика</router-link
      >
      <router-link to="/add-admin" class="nav-link">
        <b></b>
        <b></b>
        <img
          v-if="this.$route.meta.link === 'add-admin'"
          src="../assets/images/icons/add-user-bold.svg"
          alt="add user icon"
        />
        <img
          v-else
          src="../assets/images/icons/add-user-light.svg"
          alt="add user icon"
        />
        Добавить админ</router-link
      >
      <router-link to="/admins" class="nav-link">
        <b></b>
        <b></b>
        <img
          v-if="this.$route.meta.link === 'admin-list'"
          src="../assets/images/icons/paper-bold.svg"
          alt="paper icon"
        />
        <img
          v-else
          src="../assets/images/icons/paper-light.svg"
          alt="paper icon"
        />
        Список админов</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
<<<<<<< HEAD
  mounted() {},
=======

>>>>>>> 0b7fbe057aded8fb9fe0b32f708f167cfe98d71b
};
</script>

<style lang="scss" scoped>
.side-bar {
  min-width: 270px;
  width: 15%;
  height: 100vh;
  font-family: Montserrat;
  background: #e2eafc;

  .logo {
    margin: 50px 50px;
  }

  .nav-links {
    .nav-link {
      position: relative;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 16px;
      color: #60739f;
      line-height: 20px;
      margin: 30px 0px 30px 8px;
      padding: 20px;
      border-radius: 2rem 0 0 2rem;

      img {
        margin-right: 1rem;
      }
    }
    .active {
      background: #fff;
      b:nth-child(1) {
        position: absolute;
        top: -30px;
        right: 0;
        height: 30px;
        width: 100%;
        background: #fff;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-bottom-right-radius: 50px;
          background: #e2eafc;
        }
      }
      b:nth-child(2) {
        position: absolute;
        bottom: -30px;
        right: 0;
        height: 30px;
        width: 100%;
        background: #fff;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-top-right-radius: 50px;
          background: #e2eafc;
        }
      }
    }
  }
}
</style>
