<template>
  <div>
    <button :style="btnStyles" :type="type">
      {{ title }}
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    type: {
      type: String,
      default: "submit",
    },
    bgColor: {
      type: String,
      default: "#4679EC",
    },
    color: {
      type: String,
      default: "#FFFFFF",
    },
    title: {
      type: String,
      default: "Save",
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
  computed: {
    btnStyles() {
      return {
        "background-color": this.bgColor,
        color: this.color,
        height: `${this.height}px`,
        width: `${this.width}px`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  /* Main */
  cursor: pointer;
  border-radius: 10px;
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  padding: 15px;
}
</style>
