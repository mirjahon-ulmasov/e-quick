<template>
  <div>
    <textarea
      @input="updateValue($event.target.value)"
      :value="value"
      :class="error ? 'error' : 'custom-input'"
      v-if="type === 'textarea'"
      :placeholder="placeholder"
      :style="btnStyles"
      style="resize: none"
    ></textarea>
    <div
      v-else-if="type === 'password'"
      :style="`width: ${width}px; display: flex; align-items: center`"
    >
      <input
        @input="updateValue($event.target.value)"
        class="custom-input"
        :class="{ error: error, password: isPassword }"
        :value="value"
        :type="toggle ? 'text' : type"
        :style="btnStyles"
      />
      <i class="eye-close"></i>
      <img :src="toggle ? show : close" class="toggle" @click="func()" alt="" />
    </div>
    <input
      @input="updateValue($event.target.value)"
      :value="value"
      :type="type"
      class="custom-input"
      :class="{ error: error, login: isLogin, email: isEmail, code: isCode }"
      :placeholder="placeholder"
      v-else
      :style="btnStyles"
    />
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    isEmail: {
      type: Boolean,
      default: false,
    },
    isCode: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    width: {
      type: Number,
      default: 165,
    },
    height: {
      type: Number,
      default: 46,
    },
    padding: {
      type: String,
    },
  },
  data() {
    return {
      toggle: false,
      val: "d",
      show: require("../assets/images/icons/eye-show.svg"),
      close: require("../assets/images/icons/eye-close.svg"),
      options: ["foo", "bar", "baz"],
    };
  },
  methods: {
    updateValue: function (value) {
      this.$emit("input", value);
    },
    func() {
      this.toggle = !this.toggle;
    },
    updateValue: function (value) {
      this.$emit("input", value);
    },
  },
  computed: {
    btnStyles() {
      return {
        color: this.color,
        height: `${this.height}px`,
        width: `${this.width}px`,
        padding: this.padding,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
input.password {
  background-image: url("../assets/images/icons/login-password.svg");
  background-repeat: no-repeat;
  background-position: 5%;
}

input.login {
  background-image: url("../assets/images/icons/login-user.svg");
  background-repeat: no-repeat;
  background-position: 5%;
}

input.email {
  background-image: url("../assets/images/icons/login-email.svg");
  background-repeat: no-repeat;
  background-position: 5%;
}

input.code {
  background-image: url("../assets/images/icons/login-code.svg");
  background-repeat: no-repeat;
  background-position: 5%;
}
</style>
