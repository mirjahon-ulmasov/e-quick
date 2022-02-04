<template>
  <div class="login">
    <img src="../../assets/images/logo/e-quick.png" alt="E-quick" />
    <form @submit.prevent="reset">
      <h3>Восстановить пароль</h3>
      <div class="form-input">
        <h4>Укажите ваш email</h4>
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
      <div class="actions">
        <my-button
          type="submit"
          title="Подтвердить"
          bgColor="#4679EC"
          color="#FFFFFF"
          :width="380"
          :fontSize="16"
        ></my-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    reset() {},
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
