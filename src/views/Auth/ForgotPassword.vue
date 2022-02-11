<template>
  <div class="login">
    <img src="@/assets/images/logo/e-quick.png" alt="E-quick" />
    <form @submit.prevent="reset" autocomplete="off">
      <h3>{{ $t("auth.rePass") }}</h3>
      <spinner v-show="spinner" />
      <div class="form-input" v-show="isEmail">
        <h4>{{ $t("auth.email") }}</h4>
        <my-input
          type="email"
          :width="375"
          v-model="email"
          :isEmail="true"
          padding="14px 46px"
          :error="errors.has('email')"
          name="email"
          v-validate="'required|email'"
        />
        <span class="error-text" v-show="errors.has('email')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("email") }}
        </span>
      </div>

      <div class="form-input" v-show="isCode">
        <h4>{{ $t("auth.typeCode") }}</h4>
        <my-input
          type="text"
          :width="375"
          v-model="code"
          :isCode="true"
          padding="14px 46px"
          :error="errors.has('code')"
          name="code"
          v-validate="'required|length:5'"
        />
        <span class="error-text" v-show="errors.has('code')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("code") }}
        </span>
      </div>

      <div class="form-input" v-show="isPassword">
        <h4>{{ $t("auth.newPass") }}</h4>
        <my-input
          type="password"
          :width="375"
          v-model="password"
          :isPassword="true"
          padding="14px 46px"
          ref="password"
          :error="errors.has('password')"
          name="password"
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

      <div class="form-input" v-show="isPassword">
        <h4>{{ $t("auth.confirmPass") }}</h4>
        <my-input
          type="password"
          :width="375"
          v-model="confirm"
          :isPassword="true"
          padding="14px 46px"
          name="confirm"
          data-vv-as="password"
          :error="errors.has('confirm')"
          v-validate="'required|min:5|confirmed:password'"
        />
        <span class="error-text" v-show="errors.has('confirm')">
          <feather-icon
            :icon="'InfoIcon'"
            style="color: #db2379 !important; margin-right: 5px"
            svgClasses="h-6 w-6"
          />
          {{ errors.first("confirm") }}
        </span>
      </div>
      <div class="actions">
        <my-button
          type="submit"
          :title="$t('auth.send')"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="380"
          :fontSize="16"
        ></my-button>
        <p class="resend" v-show="isCode">
          {{ $t("auth.notSend") }}
          <button @click="resend()" type="button">
            {{ $t("auth.reSend") }}
          </button>
        </p>
      </div>
    </form>
    <v-notification
      header="Error"
      :is_success="false"
      :btnFirst="$t('auth.back')"
      :isShow="notificationError.show"
      :content="notificationError.content"
      @handlerOne="handlerOneError"
    ></v-notification>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      isEmail: true,
      code: "",
      isCode: false,
      password: "",
      confirm: "",
      isPassword: false,
      userId: "",
      spinner: false,
      notificationError: {
        show: false,
        content: "",
      },
    };
  },
  updated() {
    this.$validator.locale = this.$i18n.locale;
  },
  methods: {
    handlerOneError() {
      this.notificationError = {
        show: false,
        content: "",
      };
    },
    resend() {
      this.spinner = true;
      this.$store
        .dispatch("auth/ResetPass", {
          email: this.email,
        })
        .then(() => {
          this.spinner = false;
        })
        .catch((err) => {
          this.spinner = false;
          this.notificationError = {
            show: true,
            content: `${err.response.data.detail}`,
          };
        });
    },
    reset() {
      if (this.isEmail) {
        this.$validator.validate("email").then((isValid) => {
          if (isValid) {
            this.spinner = true;
            this.$store
              .dispatch("auth/ResetPass", {
                email: this.email,
              })
              .then(() => {
                this.spinner = false;
                this.isCode = true;
                this.isEmail = false;
              })
              .catch((err) => {
                this.spinner = false;
                this.notificationError = {
                  show: true,
                  content: `${err.response.data.detail}`,
                };
              });
          }
        });
      }

      if (this.isCode) {
        this.$validator.validate("code").then((isValid) => {
          if (isValid) {
            this.spinner = true;
            this.$store
              .dispatch("auth/Verify", {
                code: this.code,
              })
              .then((res) => res.data)
              .then((data) => {
                {
                  this.spinner = false;
                  this.userId = data.user_id;
                  this.isCode = false;
                  this.isPassword = true;
                }
              })
              .catch((err) => {
                this.spinner = false;
                this.notificationError = {
                  show: true,
                  content: `${err.response.data.detail}`,
                };
              });
          }
        });
      }

      if (this.isPassword) {
        this.$validator.validate("password");
        this.$validator.validate("confirm").then(() => {
          if (this.errors.items.length === 0) {
            this.spinner = true;
            this.$store
              .dispatch("auth/ChangePass", {
                password: this.password,
                user_id: this.userId,
              })
              .then(() => {
                this.spinner = false;
                this.$router.push("/login");
              })
              .catch((err) => {
                this.spinner = false;
                this.notificationError = {
                  show: true,
                  content: `${err.response.data.detail}`,
                };
              });
          }
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

      .resend {
        margin-top: 1rem;
        font-weight: 500;
        font-size: 15px;
        line-height: 17px;
        letter-spacing: 0.02em;

        button {
          font-weight: 500;
          font-size: 15px;
          line-height: 17px;
          letter-spacing: 0.02em;
          color: #4679ec;
          border: none;
          background: transparent;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
