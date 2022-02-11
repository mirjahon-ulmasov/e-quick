<template>
  <div class="main-layout">
    <SideBar @is_full="getIsFull" />
    <div class="main" :class="{ big: !isFull }">
      <div class="main-content">
        <nav-bar :title="$route.meta.title[locale]"></nav-bar>
        <Converter v-show="$route.meta.link === 'create-order'" />
        <div class="scroll">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import Converter from '../../components/dealer/CurrencyConverter.vue'
export default {
  components: { SideBar, Converter },
  data() {
    return {
      isFull: true,
    };
  },
  methods: {
    getIsFull(payload) {
      this.isFull = payload;
    },
  },
  computed: {
    locale(){
       return this.$i18n.locale;
    }
  },
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

  .big {
    width: 95%;
    min-width: calc(100% - 100px);
  }
}
</style>
