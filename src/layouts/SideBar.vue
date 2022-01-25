<template>
  <div class="side-bar">
    <img
      src="../assets/new-images/icons/e-quick.svg"
      alt="E-quick"
      class="logo"
    />
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
      <router-link to="analytics" class="nav-link">Аналитика</router-link>
      <router-link to="add-admin" class="nav-link">Добавить админ</router-link>
      <router-link to="admin-list" class="nav-link">Список админов</router-link>
    </div>
  </div>
</template>

<script>
export default {};
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
      display: block;
      font-weight: 500;
      font-size: 16px;

      color: #60739f;
      line-height: 20px;
      margin: 30px 0px 30px 8px;
      padding: 20px;
      border-radius: 2rem 0 0 2rem;
    }
    .active {
      background: #ffffff;
      b:nth-child(1) {
        position: absolute;
        top: -30px;
        right: 0;
        height: 30px;
        width: 100%;
        background: white;
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
        background: white;
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
