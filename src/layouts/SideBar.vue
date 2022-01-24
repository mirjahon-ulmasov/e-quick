<template>
  <div class="side-bar">
    <img
      src="../assets/new-images/icons/e-quick.svg"
      alt="E-quick"
      class="logo"
    />
    <div class="nav-links">
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
  min-width: 240px;
  max-width: 340px;
  height: 100vh;
  font-family: Montserrat;
  background: #e2eafc;

  .logo {
    margin: 50px 50px;
  }

  .nav-links {
    .nav-link {
      display: block;
      font-weight: 500;
      font-size: 16px;
      margin-left: 8px;
      color: #60739F;
      line-height: 20px;
      margin-bottom: 2px;
      padding: 15px;
      border-radius: 2rem;
    }
    .active {
      background: #fff;
    }
  }
}
</style>
