<template>
  <div>
    <textarea
      @input="updateValue($event.target.value)"
      :value="value"
      :class="error ? 'error' : 'custom-input'"
      v-if="type === 'textarea'"
      :style="btnStyles"
      style="resize: none"
    ></textarea>
    <div
      v-else-if="type === 'password'"
      :style="`width: ${width}px; display: flex; align-items: center`"
    >
      <input
        @input="updateValue($event.target.value)"
        :class="error ? 'error ' : 'custom-input'"
        :value="value"
        :type="toggle ? 'text' : type"
        :style="btnStyles"
      />
      <i class="eye-close"></i>
      <img :src="toggle ? show : close" class="toggle" @click="func()" alt="" />
    </div>
    <!-- <v-select
      :options="options"
      id="select-state"
      v-else-if="type === `select`"
      :style="btnStyles"
    >
      <template #open-indicator="{ attributes }">
        <span v-bind="attributes">
          <img src="../assets/images/icons/select-icon.svg" alt="" />
        </span>
      </template>
    </v-select> -->
    <input
      @input="updateValue($event.target.value)"
      :value="value"
      :type="type"
      :class="error ? 'error' : 'custom-input'"
      v-else
      :style="btnStyles"
    />
    <!-- Validation TEXT -->
    <!-- <span class="error-text" v-show="errors.has('savdo_id')">
      <feather-icon
        :icon="'InfoIcon'"
        style="color: #db2379 !important; margin-right: 5px"
        svgClasses="h-6 w-6"
      />
      {{ errors.first("savdo_id") }}</span> -->
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    error: {
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
.custom-input {
  background: #f6f8fe;
  border: 0.886581px solid #e3ebfc;
  letter-spacing: 0.4px;
  box-sizing: border-box;
  border-radius: 8.86582px;
  padding: 14px 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #60739f;
  &:focus {
    background: #ffffff;
    /* Main */

    border: 0.886581px solid #4679ec;
    box-sizing: border-box;
    box-shadow: 0px 0px 3px 1px rgba(70, 120, 236, 0.548);
    border-radius: 8.86582px;
  }
}

.toggle {
  float: right;
  cursor: pointer;
  margin-left: -40px;
}
.error {
  background: #fefbfc;
  padding: 14px 25px;
  border: 0.886581px solid #db2379;
  box-shadow: 0px 0px 2px 1px #dd659d;
  letter-spacing: 0.4px;
  box-sizing: border-box;
  border-radius: 8.86582px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #60739f;
}
</style>
