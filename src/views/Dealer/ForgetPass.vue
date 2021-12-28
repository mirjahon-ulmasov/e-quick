<template>
  <div class="wrapper">
    <div class="container">
      <img
        style="margin-bottom: 45px"
        src="@/assets/dealer/img/svg/login/logo.png"
        alt=""
      />
      <h2 class="text">Сброс пароля</h2>
      <input
        @keypress.enter="Reset"
        v-show="sended == false"
        autocomplete="off"
        v-validate="'required|min:3'"
        name="username"
        icon-no-border
        icon="icon icon-user"
        icon-pack="feather"
        placeholder="Email"
        v-model="email"
        class="custom-input1"
        type="text"
      />
      <!-- <span v-show="sended==false" class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2">{{ errors.first('username') }} </span> -->
      <input
        @keypress.enter="Reset"
        autocomplete="off"
        v-show="code1"
        v-validate="'required|min:5|max:5'"
        type="password"
        name="code"
        placeholder="Введите полученный код"
        v-model="code"
        class="custom-input2"
      />
      <!-- <span v-show="code1"  class="text-danger flex justify-content-flex-end text-sm mt-2 ml-2">
          {{ errors.first('code') }}
        </span> -->
      <div v-show="code1" style="justify-content: space-between" class="row">
        <router-link :to="''"
          >You not reseve your verification code?
        </router-link>
        <a style="color: #22292f; text-decoration: underline" @click="ReSend()">
          Resend code
        </a>
      </div>
      <input
        @keypress.enter="Reset"
        autocomplete="off"
        v-show="confirmed"
        v-validate="'required|min:3'"
        type="password"
        name="password"
        ref="password"
        placeholder="Новый пароль"
        v-model="password"
        class="custom-input3"
      />
      <!-- <span v-show="confirmed" class="text-danger text-sm flex justify-content-flex-end mt-2 ml-2">{{ errors.first('password') }} </span> -->
      <input
        @keypress.enter="Reset"
        v-show="confirmed"
        v-validate="'min:3|confirmed:password'"
        type="password"
        name="confirm"
        autocomplete="off"
        placeholder="подтвердите пароль"
        data-vv-as="password"
        v-model="confirm_password"
        class="custom-input4"
      />
      <span
        v-show="confirmed"
        class="text-danger flex justify-content-flex-end text-sm mt-2 ml-2"
      >
        {{ errors.first("confirm") }}
      </span>
      <vs-button @click="Reset()" class="submit-btn">Отправить</vs-button>
      <!-- <div class="row">
                <router-link :to="'/login'" >Login</router-link>

            </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      code: "",
      confirm_password: "",
      userId: null,
      sended: false,
      code1: false,
      confirmed: false,
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
    ReSend() {
      this.$vs.loading();
      this.$store
        .dispatch("auth/ResetPass", {
          email: this.email,
        })
        .then((response) => {
          console.log(response);
          this.$vs.notify({
            title: "OK",
            text: "Code sended your email",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "success",
          });
          this.$vs.loading.close();
          this.sended = true;
          this.code1 = true;
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Error",
            text: err.response.data.detail,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
          this.$vs.loading.close();
        });
    },
    Reset() {
      if (this.sended == false) {
        if (this.email !== "") {
          this.$vs.loading();
          this.$store
            .dispatch("auth/ResetPass", {
              email: this.email,
            })
            .then((response) => {
              console.log(response);
              this.$vs.notify({
                title: "OK",
                text: "Code sended your email",
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
              });
              this.$vs.loading.close();
              this.sended = true;
              this.code1 = true;
            })
            .catch((err) => {
              this.$vs.notify({
                title: "Error",
                text: err.response.data.detail,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
              this.$vs.loading.close();
            });
        } else {
          this.$vs.notify({
            title: "Error",
            text: "Fill the form correctly",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        }
      } else if (this.code1 == true) {
        if (this.code !== "") {
          this.$vs.loading();
          this.$store
            .dispatch("auth/Verify", {
              code: this.code,
            })
            .then((response) => {
              console.log(response);
              this.userId = response.data.user_id;
              this.$vs.notify({
                title: "OK",
                text: response.data.message,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
              });
              this.$vs.loading.close();
              this.code1 = false;
              this.confirmed = true;
              this.sended = true;
            })
            .catch((err) => {
              this.$vs.notify({
                title: "Error",
                text: err.response.data.detail,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
              this.$vs.loading.close();
            });
        } else {
          this.$vs.notify({
            title: "Error",
            text: "Fill the form correctly",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        }
      } else if (this.confirmed !== "") {
        if (this.password !== "") {
          this.$vs.loading();
          this.$store
            .dispatch("auth/ChangePass", {
              password: this.password,
              user_id: this.userId,
            })
            .then((response) => {
              console.log(response);
              this.$vs.notify({
                title: "OK",
                text: response.data.message,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "success",
              });
              this.$vs.loading.close();
              this.code1 = false;
              this.confirmed = false;
              this.sended = false;
              this.$router.push("/login");
            })
            .catch((err) => {
              this.$vs.notify({
                title: "Error",
                text: err.response.data.detail,
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "danger",
              });
              this.$vs.loading.close();
            });
        } else {
          this.$vs.notify({
            title: "Error",
            text: "Fill the form correctly",
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger",
          });
        }
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
    .text {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 25px;
      line-height: 30px;
      text-align: center;
      margin-bottom: 30px !important;
      color: #ffffff;
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
      font-size: 19.2614px;
      border-radius: 5.50326px;
      padding-left: 60px;
      &::placeholder {
        font-style: normal;
        font-weight: bold;
        font-size: 19.2614px;
        text-transform: uppercase;
        line-height: 27px;
        color: #ffffff;
      }
      &:nth-child(3) {
        background-image: url("../../assets/dealer/img/icons/email.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
    }
    input.custom-input2 {
      font-family: "Montserrat" sans-serif;
      width: 100%;
      height: 61px;
      margin: 13px;
      padding-top: 6px;
      font-size: 19.2614px;
      color: #ffffff;
      background: none;
      border: 1.37581px solid #ffffff;
      box-sizing: border-box;
      border-radius: 5.50326px;
      padding-left: 60px;
      &::placeholder {
        font-style: normal;
        font-weight: bold;
        font-size: 19.2614px;
        text-transform: uppercase;
        line-height: 27px;
        color: #ffffff;
      }
      &:nth-child(4) {
        background-image: url("../../assets/dealer/img/icons/code.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
    }
    input.custom-input3 {
      font-family: "Montserrat" sans-serif;
      width: 100%;
      height: 61px;
      margin: 13px;
      padding-top: 6px;
      color: #ffffff;
      font-size: 19.2614px;
      background: none;
      border: 1.37581px solid #ffffff;
      box-sizing: border-box;
      border-radius: 5.50326px;
      padding-left: 60px;
      &::placeholder {
        font-style: normal;
        font-weight: bold;
        font-size: 19.2614px;
        text-transform: uppercase;
        line-height: 27px;
        color: #ffffff;
      }
      &:nth-child(6) {
        background-image: url("../../assets/dealer/img/icons/lock.svg");
        background-repeat: no-repeat;
        background-position: 5%;
        background-size: 7%;
      }
    }
    input.custom-input4 {
      font-family: "Montserrat" sans-serif;
      width: 100%;
      height: 61px;
      margin: 13px;
      padding-top: 6px;
      color: #ffffff;
      background: none;
      font-size: 19.2614px;
      border: 1.37581px solid #ffffff;
      box-sizing: border-box;
      border-radius: 5.50326px;
      padding-left: 60px;
      &::placeholder {
        font-style: normal;
        font-weight: bold;
        font-size: 19.2614px;
        text-transform: uppercase;
        line-height: 27px;
        color: #ffffff;
      }
      &:nth-child(7) {
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
      font-size: 22px;
      line-height: 18px;
      text-align: center;
      margin-top: 21px;
      text-transform: uppercase;
      color: #3a9fd1;
    }
    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      a {
        border: none;
        cursor: pointer;
        background: none;
        font-style: normal;
        font-weight: 500;
        font-size: 13.013px;
        line-height: 17px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
</style>
