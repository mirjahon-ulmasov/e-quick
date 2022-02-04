<template>
  <li style="position: relative">
    <div
      :class="{ bold: isFolder }"
      class="ok"
      @click="toggle"
      @dblclick="makeFolder"
    >
      {{ item.name }}
      <span v-if="isFolder">
        <img :src="isOpen ? imgOpen : imgOpen" alt="" />
      </span>
    </div>
    <ul v-show="isOpen" v-if="isFolder"  >
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    item: Object,
  },
  data: function () {
    return {
      isOpen: false,
      imgOpen: require("../assets/images/icons/select-icon.svg"),
      imgClose: require("../assets/images/icons/select-icon.svg"),
    };
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
  },
};
</script>

<style scoped>
.bold {
  display: flex;
  justify-content: space-between;
  color: #4679ec;
}
.ok {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  padding: 15px 18px;
  /* identical to box height */

  text-align: center;

  /* Main */
}
ul {
  list-style: none;
  position: absolute;
  margin-top: 10px;
  z-index: 99;
  width: 246px;
  height: auto;
  background: #edf1fd;
  border-radius: 10px;
  box-shadow: 0px 3.82748px 8px rgb(70 121 236 / 10%);
}
.item {
  padding-top: 0px;
  margin-top: 10px;
}
</style>