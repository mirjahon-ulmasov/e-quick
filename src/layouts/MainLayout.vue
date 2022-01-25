<template>
  <div class="main-layout">
    <SideBar />
    <div class="main">
      <div class="main-content">
        <router-view></router-view>
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
    width: 85%;
    background: #e2eafc;
    min-width: calc(100% - 270px);
    padding: 20px 20px 20px 0;

    .main-content {
      background: #fff;
      border-radius: 53px;
      padding: 34px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
