<template>
  <div id="app">
    <router-view />
    <!-- <button class="backtop"  @click="moveUp()" >
      <feather-icon
        :icon="'ChevronUpIcon'"
        class="icon"
        style="color: #4679ec"
        svgClasses="h-3 w-2"
      />
    </button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      hideScrollToTop: true,
    };
  },
  methods: {
    moveUp() {
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.backtop {
  position: fixed;
  width: 55px;
  height: 55px;
  right: 4%;
  top: 750px;

  background: #fafbfe;
  /* Main Sahdow */
  cursor: pointer;
  box-shadow: 0px 3.82748px 8px rgba(70, 121, 236, 0.1);
  border-radius: 13px;
  border: none;
  z-index: 999;
  .feather-icon {
    .feather {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
