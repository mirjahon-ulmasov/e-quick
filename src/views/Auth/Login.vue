<template>
  <div class="login">
    <img src="../../assets/images/logo/e-quick.png" alt="E-quick" />
    <form @submit.prevent="loginJWT">
      <h3>Войти</h3>
      <div class="form-input">
        <h4>Логин</h4>
        <my-input
          type="input"
          :width="375"
          padding="14px 44px"
          :isLogin="true"
          name="username"
          v-model="username"
          :error="errors.has('username')"
          v-validate="'required|min:4'"
        />
        <span class="error-text" v-show="errors.has('username')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("username") }}
        </span>
      </div>
      <div class="form-input">
        <h4>Пароль</h4>
        <my-input
          type="password"
          name="password"
          padding="14px 46px"
          :isPassword="true"
          v-model="password"
          ref="password"
          :width="375"
          :error="errors.has('password')"
          v-validate="'required|min:5'"
        />
        <span class="error-text" v-show="errors.has('password')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("password") }}
        </span>
      </div>
      <div class="form-group">
        <input v-model="remember_me" type="checkbox" id="news" />
        <label for="news">Запомнить меня</label>
      </div>
      <div class="actions">
        <my-button
          type="submit"
          title="Войти"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="380"
          :fontSize="17"
        ></my-button>
        <router-link class="link" to="/forget-password"
          >Забыли пароль?</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      remember_me: false,
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
          checkbox_remember_me: this.remember_me,
          userDetails: {
            username: this.username,
            password: this.password,
          },
        };
        this.$store
          .dispatch("auth/loginJWT", payload)
          .then(() => {
            this.$acl.change(this.$store.state.userType);
            const role = this.$store.state.userType;
            this.$vs.loading.close();
            if (role === "super_admin" || role === "admin") {
              this.$router.push("/analytics");
            } else if (role === "dealer") {
              this.$router.push("/dealer/analytics");
            }
          })
          .catch((error) => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: "Error",
              text: error.response.data.detail,
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
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f8ff;
  background-image: url("../../assets/images/icons/login.svg");

  img {
    width: 150px;
  }

  form {
    margin-top: 3rem;
    display: inline-block;
    background: #ffffff;
    padding: 30px 50px;
    box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
    border-radius: 14.1853px;

    h3 {
      font-weight: 600;
      font-size: 21.278px;
      line-height: 25px;
      color: #000;
      text-align: center;
    }

    .actions {
      display: flex;
      flex-direction: column;
      align-items: center;

      .link {
        font-weight: 500;
        font-size: 15px;
        margin-top: 1rem;
        letter-spacing: 0.02em;
        color: #4679ec;
      }
    }
  }
}
</style>
