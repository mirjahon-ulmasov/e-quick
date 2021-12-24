<template>
  <div class="wrapper">
    <div class="container">
      <img
        style="margin: 40px 45px 80px 0px"
        src="@/assets/dealer/img/svg/login/logo.png"
        alt=""
      />
      <input
        v-validate="'required|min:3'"
        data-vv-validate-on="blur"
        name="username"
        autocomplete="off"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        :placeholder="$t('auth.login')"
        v-model="username"
        class="custom-input"
        type="text"
      />
      <span class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2"
        >{{ errors.first("username") }}
      </span>
      <input
        @keypress.enter="loginJWT"
        data-vv-validate-on="blur"
        v-validate="'required|min:3'"
        type="password"
        name="password"
        autocomplete="off"
        icon-no-border
        icon="icon icon-lock"
        icon-pack="feather"
        :placeholder="$t('auth.parol')"
        v-model="password"
        class="custom-input1"
      />
      <span class="text-danger flex justify-content-flex-end text-sm mt-2 ml-2">
        {{ errors.first("password") }}
      </span>
      <vs-button @click="loginJWT" class="submit-btn">Войти</vs-button>
      <div class="row">
        <router-link :to="'/forget-password'">{{ $t('auth.forget') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      checkbox_remember_me: false,
      progress: 0,
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.username !== "" && this.password !== "";
    },
  },
  methods: {
    loginJWT() {
      if (this.validateForm) {
        // Loading
        this.$vs.loading();
        const payload = {
          checkbox_remember_me: this.checkbox_remember_me,
          userDetails: {
            username: this.username,
            password: this.password,
          },
        };
        this.$store
          .dispatch("auth/loginJWT", payload)
          .then(() => {
            this.$acl.change(localStorage.getItem("UserInfo"));
            this.$vs.loading.close();
            if (localStorage.getItem("UserInfo") == "dealer") {
              this.$router.push("/");
            } else if (localStorage.getItem("UserInfo") == "super_admin") {
              this.$router.push("/attechments");
            } else if (localStorage.getItem("UserInfo") == "admin") {
              this.$router.push("/user");
            }
          })
          .catch((error) => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Error",
              text: error.message,
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "danger",
            });
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;400;500;600;700;800;900&display=swap");
div.wrapper {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-image: url("../../assets/dealer/img/svg/login/login-background.svg"),
    linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  div.container {
    width: 412px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      margin: 15px;
      width: 311px !important;
      height: 79px;
    }
    input.custom-input {
      font-family: "Montserrat" sans-serif;
      width: 100%;
      height: 61px;
      margin: 13px;
      padding-top: 6px;
      color: #ffffff;
      background: none;
      border: 1.37581px solid #ffffff;
      box-sizing: border-box;
      border-radius: 5.50326px;
      font-size: 19.2614px;
      padding-left: 55px;
      &::placeholder {
        font-style: normal;
        font-weight: bold;
        font-size: 19.2614px;
        text-transform: uppercase;
        line-height: 28px;
        color: #ffffff;
      }
      &:nth-child(2) {
        background-image: url("../../assets/dealer/img/icons/user.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
      input.custom-input1:nth-child(3) {
        background-image: url("../../assets/dealer/img/icons/lock.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
    }
    input.custom-input1 {
      font-family: "Montserrat" sans-serif;
      width: 100%;
      height: 61px;
      margin: 13px;
      padding-top: 6px;
      color: #ffffff;
      background: none;
      border: 1.37581px solid #ffffff;
      box-sizing: border-box;
      border-radius: 5.50326px;
      padding-left: 55px;
      font-size: 19.2614px;
      &::placeholder {
        font-style: normal;
        font-weight: bold;
        font-size: 19.2614px;
        text-transform: uppercase;
        line-height: 28px;
        color: #ffffff;
      }
      &:nth-child(4) {
        background-image: url("../../assets/dealer/img/icons/lock.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
    }
    button.submit-btn {
      margin: 15px;
      width: 100%;
      border: none;
      outline: none;
      cursor: pointer;
      height: 57px;
      background: #ffffff !important;
      box-shadow: 0px 5.50326px 5.50326px rgba(0, 0, 0, 0.3);
      border-radius: 5.50326px;
      font-style: normal;
      font-weight: bold;
      font-size: 19.013px;
      line-height: 18px;
      text-align: center;
      text-transform: uppercase;
      color: #3a9fd1;
    }
    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      a {
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        margin-top: 44px;
        font-size: 21.013px;
        line-height: 27px;
        text-align: center;

        color: #ffffff;
      }
    }
  }
}
</style>
