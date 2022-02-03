<template>
  <div class="nav-bar">
    <h3>{{ title }}</h3>
    <div class="parent">
      <div class="profile">
        <img
          :src="baseUrl + info.profile_picture"
          width="60px"
          height="60px"
          style="border-radius: 50%"
          alt="Profile"
        />
        <div class="profile-content">
          <h4>{{ info.full_name }}</h4>
          <p>{{ info.role }}</p>
        </div>
      </div>
      <div :class="'dropdown'">
        <div class="item">
          <img
            src="../assets/images/icons/globus.svg"
            style="margin-right: 12px"
            alt="c"
          />
          <span> Сменить язык </span>
        </div>
        <router-link
          v-if="this.$store.state.userType === 'admin' || $acl.check('admin')"
          class="item"
          :to="'/settings'"
        >
          <img
            src="../assets/images/icons/settings.svg"
            style="margin-right: 12px"
            alt="c"
          />
          <span> Настройки </span>
        </router-link>
        <router-link
          v-if="
            this.$store.state.userType === 'super_admin' ||
            $acl.check('super_admin')
          "
          class="item"
          :to="'/setting'"
        >
          <img
            src="../assets/images/icons/settings.svg"
            style="margin-right: 12px"
            alt="c"
          />
          <span> Настройки </span>
        </router-link>
        <router-link
          v-if="this.$store.state.userType === 'dealer' || $acl.check('dealer')"
          class="item"
          to="/dealer/profile"
        >
          <img
            src="../assets/images/icons/settings.svg"
            style="margin-right: 12px"
            alt="c"
          />
          <span> Настройки </span>
        </router-link>
        <div @click="LogOut()" class="item">
          <img
            src="../assets/images/icons/logout.svg"
            style="margin-right: 12px"
            alt="c"
          />
          <span> Выйти с аккаунта </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      active: false,
      baseUrl: process.env.VUE_APP_IMG,
    };
  },
  computed: {
    info() {
      return this.$store.state.auth.info;
    },
  },
  methods: {
    LogOut() {
      localStorage.removeItem("access");
      localStorage.removeItem("UserInfo");
      this.$acl.change("editor");
      this.$router.push("/login");
      window.location.reload();
    },
  },
  created() {
    this.$store.dispatch("auth/DealerInfo");
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;
  font-family: Montserrat;

  h3 {
    font-weight: bold;
    font-size: 24px;
    color: #394560;
  }
  .parent {
    width: 240px;
    height: 50px;
    .dropdown {
      position: fixed;
      z-index: 999;
      margin-top: 20px;
      display: block;
      visibility: hidden;
      opacity: 0;
      -webkit-transform: translateY(20px);
      -ms-transform: translateY(20px);
      transform: translateY(20px);
      -webkit-transition: all 0.3s ease-in;
      -o-transition: all 0.3s ease-in;
      transition: all 0.3s ease-in;
      width: 194px;
      height: 165px;
      background: #f6f8fe;
      box-shadow: 0px -2px 8px rgba(70, 121, 236, 0.1),
        2px 4px 9px rgba(70, 121, 236, 0.09);
      border-radius: 8px;
      right: 171px;
      &:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        margin-left: 0.5em;
        right: 45px;
        box-sizing: border-box;
        border: 14px solid black;
        border-color: transparent transparent #f6f8fe #f6f8fe;
        transform-origin: 0 0;
        transform: rotate(135deg);
        box-shadow: -3px 3px 3px -3px rgba(214, 214, 214, 0.78);
      }
      .item {
        padding: 15px 10px 15px 15px;
        font-family: Raleway;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        /* identical to box height */

        display: flex;
        align-items: center;

        /* Main */

        color: #4679ec;
      }
    }
    &:hover {
      .dropdown {
        -webkit-transform: scaleY(1);
        -ms-transform: scaleY(1);
        transform: scaleY(1);
        opacity: 1;
        visibility: visible;
      }
    }
    .profile {
      display: flex;
      align-items: center;
      img {
        background: #edf2fb;
        padding: 3px;
        background: #ffffff;
        box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
        border-radius: 50%;
        border: 1.42857px solid #ffffff;
      }
      :hover .dropdown {
        -webkit-transform: translateY(20px);
        -ms-transform: translateY(20px);
        transform: translateY(20px);
        -webkit-transition: all 0.3s ease-in;
        -o-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;
        display: block;
      }

      .profile-content {
        margin-left: 12px;
        font-size: 16px;

        h4 {
          font-weight: 600;
          color: #60739f;
          margin-bottom: 3px;
        }
        p {
          color: #60739fb3;
        }
      }
    }
  }
}
</style>
<style scoped>
.profile:hover .dropdown {
  display: block;
}
</style>
