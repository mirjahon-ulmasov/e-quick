<template>
  <div>
    <textarea
      @input="updateValue($event.target.value)"
      :value="value"
      class="custom-input"
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
        :value="value"
        :type="toggle ? 'text' : type"
        class="custom-input password"
        :style="btnStyles"
      />
      <i class="eye-close"></i>
      <img :src="toggle ? show : close" class="toggle" @click="func()" alt="" />
    </div>
    <v-select
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
    </v-select>
    <input
      @input="updateValue($event.target.value)"
      :value="value"
      :type="type"
      class="custom-input"
      v-else
      :style="btnStyles"
    />
  </div>
</template>
<script>
import "vue-select/dist/vue-select.css";
import VSelect from "vue-select";
export default {
  name: "",
  props: {
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
  },
  components: { VSelect },
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
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-input {
  background: #f6f8fe;
  border: 0.886581px solid #e3ebfc;
  box-sizing: border-box;
  border-radius: 8.86582px;
  padding: 14px 25px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #60739f;
}

.toggle {
  float: right;
  cursor: pointer;
  margin-left: -40px;
}
.eye-close {
  background-image: url("../assets/images/icons/eye-close.svg");
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("../assets/images/icons/select-icon.svg");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: center;
  padding: 25px;
  border: 0.886581px solid #e3ebfc;
  box-sizing: border-box;
  border-radius: 8.86582px;
}
</style>
