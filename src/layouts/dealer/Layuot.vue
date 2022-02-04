<template>
  <div class="main-layout">
    <SideBar />
    <div class="main">
      <div class="main-content">
        <nav-bar :title="$route.meta.title"></nav-bar>
        <div class="scroll">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
export default {
  components: { SideBar },
};
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;

  .main {
    width: 82%;
    background: #fff;
    min-width: calc(100% - 290px);

    .main-content {
      padding: 34px;
      width: 100%;
      height: 100vh;

      .scroll {
        overflow-y: scroll;
        overflow-x: hidden !important;
        height: 90%;

        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        &::-webkit-scrollbar-track {
          border-radius: 30px;
          background: none;
        }
        &::-webkit-scrollbar-thumb {
          background: #f5f8fd;
          border-radius: 30px;
          border: 1px solid transparent;
          background-clip: content-box;
        }
      }
    }
  }
}
</style>
