<template>
  <div class="side-bar" :class="{ small: !isFull }">
    <img
      :src="isFull ? logo.big : logo.small"
      :width="isFull ? '140px' : '39px'"
      alt="E-quick"
      class="logo"
    />
    <img
      :src="isFull ? sidebar.close : sidebar.open"
      alt="close icon"
      class="sidebar-btn"
      :class="{ 'close-btn': isFull, 'open-btn': !isFull }"
      @click="getIsFull()"
    />
    <div class="nav-links">
      <router-link to="/dealer/analytics" class="nav-link">
        <img
          :src="link === 'analytics' ? graph.bold : graph.light"
          alt="graph icon"
        />
        <p>{{ $t("analytics.title") }}</p></router-link
      >
      <router-link to="/dealer/create-order" class="nav-link">
        <img
          :src="link === 'create-order' ? paper.bold : paper.light"
          alt="paper icon"
        />
        <p>{{ $t("cart.title") }}</p></router-link
      >
      <router-link to="/dealer/journal" class="nav-link">
        <img
          :src="link === 'journal' ? document.bold : document.light"
          alt="document icon"
        />
        <p>{{ $t("journal.title") }}</p>
      </router-link>
      <router-link to="/dealer/templates" class="nav-link">
        <img
          :src="link === 'templates' ? award.bold : award.light"
          alt="award icon"
        />
        <p>{{ $t("templates.title") }}</p>
      </router-link>
      <router-link to="/dealer/feedback" class="nav-link">
        <img
          :src="link === 'feedback' ? message.bold : message.light"
          alt="message icon"
        />
        <p>{{ $t("feedback.title") }}</p>
      </router-link>
      <router-link to="/dealer/whs" class="nav-link">
        <img
          :src="link === 'whs' ? discount.bold : discount.light"
          alt="discount icon"
        />
        <p>{{ $t("whs") }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "DelearSideBar",
  data() {
    return {
      isFull: true,
      sidebar: {
        open: require("@/assets/images/icons/open-sidebar.svg"),
        close: require("@/assets/images/icons/close-sidebar.svg"),
      },
      logo: {
        big: require("../../assets/images/logo/e-quick-white.png"),
        small: require("../../assets/images/logo/equick-e-white.png"),
      },
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
  methods: {
    getIsFull() {
      this.isFull = !this.isFull;
      this.$emit("is_full", this.isFull);
    },
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  position: relative;
  min-width: 290px;
  width: 18%;
  height: 100vh;
  font-family: Montserrat;
  background: #4679ec;
  box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.12);

  .logo {
    margin: 50px;
  }

  .sidebar-btn {
    position: absolute;
    cursor: pointer;
    top: 3rem;
  }

  .close-btn {
    right: 0;
  }

  .open-btn {
    right: -24px;
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

.small {
  min-width: 100px;
  width: 5%;

  .logo {
    margin: 50px 30px;
  }

  .nav-links {
    text-align: center;
    .nav-link {
      display: inline-block;
      margin-top: 8px;
      padding: 14px 15px;
      line-height: 0;

      img {
        margin: 0;
      }

      p {
        display: none;
      }
    }
  }
}
</style>
