<template>
  <div class="side-bar">
    <img
      src="../../assets/images/logo/e-quick-white.png"
      width="140px"
      alt="E-quick"
      class="logo"
    />
    <div class="nav-links">
      <router-link to="/dealer/analytics" class="nav-link">
        <img
          :src="link === 'analytics' ? graph.bold : graph.light"
          alt="graph icon"
        />
        Аналитика</router-link
      >
      <router-link to="/dealer/create-order" class="nav-link">
        <img
          :src="link === 'create-order' ? paper.bold : paper.light"
          alt="paper icon"
        />
        Создать заказ</router-link
      >
      <router-link to="/dealer/journal" class="nav-link">
        <img
          :src="link === 'journal' ? document.bold : document.light"
          alt="document icon"
        />Журнал</router-link
      >
      <router-link to="/dealer/templates" class="nav-link">
        <img
          :src="link === 'templates' ? award.bold : award.light"
          alt="award icon"
        />Шаблоны</router-link
      >
      <router-link to="/dealer/feedback" class="nav-link">
        <img
          :src="link === 'feedback' ? message.bold : message.light"
          alt="message icon"
        />
        Обратная связь</router-link
      >
      <router-link to="/dealer/whs" class="nav-link">
        <img
          :src="link === 'whs' ? discount.bold : discount.light"
          alt="discount icon"
        />
        WHS Остатки</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "DelearSideBar",
  data() {
    return {
      graph: {
        bold: require("../../assets/images/icons/graph-white-bold.svg"),
        light: require("../../assets/images/icons/graph-white-light.svg"),
      },
      paper: {
        bold: require("../../assets/images/icons/paper-plus-bold.svg"),
        light: require("../../assets/images/icons/paper-plus-light.svg"),
      },
      document: {
        bold: require("../../assets/images/icons/document-bold.svg"),
        light: require("../../assets/images/icons/document-light.svg"),
      },
      award: {
        bold: require("../../assets/images/icons/award-bold.svg"),
        light: require("../../assets/images/icons/award-light.svg"),
      },
      message: {
        bold: require("../../assets/images/icons/message-bold.svg"),
        light: require("../../assets/images/icons/message-light.svg"),
      },
      discount: {
        bold: require("../../assets/images/icons/discount-bold.svg"),
        light: require("../../assets/images/icons/discount-light.svg"),
      },
    };
  },
  computed: {
    link() {
      return this.$route.meta.link;
    },
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  min-width: 290px;
  width: 18%;
  height: 100vh;
  font-family: Montserrat;
  background: #4679ec;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.12);

  .logo {
    margin: 50px 50px;
  }

  .nav-links {
    .nav-link {
      border-radius: 10px;
      position: relative;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #ffffff;
      padding: 15px;
      margin: 17px;
      transition: 0.1s;

      img {
        margin-right: 1rem;
      }
    }
    .active {
      background: #1858e7;
    }
  }
}
</style>
