<template>
  <div class="wrapper">
    <form autocomplete="off" class="container">
      <img
        width="311px"
        height="80px"
        style="margin: 40px 40px 88px 0px"
        src="@/assets/dealer/img/svg/login/logo1.png"
        alt="img"
      />
      <input
        v-validate="'required|min:3'"
        name="username"
        autocomplete="off"
        :placeholder="$t('auth.login')"
        v-model="username"
        class="custom-input"
        type="text"
      />
      <span v-if="errors.first('username') === 'The username field must be at least 3 characters'" class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2"
        >
        {{ $t('auth.logReqM') }}
      </span>
      <span v-if="errors.first('username') === 'The username field is required'" class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2"
        >
        {{ $t('auth.logReq') }} 
      </span>
        <input
        @keypress.enter="loginJWT"
        v-validate="'required|min:3'"
        :type="[showPassword1 ? 'text' : 'password']"
        name="password"
        autocomplete="off"
        :placeholder="$t('auth.parol')"
        v-model="password"
        class="custom-input1 ml-0 mr-0"
      />
                    <feather-icon
              @click="showPassword1 = !showPassword1"
                  :icon="showPassword1 ? 'EyeIcon' : 'EyeOffIcon'"
                  style="color: #ffffff !important; margin-left: 315px !important; margin-top: -53px;"
                  svgClasses="h-7 w-7"
                />
      <span v-if="errors.first('password') === 'The password field must be at least 3 characters'" class="text-danger text-sm flex justify-content-flex-end mt-8 ml-2"
        >
        {{ $t('auth.passReqM') }}
      </span>
      <span v-if="errors.first('password') === 'The password field is required'" class="text-danger text-sm flex justify-content-flex-end mt-8 ml-2"
        >
        {{ $t('auth.pasReq') }} 
      </span>
      <vs-button @click="loginJWT" class="submit-btn"><span class="text" >{{ $t('auth.kirish') }}</span></vs-button>
      <div class="row">
        <router-link :to="'/forget-password'">{{ $t('auth.forget') }}</router-link>
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
      checkbox_remember_me: false,
      progress: 0,
      showPassword1: false
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
            this.$acl.change(this.$store.state.userType);
            const user = this.$store.state.userType
            this.$vs.loading.close();
            if (user === "dealer") {
              this.$router.push("/");
            } else if (user == "super_admin") {
              this.$router.push("/attechments");
            } else if (user == "admin") {
              this.$router.push("/user");
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;400;500;600;700;800;900&display=swap");
div.wrapper {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-image:  url("../../assets/dealer/img/svg/login/left.svg"), url("../../assets/dealer/img/svg/login/right.svg"), linear-gradient(99.52deg, #3f4f61 -14.96%, #3a9fd1 156.83%);
  background-repeat: no-repeat,no-repeat,no-repeat;
  background-size: contain,contain,contain;
  background-position: left, right, center;
  display: flex;
  justify-content: center;
  align-items: center;
  form.container {
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
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 19.2614px;
line-height: 28px;
/* identical to box height, or 143% */

text-transform: uppercase;

color: #FFFFFF;
      }
      &:nth-child(2) {
        background-image: url("../../assets/dealer/img/icons/user.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
      input.custom-input1:nth-child(4) {
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
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 19.2614px;
line-height: 28px;
/* identical to box height, or 143% */

text-transform: uppercase;

color: #FFFFFF;
      }
      &:nth-child(3) {
        background-image: url("../../assets/dealer/img/icons/lock.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
    }
    button.submit-btn {
      margin: 15px;
      width: 100%;
      margin-top: 40px !important;
      border: none;
      outline: none;
      cursor: pointer;
      height: 57px;
      background: #ffffff !important;
      box-shadow: 0px 5.50326px 5.50326px rgba(0, 0, 0, 0.3);
      border-radius: 5.50326px;
      font-style: normal;
      font-weight: bold;
      font-size: 22.013px;
      line-height: 18px;
      text-align: center;
      text-transform: uppercase;
      .text{
              background-image: linear-gradient(
      99.52deg,
      #3f4f61 -14.96%,
      #3a9fd1 156.83%
    );
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    display: table;
      }
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
